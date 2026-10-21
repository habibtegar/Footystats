export function SkeletonMatchRow() {
  return (
    <div className="match-row-item skeleton-row animate-pulse">
      {/* Left: Time Badge + Home Team */}
      <div className="row-left-cluster">
        <div className="w-11 h-5 rounded bg-zinc-800/80 shrink-0" />
        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="w-20 sm:w-28 h-3.5 rounded bg-zinc-800/80" />
          <div className="w-5 h-5 rounded-full bg-zinc-800 shrink-0" />
        </div>
      </div>

      {/* Center: Score Box */}
      <div className="row-center-score">
        <div className="w-12 h-6 rounded bg-zinc-800/90" />
      </div>

      {/* Right: Away Team */}
      <div className="row-right-cluster">
        <div className="flex items-center gap-2 flex-1 justify-start">
          <div className="w-5 h-5 rounded-full bg-zinc-800 shrink-0" />
          <div className="w-20 sm:w-28 h-3.5 rounded bg-zinc-800/80" />
        </div>
      </div>
    </div>
  );
}

/**
 * Universal SkeletonRow component:
 * Can render either match row skeleton or standings row skeleton
 */
export function SkeletonRow({ type = "match" }) {
  if (type === "standings") {
    return <SkeletonStandingsRow />;
  }
  return <SkeletonMatchRow />;
}

export function SkeletonMatchList({ count = 6 }) {
  return (
    <div className="matches-table-body">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonRow key={index} type="match" />
      ))}
    </div>
  );
}

export function SkeletonStandingsRow() {
  return (
    <tr className="animate-pulse border-b border-zinc-800/50">
      {/* Position */}
      <td className="table-pos py-2.5">
        <div className="w-4 h-3.5 mx-auto rounded bg-zinc-800/80" />
      </td>

      {/* Club */}
      <td className="py-2.5">
        <div className="table-club">
          <div className="w-5 h-5 rounded-full bg-zinc-800 shrink-0" />
          <div className="w-24 sm:w-32 h-3.5 rounded bg-zinc-800/80" />
        </div>
      </td>

      {/* Played */}
      <td className="table-num py-2.5">
        <div className="w-4 h-3.5 mx-auto rounded bg-zinc-800/80" />
      </td>

      {/* GD (Hidden on mobile) */}
      <td className="table-num py-2.5 hidden sm:table-cell standings-gd-col">
        <div className="w-5 h-3.5 mx-auto rounded bg-zinc-800/80" />
      </td>

      {/* Points */}
      <td className="table-pts py-2.5 pr-2.5">
        <div className="w-5 h-3.5 ml-auto rounded bg-zinc-800/90 font-bold" />
      </td>
    </tr>
  );
}

export function SkeletonStandingsList({ count = 10 }) {
  return (
    <div className="w-full">
      <table className="standings-table-root">
        <thead>
          <tr>
            <th className="table-pos">#</th>
            <th className="text-left">Klub</th>
            <th className="table-num">P</th>
            <th className="table-num hidden sm:table-cell standings-gd-col">GD</th>
            <th className="table-pts">PTS</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }).map((_, index) => (
            <SkeletonRow key={index} type="standings" />
          ))}
        </tbody>
      </table>
    </div>
  );
}
