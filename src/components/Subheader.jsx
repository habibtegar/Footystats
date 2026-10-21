import { LEAGUES } from "../lib/mockFootballData";

export function Subheader({
  selectedLeague,
  onSelectLeague,
  searchQuery,
  onSearchChange,
  onClearSearch,
}) {
  return (
    <div className="subheader-bar">
      <div className="container-main subheader-inner">
        {/* League Selector Tabs with High Contrast Active State */}
        <div className="league-tabs-group" role="tablist">
          {LEAGUES.map((league) => {
            const isActive = selectedLeague === league.code;
            return (
              <button
                key={league.code}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectLeague(league.code)}
                className={`league-tab-btn ${isActive ? "active" : ""}`}
              >
                <span className="text-sm">{league.flag}</span>
                <span>{league.name}</span>
                {isActive && <span className="active-pill-dot" />}
              </button>
            );
          })}
        </div>

        {/* Compact Search Input */}
        <div className="search-input-box">
          <input
            type="text"
            className="search-input"
            placeholder="Cari nama klub..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Cari tim sepak bola"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear"
              onClick={onClearSearch}
              aria-label="Hapus kata kunci"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
