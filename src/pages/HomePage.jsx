import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchMatches, fetchStandings, fetchScorers } from "../lib/footballApi";
import { LEAGUES } from "../lib/mockFootballData";
import { Subheader } from "../components/Subheader";
import { MatchList } from "../components/MatchList";
import { MiniStandings } from "../components/MiniStandings";
import { TopScorers } from "../components/TopScorers";
import { SkeletonMatchList, SkeletonStandingsList } from "../components/SkeletonLoader";

export function HomePage({
  selectedLeague = "PL",
  onSelectLeague,
  activeSection = "matches",
}) {
  const [internalLeague, setInternalLeague] = useState(selectedLeague);
  const currentLeague = onSelectLeague ? selectedLeague : internalLeague;

  const handleLeagueChange = (code) => {
    if (onSelectLeague) onSelectLeague(code);
    else setInternalLeague(code);
  };

  // View state for the right column: 'standings' | 'scorers'
  const [rightColumnTab, setRightColumnTab] = useState("standings");

  // Sync right column tab with navbar section
  useEffect(() => {
    if (activeSection === "scorers") {
      setRightColumnTab("scorers");
    } else if (activeSection === "standings") {
      setRightColumnTab("standings");
    }
  }, [activeSection]);

  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [scorers, setScorers] = useState([]);

  const [loadingMatches, setLoadingMatches] = useState(true);
  const [loadingStandings, setLoadingStandings] = useState(true);
  const [loadingScorers, setLoadingScorers] = useState(true);

  const [statusInfo, setStatusInfo] = useState(null);

  const activeLeagueMeta = useMemo(() => {
    return LEAGUES.find((l) => l.code === currentLeague) || LEAGUES[0];
  }, [currentLeague]);

  // Load all league data (with 5-minute client-side caching)
  const loadLeagueData = useCallback(async (leagueCode, forceRefresh = false) => {
    setLoadingMatches(true);
    setLoadingStandings(true);
    setLoadingScorers(true);

    try {
      const [matchesRes, standingsRes, scorersRes] = await Promise.all([
        fetchMatches(leagueCode, forceRefresh),
        fetchStandings(leagueCode, forceRefresh),
        fetchScorers(leagueCode, forceRefresh),
      ]);

      setMatches(matchesRes.matches || []);
      setStandings(standingsRes.standings || []);
      setScorers(scorersRes.scorers || []);

      const isRateLimited =
        Boolean(matchesRes.rateLimited) ||
        Boolean(standingsRes.rateLimited) ||
        Boolean(scorersRes.rateLimited);

      const isFromCache =
        Boolean(matchesRes.fromCache) &&
        Boolean(standingsRes.fromCache);

      setStatusInfo({
        isLiveApi: matchesRes.isLiveApi,
        rateLimited: isRateLimited,
        message: matchesRes.message,
        source: matchesRes.source,
        fromCache: isFromCache,
      });
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setLoadingMatches(false);
      setLoadingStandings(false);
      setLoadingScorers(false);
    }
  }, []);

  // Fetch saat kompetisi berubah
  useEffect(() => {
    loadLeagueData(currentLeague, false);
  }, [currentLeague, loadLeagueData]);

  // Force Refresh
  const handleForceRefresh = () => {
    loadLeagueData(currentLeague, true);
  };

  // Filter matches by search query
  const filteredMatches = useMemo(() => {
    if (!searchQuery.trim()) return matches;
    const q = searchQuery.toLowerCase().trim();
    return matches.filter((m) => {
      const home = (m.homeTeam?.name || m.homeTeam?.shortName || "").toLowerCase();
      const away = (m.awayTeam?.name || m.awayTeam?.shortName || "").toLowerCase();
      return home.includes(q) || away.includes(q);
    });
  }, [matches, searchQuery]);

  return (
    <div className="flex-1">
      {/* Subheader: Dedicated League Filter Tabs + Search */}
      <Subheader
        selectedLeague={currentLeague}
        onSelectLeague={handleLeagueChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery("")}
      />

      {/* Main Container */}
      <main className="container-main">
        {/* Notice Bar: Muncul jika terjadi Error 429 Rate Limit */}
        {statusInfo?.rateLimited && (
          <div className="status-notice-bar status-notice-alert">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">⚠️</span>
              <span>
                <strong>Peringatan Rate Limit (HTTP 429):</strong> Kuota API Football-Data.org (10 req/menit) tercapai. Menampilkan data cadangan tiruan.
              </span>
            </div>
            <button
              type="button"
              onClick={handleForceRefresh}
              className="text-xs text-white underline underline-offset-2 hover:text-emerald-400 shrink-0 ml-3"
            >
              Coba Segarkan
            </button>
          </div>
        )}

        {/* 2-Column Dashboard Grid: 1 column on mobile (vertical stack), 3-column grid (2:1 ratio) on desktop */}
        <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Kolom Kiri (~67%): Daftar Jadwal & Hasil Pertandingan */}
          <section className="panel lg:col-span-2" id="matches-section">
            <div className="panel-header">
              <h2 className="panel-title">
                <span>Jadwal & Hasil Pertandingan</span>
                <span className="text-zinc-600 font-normal">/</span>
                <span className="panel-tag">{activeLeagueMeta.name}</span>
              </h2>
              <div className="flex items-center gap-2">
                {statusInfo?.fromCache && (
                  <span className="text-[10px] text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded font-mono">
                    Cache 5m
                  </span>
                )}
                <span className="text-xs font-mono text-zinc-400">
                  Pekan {activeLeagueMeta.currentMatchday || "-"}
                </span>
              </div>
            </div>

            {loadingMatches ? (
              <SkeletonMatchList count={8} />
            ) : (
              <MatchList
                matches={filteredMatches}
                competitionName={activeLeagueMeta.name}
                searchQuery={searchQuery}
                onResetSearch={() => setSearchQuery("")}
              />
            )}
          </section>

          {/* Kolom Kanan (~33%): Tabel Klasemen Mini / Top Skor */}
          <aside className="panel lg:col-span-1" id="side-panel-section">
            <div className="panel-header">
              {/* Tab Switcher between Klasemen and Top Skor */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRightColumnTab("standings")}
                  className={`panel-subtab-btn ${rightColumnTab === "standings" ? "active" : ""}`}
                >
                  Klasemen
                </button>
                <button
                  type="button"
                  onClick={() => setRightColumnTab("scorers")}
                  className={`panel-subtab-btn ${rightColumnTab === "scorers" ? "active" : ""}`}
                >
                  Top Skor
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleForceRefresh}
                  className="text-[11px] text-zinc-400 hover:text-white transition-colors"
                  title="Segarkan data dari server"
                >
                  Segarkan ↻
                </button>
                <span className="text-xs text-zinc-500 font-mono">
                  {activeLeagueMeta.code}
                </span>
              </div>
            </div>

            {rightColumnTab === "standings" ? (
              loadingStandings ? (
                <SkeletonStandingsList count={10} />
              ) : (
                <MiniStandings
                  standings={standings}
                  competitionName={activeLeagueMeta.name}
                />
              )
            ) : loadingScorers ? (
              <SkeletonStandingsList count={8} />
            ) : (
              <TopScorers
                scorers={scorers}
                competitionName={activeLeagueMeta.name}
              />
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
