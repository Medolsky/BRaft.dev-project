import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AGENCY_PACKAGES } from '../data/servicesData';
import { INITIAL_TEMPLATES } from '../data/templatesData';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const [displayText, setDisplayText] = useState('');
  const [count, setCount] = useState(0);
  const statsRef = useRef(null);
  const { addToCart } = useCart();

  // Typewriter effect
  useEffect(() => {
    const words = ["Digital Agency Presisi", "Marketplace Template Website", "Aplikasi Skripsi & Enterprise"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setDisplayText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
      }

      timeoutId = setTimeout(type, typeSpeed);
    }

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  // Counter stats animation
  useEffect(() => {
    if (!statsRef.current) return;
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          const target = 150;
          let current = 0;
          const increment = target / 30;

          const updateCount = () => {
            current += increment;
            if (current < target) {
              setCount(Math.ceil(current));
              requestAnimationFrame(updateCount);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(updateCount);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const formatRupiah = (num) => {
    return typeof num === 'number'
      ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num)
      : num;
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20">
        <div className="container text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-accentCyan/40 text-accentCyan text-xs font-bold uppercase tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-accentCyan animate-ping"></span>
            Unified Digital Agency & Marketplace Ecosystem
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Bangun Website Profesional atau <br />
            <span className="gradient-text">{displayText || 'Temukan Template Siap Pakai'}</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Platform terpadu penyedia jasa pembuatan website presisi, marketplace template terverifikasi, serta sistem manajemen proyek & lisensi dalam satu ekosistem akun.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/services" className="btn btn-primary btn-glow px-8 py-3.5 text-base font-bold">
              <i className="fa-solid fa-briefcase"></i> Pesan Jasa Website
            </Link>
            <Link to="/templates" className="btn btn-secondary px-8 py-3.5 text-base font-bold">
              <i className="fa-solid fa-store text-accentPurple"></i> Jelajahi Marketplace
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto" ref={statsRef}>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-extrabold text-accentCyan block">{count}+</span>
              <span className="text-xs text-slate-400 font-semibold">Proyek Selesai</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-extrabold text-purple-400 block">850+</span>
              <span className="text-xs text-slate-400 font-semibold">Template Terjual</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-extrabold text-emerald-400 block">4.9 / 5</span>
              <span className="text-xs text-slate-400 font-semibold">Kepuasan Klien</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <span className="text-2xl font-extrabold text-pink-400 block">100%</span>
              <span className="text-xs text-slate-400 font-semibold">Clean Code Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="container space-y-12">
        <div className="section-header center">
          <span className="section-tag">Layanan Agency Utama</span>
          <h2 className="section-title">Solusi Pembuatan Website Disesuaikan Kebutuhan</h2>
          <p className="section-subtitle">
            Dari landing page promosi UMKM, bantuan aplikasi skripsi mahasiswa, hingga sistem enterprise custom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AGENCY_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-slate-900/80 border border-slate-700/80 hover:border-accentCyan/60 rounded-3xl p-8 transition-all hover:-translate-y-2 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-accentCyan/20 text-accentCyan px-3 py-1 rounded-full uppercase">
                    {pkg.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{pkg.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-accentCyan transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{pkg.description}</p>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-2xl font-extrabold text-white">{formatRupiah(pkg.price)}</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-300">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-emerald-400 text-xs"></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="w-full btn btn-primary btn-glow py-3 font-bold text-xs"
                onClick={() => addToCart(pkg, 'package', typeof pkg.price === 'number' ? pkg.price : 2500000)}
              >
                <i className="fa-solid fa-calculator"></i> Pesan Layanan Ini
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Templates Marketplace Highlight */}
      <section className="container space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="section-tag">Marketplace Digital</span>
            <h2 className="section-title text-left">Template Website Siap Gunakan</h2>
          </div>
          <Link to="/templates" className="btn btn-secondary font-bold text-xs flex items-center gap-2">
            Lihat Semua Template <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-slate-900/80 border border-slate-700/80 hover:border-purple-500/60 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 shadow-xl flex flex-col justify-between"
            >
              <div className="relative h-48 bg-slate-950">
                <img src={tmpl.thumbnail} alt={tmpl.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {tmpl.categoryLabel}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>by {tmpl.sellerName}</span>
                    <span className="text-yellow-400 font-bold">★ {tmpl.rating} ({tmpl.salesCount} Terjual)</span>
                  </div>
                  <h3 className="text-base font-bold text-white line-clamp-1">{tmpl.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{tmpl.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Mulai dari</span>
                    <span className="text-lg font-extrabold text-accentCyan">
                      {formatRupiah(tmpl.licenses.personal)}
                    </span>
                  </div>

                  <Link
                    to={`/template/${tmpl.id}`}
                    className="btn btn-secondary px-4 py-2 text-xs font-bold"
                  >
                    Detail & Preview
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Case Studies Highlight */}
      <section className="container space-y-12">
        <div className="section-header center">
          <span className="section-tag">Hasil Karya Teruji</span>
          <h2 class="section-title">Portfolio Showcase & Case Study</h2>
          <p class="section-subtitle">Studi kasus proyek website yang telah berhasil diselesaikan dengan hasil terukur.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.map((item) => (
            <div key={item.id} className="bg-slate-900/80 border border-slate-700/80 p-6 rounded-3xl space-y-4 shadow-xl">
              <img src={item.thumbnail} alt={item.title} className="w-full h-44 object-cover rounded-2xl border border-white/10" />
              <span className="text-[11px] bg-cyan-500/20 text-accentCyan px-2.5 py-1 rounded-full font-bold">
                {item.category}
              </span>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.solution}</p>
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                {item.metrics.map((m, idx) => (
                  <span key={idx} className="text-[10px] bg-white/5 border border-white/10 text-emerald-400 font-bold px-2 py-0.5 rounded">
                    ✓ {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
