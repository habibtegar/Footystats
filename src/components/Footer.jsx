import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer-minimal">
      <div className="container-main footer-inner text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span>© 2026 FootyStats</span>
          <span className="text-zinc-600">•</span>
          <span>Dibuat oleh <strong className="text-zinc-300">Habib Tegar Ramadhan</strong> (SMKN 1 Ciomas)</span>
          <span className="text-zinc-600">•</span>
          <Link to="/about" className="text-zinc-400 hover:text-white underline underline-offset-2">
            Tentang Projek
          </Link>
        </div>
        <div className="text-zinc-500 font-mono text-[11px] mt-1 sm:mt-0">
          <span>Live Data • Football-Data.org REST API</span>
        </div>
      </div>
    </footer>
  );
}
