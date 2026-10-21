import { Link } from "react-router-dom";

export function AboutPage() {
  const techStack = [
    { name: "React 19", role: "Framework UI Utama & State Management", icon: "⚛️" },
    { name: "Tailwind CSS", role: "Utilitarian Styling & Responsive Design", icon: "🎨" },
    { name: "Vite", role: "Modern Fast Build Tool & Dev Server", icon: "⚡" },
    { name: "Vercel", role: "Continuous Deployment & Production Hosting", icon: "▲" },
    { name: "Football-Data.org API", role: "RESTful Football Match & Standings Provider", icon: "⚽" },
  ];

  const architecturalHighlights = [
    {
      title: "Client-Side Caching (5 Menit)",
      description: "Memanfaatkan kombinasi sessionStorage browser dan in-memory Map dengan TTL 300.000 ms. Mencegah error HTTP 429 pada kuota free-tier 10 req/menit tanpa mengorbankan kesegaran data.",
    },
    {
      title: "Local Timezone Engine (WIB / GMT+7)",
      description: "Mengonversi seluruh string utcDate standar API ke zona waktu lokal pengguna sebelum diklasifikasikan ke tab waktu. Laga jam 02.00 pagi yang melewati tengah malam tetap akurat terdata di hari berikutnya.",
    },
    {
      title: "Clean Data-Dashboard Aesthetics",
      description: "Menghindari efek visual berlebihan (no AI-slop, no neon glow, no bloated shadows). Menggunakan tema monokromatik solid (zinc-950/zinc-900), border tegas, dan tipografi sans-serif serta monospace.",
    },
    {
      title: "Responsive Grid Breakdown",
      description: "Proporsi 2:1 desktop (Jadwal di kiri, Klasemen di kanan) yang secara otomatis bertransisi menjadi tumpukan vertikal (flex-col) serta menyembunyikan kolom sekunder (GD) di layar ponsel.",
    },
  ];

  return (
    <div className="flex-1">
      {/* Subheader Bar */}
      <div className="subheader-bar">
        <div className="container-main subheader-inner">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">ℹ️ Tentang FootyStats</span>
              <span className="text-zinc-600 font-normal">/</span>
              <span className="text-xs text-zinc-400 font-mono">Profil Projek & Pengembang</span>
            </div>
            <Link
              to="/"
              className="text-xs text-zinc-300 hover:text-white underline underline-offset-2"
            >
              ← Kembali ke Jadwal
            </Link>
          </div>
        </div>
      </div>

      <main className="container-main py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Kolom Kiri: Profil Pengembang & Ringkasan Projek */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card: Profil Pengembang */}
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">
                  <span>Profil Pengembang</span>
                  <span className="text-zinc-600 font-normal">/</span>
                  <span className="panel-tag">Developer Showcase</span>
                </h2>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                  Siswa Aktif
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Avatar & Header Name */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-zinc-800">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-lg font-bold text-white shrink-0">
                    HT
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Habib Tegar Ramadhan
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      Frontend & Web Software Enthusiast
                    </p>
                  </div>
                </div>

                {/* Info Detail Grid */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[11px] text-zinc-500 uppercase font-mono block mb-1">
                      Institusi Pendidikan
                    </span>
                    <p className="text-zinc-200 font-medium">
                      SMKN 1 Ciomas
                    </p>
                    <p className="text-zinc-400 text-[11px]">
                      Jurusan: PPLG (Pengembangan Perangkat Lunak dan Gim)
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/60">
                    <span className="text-[11px] text-zinc-500 uppercase font-mono block mb-1">
                      Deskripsi Projek
                    </span>
                    <blockquote className="text-zinc-300 italic border-l-2 border-zinc-750 pl-3 py-1 my-1 leading-relaxed bg-zinc-950/60 rounded-r">
                      "FootyStats adalah portal data sepak bola real-time yang dikembangkan sebagai proyek eksplorasi teknologi web modern."
                    </blockquote>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/60">
                    <span className="text-[11px] text-zinc-500 uppercase font-mono block mb-1">
                      Fokus Pengembangan
                    </span>
                    <p className="text-zinc-400 leading-relaxed text-[11px]">
                      Membangun antarmuka data yang cepat, bebas distorsi estetika artifisial (*no AI-slop*), hemat kuota API melalui arsitektur caching mutakhir, dan responsif di berbagai perangkat.
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-medium border border-zinc-700 transition-colors"
                  >
                    <span>Terbuka untuk Portofolio & Kolaborasi</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card: Cakupan Liga */}
            <div className="panel p-4 text-xs">
              <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-2">
                Kompetisi yang Didukung
              </span>
              <div className="grid grid-cols-2 gap-2 text-zinc-300 font-mono text-[11px]">
                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                  🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League (PL)
                </div>
                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                  🇪🇸 La Liga (PD)
                </div>
                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                  🇮🇹 Serie A (SA)
                </div>
                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                  🇪🇺 Champions League (CL)
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Tech Stack Chips & Arsitektur */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card: Tech Stack Chips */}
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">
                  <span>Tech Stack & Ekosistem</span>
                  <span className="text-zinc-600 font-normal">/</span>
                  <span className="panel-tag">Teknologi yang Digunakan</span>
                </h2>
                <span className="text-[11px] font-mono text-zinc-500">
                  Modern Web
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  Platform dibangun menggunakan ekosistem pengembangan web modern untuk menjamin keandalan perenderan data, kecepatan proses *build*, serta modularitas kode:
                </p>

                {/* Tech Chips List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-3 bg-zinc-950 border border-zinc-800 rounded flex items-start gap-2.5 hover:border-zinc-700 transition-colors"
                    >
                      <span className="text-lg shrink-0 mt-0.5">{tech.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white font-mono">
                          {tech.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          {tech.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card: Sorotan Rekayasa Teknis */}
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">
                  <span>Sorotan Rekayasa Teknis</span>
                  <span className="text-zinc-600 font-normal">/</span>
                  <span className="panel-tag">Arsitektur & Solusi Masalah</span>
                </h2>
                <span className="text-[11px] font-mono text-zinc-500">
                  Best Practices
                </span>
              </div>

              <div className="p-5 divide-y divide-zinc-800/80">
                {architecturalHighlights.map((item, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-3.5 mt-3.5" : ""}>
                    <h4 className="text-xs font-bold text-zinc-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mt-1 pl-3.5">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
