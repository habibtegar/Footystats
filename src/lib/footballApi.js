import { MOCK_FOOTBALL_DATA, LEAGUES } from "./mockFootballData";

// Token diambil permanen langsung dari environment variable
const API_KEY = (import.meta.env.VITE_FOOTBALL_API_KEY || "").trim();

export function getActiveApiKey() {
  return API_KEY;
}

/**
 * CLIENT-SIDE CACHING SYSTEM (Memory + SessionStorage)
 * Masa berlaku cache: 5 menit (300.000 ms) untuk menghemat kuota 10 req/menit
 */
const CACHE_TTL_MS = 5 * 60 * 1000;
const memoryCache = new Map();

function getCachedData(cacheKey) {
  const now = Date.now();

  // 1. Periksa in-memory cache
  if (memoryCache.has(cacheKey)) {
    const entry = memoryCache.get(cacheKey);
    if (now - entry.timestamp < CACHE_TTL_MS) {
      return entry.data;
    }
    memoryCache.delete(cacheKey);
  }

  // 2. Periksa sessionStorage browser
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const raw = sessionStorage.getItem(`footy_${cacheKey}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (now - parsed.timestamp < CACHE_TTL_MS) {
          // Sinkronkan ke memory cache untuk akses berikutnya
          memoryCache.set(cacheKey, parsed);
          return parsed.data;
        }
        sessionStorage.removeItem(`footy_${cacheKey}`);
      }
    } catch (e) {
      console.warn("Gagal membaca cache:", e);
    }
  }

  return null;
}

function setCachedData(cacheKey, data) {
  const entry = {
    timestamp: Date.now(),
    data,
  };

  memoryCache.set(cacheKey, entry);

  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      sessionStorage.setItem(`footy_${cacheKey}`, JSON.stringify(entry));
    } catch (e) {
      console.warn("Gagal menulis ke sessionStorage:", e);
    }
  }
}

/**
 * Format tanggal & waktu pertandingan lokal (WIB / user local time)
 */
export function formatMatchDateTime(utcDate) {
  if (!utcDate) return { date: "-", time: "-" };
  try {
    const d = new Date(utcDate);
    const dateStr = d.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const timeStr = d.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return { date: dateStr, time: `${timeStr} WIB` };
  } catch {
    return { date: utcDate, time: "-" };
  }
}

/**
 * Mengonversi utcDate dari API menjadi string tanggal lokal (YYYY-MM-DD)
 * berdasarkan zona waktu lokal browser pengguna (misal WIB UTC+7).
 */
export function getLocalMatchDateString(utcDate) {
  if (!utcDate) return "";
  const d = new Date(utcDate);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Menentukan kategori hari suatu pertandingan dalam waktu lokal browser:
 * Mengembalikan: 'today' | 'yesterday' | 'tomorrow' | 'other'
 * 
 * Laga jam 02.00 pagi melewati tengah malam waktu lokal akan akurat
 * masuk ke kategori 'tomorrow' (Besok) atau 'today' (Hari Ini) sesuai waktu lokal pengguna.
 */
export function getMatchLocalDayCategory(utcDate) {
  if (!utcDate) return "other";
  const matchDateKey = getLocalMatchDateString(utcDate);
  if (!matchDateKey) return "other";

  const now = new Date();
  const todayKey = getLocalMatchDateString(now);

  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const yesterdayKey = getLocalMatchDateString(yesterday);

  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const tomorrowKey = getLocalMatchDateString(tomorrow);

  if (matchDateKey === todayKey) return "today";
  if (matchDateKey === yesterdayKey) return "yesterday";
  if (matchDateKey === tomorrowKey) return "tomorrow";
  return "other";
}

/**
 * Mendapatkan konfigurasi badge status pertandingan
 */
export function getMatchStatusConfig(status) {
  const norm = (status || "").toUpperCase();
  switch (norm) {
    case "LIVE":
    case "IN_PLAY":
    case "PAUSED":
      return {
        label: "LIVE",
        badgeClass: "badge-status-live",
        isLive: true,
      };
    case "FINISHED":
    case "AWARDED":
      return {
        label: "FINISHED",
        badgeClass: "badge-status-finished",
        isLive: false,
      };
    case "TIMED":
    case "SCHEDULED":
      return {
        label: "TIMED",
        badgeClass: "badge-status-timed",
        isLive: false,
      };
    case "POSTPONED":
    case "SUSPENDED":
    case "CANCELLED":
      return {
        label: norm,
        badgeClass: "badge-status-postponed",
        isLive: false,
      };
    default:
      return {
        label: norm || "UPCOMING",
        badgeClass: "badge-status-timed",
        isLive: false,
      };
  }
}

/**
 * Fetch Matches dari Football-Data.org
 * Dengan Caching 5 Menit & penanganan Error 429 khusus
 */
export async function fetchMatches(leagueCode = "PL", forceRefresh = false) {
  const cacheKey = `matches_${leagueCode}`;
  const mockLeague = MOCK_FOOTBALL_DATA[leagueCode] || MOCK_FOOTBALL_DATA.PL;

  // 1. Cek Cache terlebih dahulu (kecuali forceRefresh)
  if (!forceRefresh) {
    const cached = getCachedData(cacheKey);
    if (cached) {
      return {
        ...cached,
        fromCache: true,
      };
    }
  }

  // Jika token belum disetel di .env.local
  if (!API_KEY) {
    return {
      success: true,
      isLiveApi: false,
      source: "mock",
      message: "API Key belum terpasang di .env.local. Menampilkan data tiruan.",
      competition: mockLeague.competition,
      matches: mockLeague.matches,
    };
  }

  const urlsToTry = [
    `https://api.football-data.org/v4/competitions/${leagueCode}/matches`,
    `/api/football/v4/competitions/${leagueCode}/matches`,
  ];

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        headers: {
          "X-Auth-Token": API_KEY,
        },
      });

      // 429: Rate Limit Tercapai
      if (response.status === 429) {
        console.warn(`[Football-Data] Error 429 Too Many Requests untuk ${leagueCode}.`);
        return {
          success: true,
          isLiveApi: false,
          source: "fallback",
          rateLimited: true,
          message: "Kuota API (10 req/menit) tercapai (Error 429). Menampilkan data tiruan sementara.",
          competition: mockLeague.competition,
          matches: mockLeague.matches,
        };
      }

      if (response.ok) {
        const json = await response.json();
        const rawMatches = json.matches || [];
        const currentMatchday = json.season?.currentMatchday;

        let displayMatches = rawMatches;
        if (currentMatchday && rawMatches.length > 0) {
          const roundMatches = rawMatches.filter((m) => m.matchday === currentMatchday);
          if (roundMatches.length > 0) {
            displayMatches = roundMatches;
          } else {
            const now = Date.now();
            const sorted = [...rawMatches].sort((a, b) => {
              const diffA = Math.abs(new Date(a.utcDate).getTime() - now);
              const diffB = Math.abs(new Date(b.utcDate).getTime() - now);
              return diffA - diffB;
            });
            displayMatches = sorted.slice(0, 10);
          }
        } else if (rawMatches.length > 12) {
          const now = Date.now();
          const sorted = [...rawMatches].sort((a, b) => {
            const diffA = Math.abs(new Date(a.utcDate).getTime() - now);
            const diffB = Math.abs(new Date(b.utcDate).getTime() - now);
            return diffA - diffB;
          });
          displayMatches = sorted.slice(0, 10);
        }

        const resultData = {
          success: true,
          isLiveApi: true,
          source: "live",
          message: "Berhasil memuat data langsung dari Football-Data.org API.",
          competition: json.competition || mockLeague.competition,
          matches: displayMatches.length > 0 ? displayMatches : mockLeague.matches,
        };

        // Simpan ke cache 5 menit
        setCachedData(cacheKey, resultData);
        return resultData;
      }
    } catch (err) {
      console.warn(`Gagal fetch matches ${url}:`, err.message);
    }
  }

  // Fallback umum jika jaringan offline
  return {
    success: true,
    isLiveApi: false,
    source: "fallback",
    message: "Koneksi jaringan terhambat. Menampilkan data cadangan.",
    competition: mockLeague.competition,
    matches: mockLeague.matches,
  };
}

