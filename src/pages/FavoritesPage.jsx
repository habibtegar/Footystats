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
      setNoticeMessage(next ? "Real Madrid berhasil dipin ke Tim Favorit!" : "Real Madrid dilepas dari Tim Favorit.");
      setTimeout(() => setNoticeMessage(""), 3000);
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

  return (
    <div className="flex-1">
      {/* Subheader Title Bar */}
      <div className="subheader-bar">
        <div className="container-main subheader-inner">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">⭐ Tim Favorit</span>
              <span className="text-zinc-600 font-normal">/</span>
              <span className="text-xs text-zinc-400 font-mono">Personalisasi Klub</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded font-mono">
                {pinnedCount} Klub Dipin
              </span>
              <Link
                to="/"
                className="text-xs text-zinc-300 hover:text-white underline underline-offset-2 ml-2"
              >
                ← Kembali ke Jadwal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="container-main py-6">
        {/* Toast Notifikasi Feedback */}
        {noticeMessage && (
          <div className="mb-4 p-3 bg-zinc-900 border border-zinc-700 rounded text-xs text-emerald-400 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>{noticeMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setNoticeMessage("")}
              className="text-zinc-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>
        )}

        {/* Hero Banner / Introductory Layout */}
        <section className="panel mb-6">
          <div className="p-6 md:p-8 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700 mx-auto flex items-center justify-center text-xl mb-3">
              ⭐
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white mb-2">
              Pantau Klub Andalan Anda
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed mb-5">
              Pilih tim andalanmu untuk memantau jadwal dan hasil dengan cepat. Dapatkan akses langsung ke jadwal laga terdekat, ringkasan performa terkini, dan posisi klasemen tanpa harus mencari satu per satu.
            </p>

            {/* Mock Search Bar for Clubs */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Cari klub andalan (misal: Arsenal, Barcelona, Inter)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
              />
              <span className="absolute right-3 top-2.5 text-zinc-500 text-xs">🔍</span>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-[11px] text-zinc-400">
              <span className="text-zinc-500">Saran:</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-750 text-zinc-300 font-mono">Real Madrid</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-750 text-zinc-300 font-mono">Arsenal</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-750 text-zinc-300 font-mono">Liverpool</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-750 text-zinc-300 font-mono">Man City</span>
            </div>
          </div>
        </section>

        {/* Section: Kartu Preview Tim Favorit */}
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span>Preview Kartu Tim Favorit</span>
              <span className="text-zinc-600 font-normal">/</span>
              <span className="panel-tag">Gambaran Fitur Mendatang</span>
            </h2>
            <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
              Interaktif
            </span>
          </div>

          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CARD PREVIEW: Real Madrid CF */}
              <div
                className={`border rounded-md p-4 transition-all ${
                  isMadridPinned
                    ? "bg-zinc-900/90 border-zinc-700"
                    : "bg-zinc-950/60 border-zinc-800 opacity-70"
                }`}
              >
                {/* Header Tim: Crest, Nama, & Action Button */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://crests.football-data.org/86.png"
                      alt="Real Madrid CF"
                      className="w-10 h-10 object-contain shrink-0"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">Real Madrid CF</h3>
                        <span className="text-[10px] text-zinc-400 font-mono bg-zinc-800 px-1.5 py-0.2 rounded">
                          RMA
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        La Liga (Spanyol) • Estadio Santiago Bernabéu
                      </p>
                    </div>
                  </div>

                  {/* Tombol Interaktif Pin Tim */}
                  <button
                    type="button"
                    onClick={togglePin}
                    className={`text-xs px-3 py-1.5 rounded font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
                      isMadridPinned
                        ? "bg-zinc-800 text-emerald-400 border border-emerald-500/30 hover:bg-zinc-750"
                        : "bg-zinc-900 text-zinc-300 border border-zinc-700 hover:text-white hover:bg-zinc-800"
                    }`}
                  >
                    <span>{isMadridPinned ? "📌" : "☆"}</span>
                    <span>{isMadridPinned ? "Dipin (Favorit)" : "Pin Tim"}</span>
                  </button>
                </div>

                {/* Status Ringkas / Info Performa */}
                <div className="grid grid-cols-3 gap-2 py-3 border-b border-zinc-800/80 text-center font-mono">
                  <div className="bg-zinc-950/80 p-2 rounded border border-zinc-850">
                    <span className="text-[10px] text-zinc-500 block uppercase">Peringkat</span>
                    <span className="text-xs text-emerald-400 font-bold">#2 La Liga</span>
                  </div>
                  <div className="bg-zinc-950/80 p-2 rounded border border-zinc-850">
                    <span className="text-[10px] text-zinc-500 block uppercase">Poin</span>
                    <span className="text-xs text-white font-bold">24 Poin</span>
                  </div>
                  <div className="bg-zinc-950/80 p-2 rounded border border-zinc-850">
                    <span className="text-[10px] text-zinc-500 block uppercase">Tren</span>
                    <span className="text-xs text-zinc-300">W-W-D-W-W</span>
                  </div>
                </div>

                {/* Jadwal Terdekat Klub */}
                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2 font-mono">
                    Jadwal Terdekat
                  </span>
                  <div className="space-y-2">
                    {sampleUpcomingMatches.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-zinc-850 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={m.opponentCrest}
                            alt=""
                            className="w-4 h-4 object-contain shrink-0"
                          />
                          <span className="text-zinc-200">
                            {m.isHome ? "vs" : "@"} {m.opponent}
                          </span>
                        </div>
                        <div className="text-right font-mono text-[11px] text-zinc-400">
                          <span>{m.datetime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* EMPTY PLACEHOLDER CARD: Tambah Klub Lainnya */}
              <div className="border border-dashed border-zinc-800 rounded-md p-6 flex flex-col items-center justify-center text-center bg-zinc-950/40">
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 text-lg mb-2">
                  +
                </div>
                <h4 className="text-xs font-semibold text-zinc-300 mb-1">
                  Tambahkan Tim Lainnya
                </h4>
                <p className="text-[11px] text-zinc-500 max-w-xs mb-3">
                  Pin klub dari Premier League, Serie A, atau Champions League ke dasbor ini untuk melihat semua jadwal penting secara terpadu.
                </p>
                <Link
                  to="/"
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded font-medium transition-colors border border-zinc-700"
                >
                  Jelajahi Semua Klub di Klasemen →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
