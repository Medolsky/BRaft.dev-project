import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TEMPLATE_CATEGORIES } from '../data/templatesData';
import { useMarketplace } from '../context/MarketplaceContext';
import { useCart } from '../context/CartContext';

export default function TemplatesPage() {
  const { templates } = useMarketplace();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const approvedTemplates = templates.filter(t => t.status === 'Approved');

  const filteredTemplates = approvedTemplates.filter(t => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="section-padding space-y-12">
      <div className="container space-y-10">
        <div className="section-header center space-y-3">
          <span className="section-tag">Marketplace Template Website</span>
          <h1 className="section-title">Temukan Template SIAP PAKAI Terverifikasi</h1>
          <p className="section-subtitle">
            Dapatkan source code rapi, dokumentasi lengkap, dan lisensi instan untuk mempercepat proyek website Anda.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/90 border border-slate-700/80 p-4 rounded-2xl backdrop-blur-md shadow-xl">
          <div className="flex flex-wrap gap-2">
            {TEMPLATE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="Cari template website..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accentCyan"
            />
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-slate-900/90 border border-slate-700/80 hover:border-accentPurple rounded-3xl overflow-hidden transition-all hover:-translate-y-2 flex flex-col justify-between shadow-2xl group"
            >
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-purple-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg">
                    {template.categoryLabel}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
                    {template.version}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <img src={template.sellerAvatar} alt={template.sellerName} className="w-5 h-5 rounded-full object-cover" />
                      {template.sellerName}
                    </span>
                    <span className="text-yellow-400 font-bold">★ {template.rating} ({template.salesCount} Terjual)</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-accentPurple transition-colors line-clamp-1">
                    {template.name}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                    {template.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {template.techStack.map((tech, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Harga Lisensi Personal</span>
                    <span className="text-xl font-extrabold text-accentCyan">
                      {formatRupiah(template.licenses.personal)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/template/${template.id}`}
                      className="btn btn-secondary px-3 py-2 text-xs font-bold"
                    >
                      Detail
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary btn-glow px-3 py-2 text-xs font-bold"
                      onClick={() => addToCart(template, 'personal')}
                    >
                      <i className="fa-solid fa-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
