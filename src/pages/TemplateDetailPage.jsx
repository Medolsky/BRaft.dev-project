import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { useCart } from '../context/CartContext';

export default function TemplateDetailPage() {
  const { id } = useParams();
  const { templates } = useMarketplace();
  const { addToCart } = useCart();
  const [selectedLicense, setSelectedLicense] = useState('personal');

  const template = templates.find(t => t.id === id || t.slug === id) || templates[0];

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="section-padding space-y-12">
      <div className="container space-y-10">
        <Link to="/templates" className="inline-flex items-center gap-2 text-xs text-accentCyan font-bold hover:underline">
          <i className="fa-solid fa-arrow-left"></i> Kembali ke Marketplace Templates
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Screenshot & Features (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4">
              <img src={template.thumbnail} alt={template.name} className="w-full h-80 sm:h-96 object-cover rounded-2xl border border-white/10" />

              <div className="flex items-center justify-between px-2">
                <span className="text-xs text-slate-400">File Size: {template.fileSize} • Last Updated: {template.updatedDate}</span>
                <a
                  href={template.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary px-4 py-2 text-xs font-bold flex items-center gap-2"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-accentCyan"></i> Live Interactive Preview
                </a>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-8 space-y-6 shadow-xl">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">Deskripsi & Fitur Utama</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{template.description}</p>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">Fitur Unggulan Included:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {template.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10">
                      <i className="fa-solid fa-circle-check text-emerald-400"></i>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar License Selector & Purchase (1 col) */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 space-y-6 shadow-2xl backdrop-blur-xl">
              <div className="space-y-2">
                <span className="text-xs font-bold text-accentPurple uppercase">{template.categoryLabel}</span>
                <h1 className="text-xl font-extrabold text-white">{template.name}</h1>
                <p className="text-xs text-slate-400">by {template.sellerName} • {template.version}</p>
              </div>

              {/* License Option Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-white block">Pilih Jenis Lisensi Penggunaan:</label>

                {/* Personal License */}
                <button
                  type="button"
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedLicense === 'personal' ? 'bg-accentCyan/15 border-accentCyan text-white' : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                  onClick={() => setSelectedLicense('personal')}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">Personal License</span>
                    <span className="text-sm font-extrabold text-accentCyan">{formatRupiah(template.licenses.personal)}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Untuk 1 website proyek pribadi atau tugas akhir.</p>
                </button>

                {/* Commercial License */}
                <button
                  type="button"
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedLicense === 'commercial' ? 'bg-accentPurple/15 border-accentPurple text-white' : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                  onClick={() => setSelectedLicense('commercial')}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">Commercial License</span>
                    <span className="text-sm font-extrabold text-purple-400">{formatRupiah(template.licenses.commercial)}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Untuk 1 proyek komersial klien / perusahaan.</p>
                </button>

                {/* Extended License */}
                <button
                  type="button"
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedLicense === 'extended' ? 'bg-emerald-500/15 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                  onClick={() => setSelectedLicense('extended')}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">Extended License</span>
                    <span className="text-sm font-extrabold text-emerald-400">{formatRupiah(template.licenses.extended)}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Dapat dijual ulang sebagai produk berbayar.</p>
                </button>
              </div>

              <button
                type="button"
                className="w-full btn btn-primary btn-glow py-3.5 font-extrabold text-xs flex items-center justify-center gap-2"
                onClick={() => addToCart(template, selectedLicense)}
              >
                <i className="fa-solid fa-cart-plus text-sm"></i> Beli Sekarang & Download Instant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
