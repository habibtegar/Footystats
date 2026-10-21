import { Link } from "react-router-dom";

export function Navbar({ activeSection = "matches", onSelectSection }) {
  const handleNavClick = (section) => {
    if (onSelectSection) {
      onSelectSection(section);
    }
    const el = document.getElementById(
      section === "matches" ? "matches-section" : "side-panel-section"
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar-minimal">
      <div className="container-main navbar-inner">
        {/* Left: Minimal Logo */}
        <Link to="/" className="nav-brand" aria-label="FootyStats">
          <span>FootyStats</span>
          <span className="nav-brand-dot">•</span>
        </Link>

        {/* Center: Main Functional Views */}
        <nav className="nav-menu" aria-label="Navigasi Utama">
          <button
            type="button"
            onClick={() => handleNavClick("matches")}
            className={`nav-menu-item ${activeSection === "matches" ? "text-white font-semibold" : ""}`}
          >
            Jadwal & Hasil
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("standings")}
            className={`nav-menu-item ${activeSection === "standings" ? "text-white font-semibold" : ""}`}
          >
            Klasemen
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("scorers")}
            className={`nav-menu-item ${activeSection === "scorers" ? "text-white font-semibold" : ""}`}
          >
            Top Skor
          </button>
        </nav>

        {/* Right: Small Passive Badge */}
        <div className="status-badge-passive" title="Status: Online • Football-Data.org">
          <span className="status-indicator-dot" />
          <span>Live Data</span>
        </div>
      </div>
    </header>
  );
}
