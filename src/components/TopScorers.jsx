import { useState, useMemo } from "react";

export function TopScorers({ scorers = [], competitionName }) {
  const [activeTab, setActiveTab] = useState("goals"); // 'goals' | 'assists'

  // Urutkan ulang data secara lokal tanpa fetch API ulang saat tab ASSIST aktif
  const displayScorers = useMemo(() => {
    if (!scorers || scorers.length === 0) return [];
    if (activeTab === "assists") {
      return [...scorers].sort((a, b) => (b.assists || 0) - (a.assists || 0));
    }
    return scorers;
  }, [scorers, activeTab]);

  if (!scorers || scorers.length === 0) {
    return (
      <div className="empty-data-box">
        <p className="text-zinc-400">Data top skor belum tersedia.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Toggle Tab Ringkas ("GOL" | "ASSIST") di Area Header Tabel */}
      <div className="scorers-header-toolbar">
        <span className="text-[11px] font-medium text-zinc-400">
          Kategori:
        </span>
        <div className="scorers-toggle-pill" role="tablist" aria-label="Toggle Kategori Statistik">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "goals"}
            onClick={() => setActiveTab("goals")}
            className={`scorers-tab-btn ${activeTab === "goals" ? "active" : ""}`}
          >
            GOL
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "assists"}
            onClick={() => setActiveTab("assists")}
            className={`scorers-tab-btn ${activeTab === "assists" ? "active" : ""}`}
          >
            ASSIST
          </button>
        </div>
      </div>

      <table className="standings-table-root">
        <thead>
          <tr>
            <th className="table-pos">#</th>
            <th className="text-left">Pemain</th>
            <th className="table-num" title="Pertandingan Dimainkan">M</th>
            <th className="table-num" title={activeTab === "goals" ? "Assist" : "Total Gol"}>
              {activeTab === "goals" ? "A" : "G"}
            </th>
            <th className="table-pts" title={activeTab === "goals" ? "Total Gol" : "Total Assist"}>
              {activeTab === "goals" ? "GOL" : "ASSIST"}
            </th>
          </tr>
        </thead>
        <tbody>
          {displayScorers.map((row, index) => {
            const pos = activeTab === "goals" ? (row.position || index + 1) : index + 1;
            const playerName = row.player?.name || "Pemain";
            const teamName = row.team?.shortName || row.team?.name || "";
            const crest = row.team?.crest;
            const goals = row.goals ?? row.numberOfGoals ?? 0;
            const assists = row.assists ?? 0;
            const matches = row.playedMatches ?? "-";

            // Nilai sekunder vs nilai utama yang sedang aktif di kolom paling kanan
            const secondaryVal = activeTab === "goals" ? assists : goals;
            const primaryVal = activeTab === "goals" ? goals : assists;

            return (
              <tr key={row.player?.id || index}>
                {/* Position */}
                <td className="table-pos font-mono">
                  <span className={pos === 1 ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                    {pos}
                  </span>
                </td>

                {/* Player Name & Team */}
                <td>
                  <div className="flex flex-col py-0.5">
                    <span className="text-white font-medium text-xs leading-snug truncate max-w-[150px] sm:max-w-[180px]">
                      {playerName}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {crest && (
                        <img
                          src={crest}
                          alt=""
                          className="w-3.5 h-3.5 object-contain flex-shrink-0"
                          loading="lazy"
                        />
                      )}
                      <span className="text-[11px] text-zinc-400 truncate max-w-[140px]">
                        {teamName}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Matches Played */}
                <td className="table-num text-zinc-400">{matches}</td>

                {/* Secondary Stat (Muted) */}
                <td className="table-num text-zinc-400">{secondaryVal}</td>

                {/* Primary Stat: Highlight angka di kolom paling kanan sesuai kategori tab yang aktif */}
                <td className="table-pts font-bold font-mono">
                  <span className="text-emerald-400">
                    {primaryVal}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