/**
 * Fetch Standings dari Football-Data.org
 * Dengan Caching 5 Menit
 */
export async function fetchStandings(leagueCode = "PL", forceRefresh = false) {
  const cacheKey = `standings_${leagueCode}`;
  const mockLeague = MOCK_FOOTBALL_DATA[leagueCode] || MOCK_FOOTBALL_DATA.PL;

  // 1. Cek Cache
  if (!forceRefresh) {
    const cached = getCachedData(cacheKey);
    if (cached) {
      return {
        ...cached,
        fromCache: true,
      };
    }
  }

  if (!API_KEY) {
    return {
      success: true,
      isLiveApi: false,
      source: "mock",
      competition: mockLeague.competition,
      standings: mockLeague.standings,
    };
  }

  const urlsToTry = [
    `https://api.football-data.org/v4/competitions/${leagueCode}/standings`,
    `/api/football/v4/competitions/${leagueCode}/standings`,
  ];

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        headers: {
          "X-Auth-Token": API_KEY,
        },
      });

      if (response.status === 429) {
        console.warn(`[Football-Data] Error 429 Too Many Requests (Standings) untuk ${leagueCode}.`);
        return {
          success: true,
          isLiveApi: false,
          source: "fallback",
          rateLimited: true,
          message: "Kuota API (10 req/menit) tercapai (Error 429). Menampilkan data tiruan.",
          competition: mockLeague.competition,
          standings: mockLeague.standings,
        };
      }

      if (response.ok) {
        const json = await response.json();
        const resultData = {
          success: true,
          isLiveApi: true,
          source: "live",
          competition: json.competition || mockLeague.competition,
          standings: json.standings || mockLeague.standings,
        };

        // Simpan ke cache 5 menit
        setCachedData(cacheKey, resultData);
        return resultData;
      }
    } catch (err) {
      console.warn(`Gagal fetch standings ${url}:`, err.message);
    }
  }

  return {
    success: true,
    isLiveApi: false,
    source: "fallback",
    competition: mockLeague.competition,
    standings: mockLeague.standings,
  };
}

