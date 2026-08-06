import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { Link } from 'react-router-dom';

export default function PortfolioPage() {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="section-padding space-y-12">
      <div className="container space-y-10">
        <div className="section-header center space-y-3">
          <span className="section-tag">Studi Kasus Proyek</span>
          <h1 className="section-title">Portfolio Pembuatan Website & Sistem</h1>
          <p className="section-subtitle">
            Lihat bagaimana WebCraft membantu UMKM, mahasiswa, dan perusahaan enterprise mencapai efisiensi digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-700/80 hover:border-accentCyan/60 rounded-3xl overflow-hidden shadow-2xl transition-all hover:-translate-y-2 flex flex-col justify-between"
            >
              <div className="relative h-48 bg-slate-950">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-cyan-500/20 text-accentCyan text-[11px] font-bold px-3 py-1 rounded-full border border-accentCyan/40">
                  {item.category}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400">Klien: {item.client} • {item.duration}</span>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-3">{item.solution}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1">
                    {item.metrics.map((m, idx) => (
                      <span key={idx} className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                        ✓ {m}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="w-full btn btn-secondary py-2 text-xs font-bold"
                    onClick={() => setSelectedCase(item)}
                  >
                    Baca Full Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Case Study Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 p-8 rounded-3xl max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-accentCyan font-bold uppercase">{selectedCase.category}</span>
                <h2 className="text-xl font-extrabold text-white">{selectedCase.title}</h2>
              </div>
              <button onClick={() => setSelectedCase(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div>
                <h4 className="font-bold text-white mb-1">🎯 Tantangan Masalah (Challenge):</h4>
                <p className="bg-white/5 p-3 rounded-xl border border-white/10">{selectedCase.challenge}</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">💡 Solusi WebCraft:</h4>
                <p className="bg-white/5 p-3 rounded-xl border border-white/10">{selectedCase.solution}</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">📈 Hasil & Dampak (Impact):</h4>
                <p className="bg-emerald-500/10 text-emerald-300 p-3 rounded-xl border border-emerald-500/30 font-semibold">{selectedCase.impact}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <Link to="/services" className="btn btn-primary btn-glow px-6 py-2.5 text-xs font-bold">
                Pesan Layanan Serupa
              </Link>
              <button onClick={() => setSelectedCase(null)} className="btn btn-secondary px-4 py-2 text-xs font-bold">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
