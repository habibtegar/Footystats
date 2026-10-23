export function MiniStandings({ standings = [], competitionName }) {
  const totalStandings =
    standings.find((s) => s.type === "TOTAL") ||
    standings[0] ||
    { table: [] };

  const table = totalStandings.table || [];

  if (!table || table.length === 0) {
    return (
      <div className="empty-data-box">
        <p className="text-zinc-400">Klasemen belum tersedia.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <table className="standings-table-root">
        <thead>
          <tr>
            <th className="table-pos">#</th>
            <th className="text-left">Klub</th>
            <th className="table-num" title="Main (Played)">P</th>
            <th className="table-num hidden sm:table-cell standings-col-gd" title="Selisih Gol (Goal Difference)">GD</th>
            <th className="table-pts" title="Total Poin">PTS</th>
            <th className="table-form hidden lg:table-cell text-center" title="Form (5 Pertandingan Terakhir)">FORM</th>
          </tr>
        </thead>
        <tbody>
          {table.map((row) => {
            const isUCL = row.position <= 4;
            const isUEL = row.position === 5;
            const isRel = row.position >= table.length - 2 && table.length >= 10;

            const zoneClass = isUCL
              ? "td-ucl-zone"
              : isUEL
              ? "td-uel-zone"
              : isRel
              ? "td-rel-zone"
              : "";

            // Parse data form string (misal: "W,D,L,W,W")
            const formItems = typeof row.form === "string"
              ? (row.form.includes(",") ? row.form.split(",") : row.form.split(""))
                  .map((s) => s.trim().toUpperCase())
                  .filter(Boolean)
                  .slice(-5)
              : [];

            return (
              <tr key={row.team?.id || row.position}>
                {/* Position with subtle semantic border for top 4 */}
                <td className={`table-pos ${zoneClass}`}>
                  <span className={isUCL ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                    {row.position}
                  </span>
                </td>

                {/* Team Crest & Name */}
                <td>
                  <div className="table-club">
                    {row.team?.crest ? (
                      <img
                        src={row.team.crest}
                        alt=""
                        className="w-5 h-5 object-contain flex-shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="w-5 h-5 rounded bg-zinc-800 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                      style={{ display: row.team?.crest ? "none" : "flex" }}
                    >
                      {(row.team?.shortName || "C").substring(0, 2)}
                    </div>
                    <span className="text-zinc-200 font-medium truncate max-w-[130px] sm:max-w-[160px]">
                      {row.team?.shortName || row.team?.name}
                    </span>
                  </div>
                </td>

                {/* Played */}
                <td className="table-num text-zinc-400">{row.playedGames}</td>

                {/* Goal Difference (Hidden on Mobile) */}
                <td className={`table-num hidden sm:table-cell standings-col-gd font-semibold ${row.goalDifference > 0 ? "text-zinc-300" : row.goalDifference < 0 ? "text-zinc-500" : "text-zinc-400"}`}>
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>

                {/* Points */}
                <td className="table-pts">
                  {row.points}
                </td>

                {/* Indikator Performa (Form) - Hidden di smartphone, Flex di desktop */}
                <td className="table-form hidden lg:table-cell">
                  <div
                    className="hidden lg:flex items-center justify-center gap-1.5"
                    title={row.form ? `Form: ${row.form}` : "Belum ada data form"}
                  >
                    {formItems.length > 0 ? (
                      formItems.map((item, idx) => {
                        const bgClass =
                          item === "W"
                            ? "bg-emerald-500"
                            : item === "D"
                            ? "bg-zinc-500"
                            : item === "L"
                            ? "bg-rose-500"
                            : "bg-zinc-600";
                        const label =
                          item === "W"
                            ? "Menang (W)"
                            : item === "D"
                            ? "Seri (D)"
                            : item === "L"
                            ? "Kalah (L)"
                            : item;
                        return (
                          <span
                            key={idx}
                            className={`w-2 h-2 rounded-full shrink-0 ${bgClass}`}
                            title={label}
                          />
                        );
                      })
                    ) : (
                      <span className="text-zinc-600 text-xs">-</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mini Legend */}
      <div className="standings-mini-legend">
        <div className="legend-chip">
          <span className="legend-bar ucl" />
          <span>1-4: UCL</span>
        </div>
        <div className="legend-chip">
          <span className="legend-bar uel" />
          <span>5: UEL</span>
        </div>
        <div className="legend-chip">
          <span className="legend-bar rel" />
          <span>Degradasi</span>
        </div>
      </div>
    </div>
  );
}
