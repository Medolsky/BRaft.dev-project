import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';

export default function SellerDashboard() {
  const { templates } = useMarketplace();
  const { user } = useAuth();

  const myTemplates = templates.filter(t => t.sellerName === user?.name || t.sellerName === 'Alex Creator' || t.sellerName === 'BraftDev Official');

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="section-padding space-y-10">
      <div className="container space-y-8">
        {/* Seller Banner */}
        <div className="bg-slate-900 border border-slate-700/80 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={user?.avatar} alt={user?.name} className="w-16 h-16 rounded-2xl border-2 border-emerald-400 object-cover" />
            <div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded font-extrabold uppercase">
                CREATOR / SELLER DASHBOARD
              </span>
              <h1 className="text-2xl font-extrabold text-white mt-1">Studio Seller: {user?.name}</h1>
              <p className="text-xs text-slate-400">Jual template website Anda dan peroleh pendapatan pasif secara berkala.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/seller/add-template" className="btn btn-primary btn-glow px-4 py-2.5 text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-black">
              <i className="fa-solid fa-plus"></i> Upload Template Baru
            </Link>
            <Link to="/seller/payouts" className="btn btn-secondary px-4 py-2.5 text-xs font-bold">
              <i className="fa-solid fa-wallet"></i> Saldo & Payout
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Total Template Dipublikasi</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-emerald-400">{myTemplates.length}</span>
              <i className="fa-solid fa-store text-2xl text-emerald-400/50"></i>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Total Penjualan Lisensi</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-accentCyan">
                {myTemplates.reduce((acc, t) => acc + (t.salesCount || 0), 0)}
              </span>
              <i className="fa-solid fa-chart-line text-2xl text-accentCyan/50"></i>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Estimasi Pendapatan Bersih</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold text-purple-400">
                {formatRupiah(1850000)}
              </span>
              <i className="fa-solid fa-sack-dollar text-2xl text-purple-400/50"></i>
            </div>
          </div>
        </div>

        {/* Template Submissions List */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="fa-solid fa-folder-tree text-emerald-400"></i> Katalog Template Seller Anda
            </h2>
            <Link to="/seller/add-template" className="text-xs text-emerald-400 font-bold hover:underline">
              + Tambah Template &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {myTemplates.map((t) => (
              <div key={t.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <img src={t.thumbnail} alt={t.name} className="w-14 h-14 rounded-xl object-cover border border-white/10" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{t.name}</h3>
                    <p className="text-xs text-slate-400">{t.categoryLabel} • {t.salesCount} Sales</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                    t.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {t.status}
                  </span>
                  <span className="text-sm font-extrabold text-accentCyan">
                    {formatRupiah(t.licenses.personal)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