/**
 * Fetch Top Scorers dari Football-Data.org
 * Dengan Caching 5 Menit
 */
export async function fetchScorers(leagueCode = "PL", forceRefresh = false) {
  const cacheKey = `scorers_${leagueCode}`;
  const mockLeague = MOCK_FOOTBALL_DATA[leagueCode] || MOCK_FOOTBALL_DATA.PL;

  // 1. Cek Cache
  if (!forceRefresh) {
    const cached = getCachedData(cacheKey);
    if (cached) {
      return {
        ...cached,
        fromCache: true,
      };
    }
  }

  if (!API_KEY) {
    return {
      success: true,
      isLiveApi: false,
      source: "mock",
      competition: mockLeague.competition,
      scorers: mockLeague.scorers || [],
    };
  }

  const urlsToTry = [
    `https://api.football-data.org/v4/competitions/${leagueCode}/scorers`,
    `/api/football/v4/competitions/${leagueCode}/scorers`,
  ];

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        headers: {
          "X-Auth-Token": API_KEY,
        },
      });

      if (response.status === 429) {
        console.warn(`[Football-Data] Error 429 Too Many Requests (Scorers) untuk ${leagueCode}.`);
        return {
          success: true,
          isLiveApi: false,
          source: "fallback",
          rateLimited: true,
          message: "Kuota API (10 req/menit) tercapai (Error 429). Menampilkan data tiruan.",
          competition: mockLeague.competition,
          scorers: mockLeague.scorers || [],
        };
      }

      if (response.ok) {
        const json = await response.json();
        const resultData = {
          success: true,
          isLiveApi: true,
          source: "live",
          competition: json.competition || mockLeague.competition,
          scorers: json.scorers || mockLeague.scorers || [],
        };

        // Simpan ke cache 5 menit
        setCachedData(cacheKey, resultData);
        return resultData;
      }
    } catch (err) {
      console.warn(`Gagal fetch scorers ${url}:`, err.message);
    }
  }

  return {
    success: true,
    isLiveApi: false,
    source: "fallback",
    competition: mockLeague.competition,
    scorers: mockLeague.scorers || [],
  };
}
