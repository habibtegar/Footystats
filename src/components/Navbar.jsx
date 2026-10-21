import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar({ activeSection = "matches", onSelectSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsNotice, setNewsNotice] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    setMobileMenuOpen(false);
    if (onSelectSection) {
      onSelectSection(section);
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(
          section === "matches" ? "matches-section" : "side-panel-section"
        );
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(
        section === "matches" ? "matches-section" : "side-panel-section"
      );
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNewsClick = () => {
    setNewsNotice(true);
    setTimeout(() => setNewsNotice(false), 3500);
  };

  const isHome = location.pathname === "/";
  const isFavorites = location.pathname === "/favorites";
  const isAbout = location.pathname === "/about";

  return (
    <header className="navbar-wrapper sticky top-0 z-50 bg-[#09090b] border-b border-zinc-800">
      <div className="navbar-minimal">
        <div className="container-main navbar-inner">
          {/* Left: Minimal Logo */}
          <Link to="/" className="nav-brand" aria-label="FootyStats">
            <span>FootyStats</span>
            <span className="nav-brand-dot">•</span>
          </Link>

          {/* Center: Desktop Navigation (6 Items) */}
          <nav className="nav-menu hidden md:flex" aria-label="Navigasi Utama">
            {/* 1. Jadwal & Hasil */}
            <button
              type="button"
              onClick={() => handleSectionClick("matches")}
              className={`nav-menu-item ${
                isHome && activeSection === "matches" ? "text-white font-semibold active-nav" : "text-zinc-400"
              }`}
            >
              Jadwal & Hasil
            </button>

            {/* 2. Klasemen */}
            <button
              type="button"
              onClick={() => handleSectionClick("standings")}
              className={`nav-menu-item ${
                isHome && activeSection === "standings" ? "text-white font-semibold active-nav" : "text-zinc-400"
              }`}
            >
              Klasemen
            </button>

            {/* 3. Statistik (Top Skor & Tim) */}
            <button
              type="button"
              onClick={() => handleSectionClick("scorers")}
              className={`nav-menu-item ${
                isHome && activeSection === "scorers" ? "text-white font-semibold active-nav" : "text-zinc-400"
              }`}
            >
              Statistik
            </button>

            {/* 4. Tim Favorit */}
            <Link
              to="/favorites"
              className={`nav-menu-item ${
                isFavorites ? "text-white font-semibold active-nav" : "text-zinc-400"
              }`}
            >
              Tim Favorit
            </Link>

            {/* 5. Berita (Dengan Badge SEGERA) */}
            <button
              type="button"
              onClick={handleNewsClick}
              className="nav-menu-item text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Fitur Berita Sepak Bola Sedang Dalam Pengembangan"
            >
              <span>Berita</span>
              <span className="border border-zinc-700 bg-zinc-900 text-[10px] text-zinc-400 px-1.5 py-0.2 rounded font-mono uppercase tracking-wider">
                SEGERA
              </span>
            </button>

            {/* 6. Tentang (Portfolio Showcase) */}
            <Link
              to="/about"
              className={`nav-menu-item ${
                isAbout ? "text-white font-semibold active-nav" : "text-zinc-400"
              }`}
            >
              Tentang
            </Link>
          </nav>

          {/* Right: Small Passive Badge & Mobile Hamburger Button */}
          <div className="flex items-center gap-2.5">
            <div className="status-badge-passive hidden sm:inline-flex" title="Status: Online • Football-Data.org">
              <span className="status-indicator-dot" />
              <span>Live Data</span>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900 focus:outline-none transition-colors"
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Utilitarian Toast / Notice Bar: Muncul jika mengklik menu Berita */}
      {newsNotice && (
        <div className="bg-zinc-900 border-b border-zinc-800 py-2 px-4 text-xs text-zinc-300">
          <div className="container-main flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">📢</span>
              <span>
                <strong>Fitur Berita Sepak Bola:</strong> Sedang dalam tahap pengembangan untuk kurasi berita dari liga-liga top Eropa.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setNewsNotice(false)}
              className="text-zinc-400 hover:text-white text-xs ml-3"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer (Visible only when mobileMenuOpen is true on small screens) */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-3 space-y-1 animate-fadeIn"
          aria-label="Navigasi Mobile"
        >
          <button
            type="button"
            onClick={() => handleSectionClick("matches")}
            className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
              isHome && activeSection === "matches"
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <span>Jadwal & Hasil</span>
            {isHome && activeSection === "matches" && <span className="text-emerald-400 text-xs">●</span>}
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("standings")}
            className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
              isHome && activeSection === "standings"
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <span>Klasemen</span>
            {isHome && activeSection === "standings" && <span className="text-emerald-400 text-xs">●</span>}
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("scorers")}
            className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
              isHome && activeSection === "scorers"
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <span>Statistik</span>
            {isHome && activeSection === "scorers" && <span className="text-emerald-400 text-xs">●</span>}
          </button>

          <Link
            to="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
              isFavorites
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <span>Tim Favorit</span>
            {isFavorites && <span className="text-emerald-400 text-xs">●</span>}
          </Link>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleNewsClick();
            }}
            className="w-full text-left px-3 py-2 rounded text-xs text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>Berita</span>
              <span className="border border-zinc-700 bg-zinc-900 text-[10px] text-zinc-400 px-1.5 py-0.2 rounded font-mono uppercase tracking-wider">
                SEGERA
              </span>
            </div>
            <span className="text-zinc-500 text-[11px]">Preview</span>
          </button>

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
              isAbout
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <span>Tentang (Pengembang)</span>
            {isAbout && <span className="text-emerald-400 text-xs">●</span>}
          </Link>

          {/* Status info row inside mobile drawer */}
          <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-[11px] text-zinc-500 px-3 font-mono">
            <span>Status API</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online (Live Data)
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}
