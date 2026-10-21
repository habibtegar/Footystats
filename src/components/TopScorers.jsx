export function TopScorers({ scorers = [], competitionName }) {
  if (!scorers || scorers.length === 0) {
    return (
      <div className="empty-data-box">
        <p className="text-zinc-400">Data top skor belum tersedia.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <table className="standings-table-root">
        <thead>
          <tr>
            <th className="table-pos">#</th>
            <th className="text-left">Pemain</th>
            <th className="table-num" title="Pertandingan Dimainkan">M</th>
            <th className="table-num" title="Assist">A</th>
            <th className="table-pts" title="Total Gol">GOL</th>
          </tr>
        </thead>
        <tbody>
          {scorers.map((row, index) => {
            const pos = row.position || index + 1;
            const playerName = row.player?.name || "Pemain";
            const teamName = row.team?.shortName || row.team?.name || "";
            const crest = row.team?.crest;
            const goals = row.goals ?? row.numberOfGoals ?? 0;
            const assists = row.assists ?? 0;
            const matches = row.playedMatches ?? "-";

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

                {/* Assists */}
                <td className="table-num text-zinc-400">{assists}</td>

                {/* Goals */}
                <td className="table-pts font-bold text-white">
                  {goals}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
