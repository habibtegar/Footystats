import { useState } from "react";
import { Link } from "react-router-dom";

export function FavoritesPage() {
  const [isMadridPinned, setIsMadridPinned] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [pinnedCount, setPinnedCount] = useState(1);
  const [noticeMessage, setNoticeMessage] = useState("");

  const togglePin = () => {
    setIsMadridPinned((prev) => {
      const next = !prev;
      setPinnedCount(next ? 1 : 0);
      setNoticeMessage(
        next
          ? "Real Madrid berhasil dipin ke Tim Favorit!"
          : "Real Madrid dilepas dari Tim Favorit."
      );
      setTimeout(() => setNoticeMessage(""), 3500);
      return next;
    });
  };

  const sampleUpcomingMatches = [
    {
      id: "rm-1",
      opponent: "FC Barcelona",
      opponentCrest: "https://crests.football-data.org/77.png",
      competition: "La Liga (El Clásico)",
      datetime: "Minggu, 27 Okt • 02:00 WIB",
      venue: "Estadio Santiago Bernabéu, Madrid",
      isHome: true,
    },
    {
      id: "rm-2",
      opponent: "AC Milan",
      opponentCrest: "https://crests.football-data.org/98.png",
      competition: "UEFA Champions League",
      datetime: "Rabu, 06 Nov • 03:00 WIB",
      venue: "Estadio Santiago Bernabéu, Madrid",
      isHome: true,
    },
  ];

  const suggestedClubs = [
    "Real Madrid",
    "Arsenal",
    "FC Barcelona",
    "Liverpool",
    "Manchester City",
    "Inter Milan",
  ];

  return (
    <div className="flex-1 bg-[#09090b] text-white">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-sm">
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold text-white">⭐ Tim Favorit</span>
              <span className="text-zinc-600 font-normal">/</span>
              <span className="text-xs text-zinc-400 font-mono">Personalisasi Klub</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full font-mono">
                {pinnedCount} Klub Dipin
              </span>
              <Link
                to="/"
                className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 ml-1 transition-colors"
              >
                ← Kembali ke Jadwal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="container-main py-10 md:py-16">
        {/* Toast Notifikasi Feedback Interaktif */}
        {noticeMessage && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-zinc-900 border border-zinc-700 rounded-2xl text-xs text-emerald-400 flex items-center justify-between animate-fadeIn shadow-lg">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                ✓
              </span>
              <span className="font-medium text-zinc-200">{noticeMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setNoticeMessage("")}
              className="text-zinc-400 hover:text-white text-sm px-2 py-0.5"
            >
              ✕
            </button>
          </div>
        )}

        {/* HERO SECTION: Centered Search Engine Style (Besar, Panjang, Memusat) */}
        <section className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-2xl mb-5 shadow-lg">
            ⭐
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pilih Tim Andalanmu
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
            Pilih tim andalanmu untuk memantau jadwal dan hasil dengan cepat. Dapatkan akses langsung ke jadwal laga terdekat, ringkasan performa terkini, dan posisi klasemen.
          </p>

          {/* Large Centered Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <input
              type="text"
              placeholder="Cari klub favoritmu (misal: Real Madrid, Arsenal, Barcelona, Inter)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-2xl py-4 px-6 pl-14 text-sm md:text-base text-white placeholder-zinc-500 shadow-xl focus:outline-none transition-all"
            />
            <span className="absolute left-5 top-4.5 text-zinc-500 text-lg">
              🔍
            </span>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400 mt-3">
            <span className="text-zinc-500 font-mono text-[11px]">Saran Cepat:</span>
            {suggestedClubs.map((club) => (
              <button
                key={club}
                type="button"
                onClick={() => setSearchFilter(club)}
                className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs transition-colors"
              >
                {club}
              </button>
            ))}
          </div>
        </section>

        {/* CARDS SECTION: Clean Bento Card Layout (Bukan Tampilan Tabel!) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* CARD PREVIEW: Real Madrid CF (Modern Bento Card) */}
          <div
            className={`rounded-2xl p-8 md:p-10 transition-all flex flex-col justify-between ${
              isMadridPinned
                ? "bg-zinc-900 border border-zinc-800/80 shadow-xl"
                : "bg-zinc-900/50 border border-zinc-850 opacity-60"
            }`}
          >
            <div>
              {/* Header Tim: Crest Besar, Nama & Tombol Pin Tim */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-zinc-800/80">
                <div className="flex items-center gap-4">
                  <img
                    src="https://crests.football-data.org/86.png"
                    alt="Real Madrid CF"
                    className="w-16 h-16 object-contain shrink-0 drop-shadow"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        Real Madrid CF
                      </h2>
                      <span className="text-xs text-zinc-400 font-mono bg-zinc-800 px-2 py-0.5 rounded-md">
                        RMA
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      La Liga (Spanyol) • Estadio Santiago Bernabéu
                    </p>
                  </div>
                </div>

                {/* Tombol Interaktif Pin Tim */}
                <button
                  type="button"
                  onClick={togglePin}
                  className={`text-xs px-4 py-2.5 rounded-xl font-semibold transition-colors shrink-0 flex items-center gap-2 ${
                    isMadridPinned
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:text-white hover:bg-zinc-700"
                  }`}
                >
                  <span>{isMadridPinned ? "📌" : "☆"}</span>
                  <span>{isMadridPinned ? "Dipin (Favorit)" : "Pin Tim"}</span>
                </button>
              </div>

              {/* STATS ROW: Flexbox Menyamping dengan Nilai Besar & Tebal (TANPA BORDER MENGURUNG) */}
              <div className="py-8 my-2 border-b border-zinc-800/80">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  {/* Peringkat */}
                  <div className="flex flex-col">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      Peringkat
                    </span>
                    <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 font-mono mt-1">
                      #2
                    </div>
                    <span className="text-xs text-zinc-400 font-mono mt-0.5">
                      La Liga Spanyol
                    </span>
                  </div>

                  {/* Poin */}
                  <div className="flex flex-col">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      Poin Sementara
                    </span>
                    <div className="text-3xl md:text-4xl font-extrabold text-white font-mono mt-1">
                      24
                    </div>
                    <span className="text-xs text-zinc-400 font-mono mt-0.5">
                      Total Poin (PTS)
                    </span>
                  </div>

                  {/* Tren Performa */}
                  <div className="flex flex-col">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      Tren 5 Laga Terakhir
                    </span>
                    <div className="text-xl md:text-2xl font-extrabold text-zinc-300 font-mono mt-2 tracking-widest flex items-center gap-1.5">
                      <span className="text-emerald-400">W</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-emerald-400">W</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-amber-400">D</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-emerald-400">W</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-emerald-400">W</span>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono mt-1">
                      4 Menang • 1 Seri
                    </span>
                  </div>
                </div>
              </div>

              {/* Jadwal Terdekat Klub */}
              <div className="pt-4">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-4">
                  Jadwal Pertandingan Terdekat
                </span>
                <div className="space-y-3">
                  {sampleUpcomingMatches.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/50 text-xs hover:border-zinc-700/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={m.opponentCrest}
                          alt=""
                          className="w-6 h-6 object-contain shrink-0"
                        />
                        <div>
                          <div className="text-sm font-semibold text-zinc-100">
                            {m.isHome ? "vs" : "@"} {m.opponent}
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">
                            {m.competition}
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                        <span>{m.datetime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CARD: Tambahkan Tim Lainnya (Empty State Modern dengan Border Putus-putus Tebal) */}
          <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 rounded-2xl p-8 md:p-14 flex flex-col items-center justify-center text-center transition-all group min-h-[380px]">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 text-4xl font-light mb-6 group-hover:scale-105 group-hover:border-zinc-700 transition-all shadow-inner">
              +
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              Tambahkan Klub Andalan
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 max-w-sm mb-8 leading-relaxed">
              Pin klub favorit lainnya dari Premier League, La Liga, Serie A, atau Liga Champions ke dasbor ini untuk memantau performa dan jam tanding mereka secara terpadu.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors border border-zinc-700 shadow-md"
            >
              <span>Jelajahi Semua Klub di Klasemen</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
