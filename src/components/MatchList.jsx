import { useState, useMemo } from "react";
import { formatMatchDateTime, getMatchLocalDayCategory } from "../lib/footballApi";

export function MatchList({ matches = [], competitionName, searchQuery, onResetSearch }) {
  const [timeFilter, setTimeFilter] = useState("all"); // 'all' | 'yesterday' | 'today' | 'tomorrow'
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Filter pertandingan berdasarkan zona waktu LOKAL pengguna (WIB / browser time)
  const filteredMatches = useMemo(() => {
    if (!matches || matches.length === 0) return [];
    if (timeFilter === "all") return matches;

    return matches.filter((m) => {
      // Dapatkan kategori hari lokal: 'today' | 'yesterday' | 'tomorrow' | 'other'
      const category = getMatchLocalDayCategory(m.utcDate);

      const isLive =
        m.status === "LIVE" ||
        m.status === "IN_PLAY" ||
        m.status === "PAUSED";

      if (timeFilter === "today") {
        // Laga hari ini waktu lokal atau laga yang saat ini live
        return category === "today" || isLive;
      }
      if (timeFilter === "yesterday") {
        // Laga kemarin waktu lokal
        return category === "yesterday";
      }
      if (timeFilter === "tomorrow") {
        // Laga besok waktu lokal (termasuk kick-off jam 02.00 pagi besok)
        return category === "tomorrow";
      }
      return true;
    });
  }, [matches, timeFilter]);

  const displayMatches = filteredMatches;

  return (
    <div className="matches-list-root">
      {/* Time Filter Pill Buttons */}
      <div className="time-filters-bar">
        <div className="time-pills-group" role="tablist" aria-label="Filter Waktu Pertandingan">
          <button
            type="button"
            onClick={() => setTimeFilter("all")}
            className={`time-pill-btn ${timeFilter === "all" ? "active" : ""}`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter("yesterday")}
            className={`time-pill-btn ${timeFilter === "yesterday" ? "active" : ""}`}
          >
            Kemarin
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter("today")}
            className={`time-pill-btn ${timeFilter === "today" ? "active" : ""}`}
          >
            Hari Ini
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter("tomorrow")}
            className={`time-pill-btn ${timeFilter === "tomorrow" ? "active" : ""}`}
          >
            Besok
          </button>
        </div>

        <span className="text-[11px] font-mono text-zinc-400">
          {displayMatches.length} Laga
        </span>
      </div>

      {/* Match Rows List */}
      {displayMatches.length === 0 ? (
        <div className="empty-data-box py-8 text-center">
          <p className="text-zinc-400 text-xs">
            {searchQuery
              ? `Tidak ada pertandingan yang cocok dengan pencarian "${searchQuery}".`
              : timeFilter === "yesterday"
              ? "Tidak ada pertandingan kemarin."
              : timeFilter === "today"
              ? "Tidak ada pertandingan hari ini."
              : timeFilter === "tomorrow"
              ? "Tidak ada jadwal pertandingan untuk besok."
              : "Tidak ada pertandingan yang cocok."}
          </p>
          {(timeFilter !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setTimeFilter("all");
                if (onResetSearch) onResetSearch();
              }}
              className="mt-2.5 text-xs text-white underline underline-offset-2 hover:text-emerald-400 font-medium inline-block"
            >
              Lihat semua jadwal
            </button>
          )}
        </div>
      ) : (
        <div className="matches-table-body">
          {displayMatches.map((match) => {
            const isLive =
              match.status === "LIVE" ||
              match.status === "IN_PLAY" ||
              match.status === "PAUSED";
            const isFinished = match.status === "FINISHED";
            const isExpanded = expandedId === match.id;
            const { date, time } = formatMatchDateTime(match.utcDate);

            const homeScore = match.score?.fullTime?.home;
            const awayScore = match.score?.fullTime?.away;
            const htHome = match.score?.halfTime?.home;
            const htAway = match.score?.halfTime?.away;

            return (
              <div
                key={match.id}
                className={`match-row-wrapper ${isExpanded ? "row-expanded" : ""}`}
              >
                {/* Main Match Row (Clickable) */}
                <div
                  className="match-row-item cursor-pointer"
                  onClick={() => toggleExpand(match.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleExpand(match.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  title="Klik untuk melihat detail pertandingan"
                >
                  {/* Left Area: Status/Time Badge + Home Team */}
                  <div className="row-left-cluster">
                    {/* Status / Kickoff Time Pill (tightly adjacent to Home Team) */}
                    <div className="status-time-box">
                      {isLive ? (
                        match.status === "PAUSED" ? (
                          <div className="flex items-center gap-1.5 text-red-500 font-bold font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                            <span>HT</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-emerald-500 font-bold font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <span>{match.minute ? (match.minute.includes("'") ? match.minute : `${match.minute}'`) : "LIVE"}</span>
                          </div>
                        )
                      ) : isFinished ? (
                        <span className="time-tag-finished">FT</span>
                      ) : (
                        <span className="time-tag-timed" title={date}>
                          {time !== "-" ? time : "TBD"}
                        </span>
                      )}
                    </div>

                    {/* Home Team */}
                    <div className="team-entity home">
                      <span className="team-title-text" title={match.homeTeam?.name}>
                        {match.homeTeam?.shortName || match.homeTeam?.name || "Home"}
                      </span>
                      {match.homeTeam?.crest ? (
                        <img
                          src={match.homeTeam.crest}
                          alt=""
                          className="crest-icon"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="crest-placeholder"
                        style={{ display: match.homeTeam?.crest ? "none" : "flex" }}
                      >
                        {(match.homeTeam?.shortName || "H").substring(0, 2)}
                      </div>
                    </div>
                  </div>

                  {/* Center: Score or VS */}
                  <div className="row-center-score">
                    {isFinished || isLive ? (
                      <span className={`score-badge-box ${isLive ? "score-live" : ""}`}>
                        {homeScore ?? 0} - {awayScore ?? 0}
                      </span>
                    ) : (
                      <span className="score-vs-box">vs</span>
                    )}
                  </div>

                  {/* Right Area: Away Team */}
                  <div className="row-right-cluster">
                    <div className="team-entity away">
                      {match.awayTeam?.crest ? (
                        <img
                          src={match.awayTeam.crest}
                          alt=""
                          className="crest-icon"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="crest-placeholder"
                        style={{ display: match.awayTeam?.crest ? "none" : "flex" }}
                      >
                        {(match.awayTeam?.shortName || "A").substring(0, 2)}
                      </div>
                      <span className="team-title-text" title={match.awayTeam?.name}>
                        {match.awayTeam?.shortName || match.awayTeam?.name || "Away"}
                      </span>
                    </div>

                    {/* Subtle Expand Chevron Indicator */}
                    <span className={`expand-chevron ${isExpanded ? "rotated" : ""}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {/* EXPANDABLE DETAIL DRAWER */}
                {isExpanded && (
                  <div className="match-expanded-drawer">
                    <div className="drawer-inner-grid">
                      {/* Meta Information */}
                      <div className="drawer-meta-col">
                        <span className="drawer-label">Kompetisi & Jadwal</span>
                        <p className="drawer-val">
                          {competitionName} • Matchday {match.matchday || "-"}
                        </p>
                        <p className="drawer-subval text-zinc-400">
                          📅 {date} {time !== "-" ? `• ${time}` : ""}
                        </p>
                      </div>

                      {/* Halftime & Venue */}
                      <div className="drawer-score-col">
                        <span className="drawer-label">Status & Skor Babak</span>
                        {htHome !== undefined && htHome !== null ? (
                          <p className="drawer-val font-mono">
                            Babak 1 (HT): <strong className="text-white">{htHome} - {htAway}</strong>
                          </p>
                        ) : (
                          <p className="drawer-val text-zinc-400">
                            Status: <span className="text-white font-medium">{match.status}</span>
                          </p>
                        )}
                        {match.venue && (
                          <p className="drawer-subval text-zinc-400 truncate">
                            📍 {match.venue}
                          </p>
                        )}
                      </div>

                      {/* Statistics / Scorers Placeholder */}
                      <div className="drawer-stats-col">
                        <span className="drawer-label">Statistik & Gol</span>
                        {match.goals && match.goals.length > 0 ? (
                          <div className="space-y-0.5 mt-0.5">
                            {match.goals.map((g, idx) => (
                              <p key={idx} className="drawer-val text-xs">
                                ⚽ {g.scorer?.name} ({g.minute}')
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="drawer-placeholder-text">
                            Data statistik belum tersedia
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
