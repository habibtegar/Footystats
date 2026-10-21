import { Link } from "react-router-dom";

export function AboutPage() {
  const techStack = [
    {
      name: "React 19",
      role: "Framework UI & State Management",
      icon: "⚛️",
      badge: "Frontend Core",
    },
    {
      name: "Tailwind CSS",
      role: "Utilitarian Modern Styling",
      icon: "🎨",
      badge: "Design System",
    },
    {
      name: "Vite",
      role: "High-Performance Build Engine",
      icon: "⚡",
      badge: "Bundler",
    },
    {
      name: "Vercel",
      role: "Continuous Delivery & Hosting",
      icon: "▲",
      badge: "Deployment",
    },
    {
      name: "Football-Data API",
      role: "RESTful Provider (Top 4 Liga Eropa)",
      icon: "⚽",
      badge: "Data Source",
    },
    {
      name: "SessionStorage Cache",
      role: "Multi-tier Client Caching System",
      icon: "💾",
      badge: "Architecture",
    },
  ];

  const architecturalHighlights = [
    {
      title: "Client-Side Caching Mutakhir (TTL 5 Menit)",
      tag: "Optimasi API",
      description:
        "Memadukan sessionStorage browser dan in-memory Map dengan TTL 300.000 ms. Arsitektur ini mengeliminasi pemanggilan redundan, menjamin navigasi instan antar-tab liga, dan mencegah error HTTP 429 pada batas kuota 10 req/menit gratis dari Football-Data.org.",
    },
    {
      title: "Local Timezone Engine (WIB / UTC+7)",
      tag: "Akurasi Jadwal",
      description:
        "Seluruh tanggal kick-off utcDate dikonversi secara real-time ke zona waktu lokal pengguna sebelum diklasifikasikan ke filter hari. Pertandingan jam 02.00 dini hari yang melewati tengah malam tetap akurat terdata di hari berikutnya (Besok), bukan tertinggal di Hari Ini.",
    },
    {
      title: "Utilitarian & Clean Data Aesthetic",
      tag: "Tanpa AI-Slop",
      description:
        "Dirancang dengan prinsip keterbacaan data ala Apple Sports, FlashScore, dan SofaScore. Menghapus efek visual artifisial yang tidak perlu (tanpa neon glow, bayangan berlebihan, atau gradasi mencolok) demi fokus utama pada kejelasan skor dan klasemen.",
    },
    {
      title: "Responsive Grid & Mobile Optimization",
      tag: "UX Multi-Device",
      description:
        "Tata letak 2 kolom desktop dengan rasio proporsional bertransisi mulus menjadi 1 kolom vertikal di ponsel pintar. Kolom selisih gol (GD) pada klasemen mobile otomatis disembunyikan agar kolom poin (PTS) tetap terbaca jelas tanpa scroll horizontal.",
    },
  ];

  return (
    <div className="flex-1 bg-[#09090b] text-white">
      {/* Top Breadcrumb Header Bar */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-sm">
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold text-white">Tentang FootyStats</span>
              <span className="text-zinc-600 font-normal">/</span>
              <span className="text-xs text-zinc-400 font-mono">Portofolio & Rekayasa Sistem</span>
            </div>
            <Link
              to="/"
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              ← Kembali ke Jadwal
            </Link>
          </div>
        </div>
      </div>

      <main className="container-main py-10 md:py-16">
        {/* Main Bento Grid: Spacious & Breathable Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* KOLOM KIRI (Profil Pengembang & Info Siswa) - 5 Kolom */}
          <div className="lg:col-span-5 space-y-8">
            {/* Bento Card: Developer Profile */}
            <div className="bg-zinc-900 rounded-2xl p-8 md:p-10 transition-all">
              {/* Badge Status Siswa */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Siswa Aktif PPLG
                </span>
                <span className="text-xs text-zinc-500 font-mono">2026 Showcase</span>
              </div>

              {/* Avatar & Identitas Pengembang */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-zinc-800 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 border border-zinc-700/60 shadow-lg">
                  HT
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    Habib Tegar Ramadhan
                  </h1>
                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    Frontend & Web Application Enthusiast
                  </p>
                </div>
              </div>

              {/* Detail Pendidikan & Bio */}
              <div className="space-y-6 text-sm">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                    Institusi Pendidikan
                  </span>
                  <p className="text-base font-semibold text-white">
                    SMKN 1 Ciomas
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Kompetensi Keahlian: PPLG (Pengembangan Perangkat Lunak dan Gim)
                  </p>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                    Deskripsi Singkat
                  </span>
                  <div className="bg-zinc-950/80 rounded-xl p-5 border border-zinc-800/50">
                    <p className="text-sm text-zinc-300 italic leading-relaxed">
                      "FootyStats adalah portal data sepak bola real-time yang dikembangkan sebagai proyek eksplorasi teknologi web modern."
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                    Fokus Eksplorasi
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Mempelajari arsitektur data-fetching terdistribusi, manajemen state di React 19, sistem caching pada sisi browser, dan implementasi UI utilitarian yang cepat serta bebas distorsi artifisial.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-zinc-800/80">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
                >
                  <span>Lihat Repositori & Portofolio Pengembang</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Bento Card: Liga yang Didukung */}
            <div className="bg-zinc-900 rounded-2xl p-8">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4">
                Cakupan Kompetisi
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/60 flex items-center gap-2.5">
                  <span className="text-base">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                  <span className="text-zinc-200">Premier League</span>
                </div>
                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/60 flex items-center gap-2.5">
                  <span className="text-base">🇪🇸</span>
                  <span className="text-zinc-200">La Liga</span>
                </div>
                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/60 flex items-center gap-2.5">
                  <span className="text-base">🇮🇹</span>
                  <span className="text-zinc-200">Serie A</span>
                </div>
                <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/60 flex items-center gap-2.5">
                  <span className="text-base">🇪🇺</span>
                  <span className="text-zinc-200">Champions League</span>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (Bento Tech Stack & Sorotan Rekayasa) - 7 Kolom */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bento Card: Tech Stack (Kotak-kotak kecil ala Bento UI) */}
            <div className="bg-zinc-900 rounded-2xl p-8 md:p-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Tech Stack & Ekosistem
                </h2>
                <span className="text-xs font-mono text-zinc-500">6 Modul Utama</span>
              </div>
              <p className="text-xs text-zinc-400 mb-8 leading-relaxed">
                Platform dibangun dengan teknologi pilihan untuk memastikan performa loading instan, modularitas kode yang tinggi, dan kenyamanan pemeliharaan sistem:
              </p>

              {/* Bento Grid: 2 Kolom Kotak Teknologi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="bg-zinc-950/80 rounded-xl p-5 border border-zinc-800/50 hover:border-zinc-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-2xl">{tech.icon}</span>
                        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                          {tech.badge}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white font-mono">
                        {tech.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {tech.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Card: Sorotan Rekayasa Teknis */}
            <div className="bg-zinc-900 rounded-2xl p-8 md:p-10">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Sorotan Rekayasa Teknis
                </h2>
                <span className="text-xs font-mono text-zinc-500">Architecture</span>
              </div>
              <p className="text-xs text-zinc-400 mb-8 leading-relaxed">
                Solusi teknis yang diimplementasikan untuk memecahkan tantangan kuota API dan akurasi waktu:
              </p>

              {/* Items List dengan spacing vertikal lega (space-y-8) */}
              <div className="space-y-8">
                {architecturalHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-950/70 rounded-xl p-6 border border-zinc-800/40 hover:border-zinc-700/60 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span>{item.title}</span>
                      </h3>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 bg-zinc-900 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mt-2 pl-4 border-l border-zinc-800">
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
