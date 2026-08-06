import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useProjects } from '../../context/ProjectContext';
import { useCart } from '../../context/CartContext';
import { useChat } from '../../context/ChatContext';

export default function AdminDashboard() {
  const { templates, payouts } = useMarketplace();
  const { projects } = useProjects();
  const { orders } = useCart();
  const { messages } = useChat();

  const pendingTemplates = templates.filter(t => t.status === 'Pending Review');
  const pendingPayouts = payouts.filter(p => p.status === 'Pending Review' || p.status === 'Diproses');
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0) + 4250000;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="section-padding space-y-10">
      <div className="container space-y-8">
        {/* Admin Header */}
        <div className="bg-slate-900 border border-slate-700/80 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] bg-purple-600 text-white px-2.5 py-0.5 rounded font-extrabold uppercase">
              SUPER ADMIN PANEL
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">Konsol Administrator WebCraft</h1>
            <p className="text-xs text-slate-400">Pusat kendali ekosistem agency, marketplace template, moderasi, transaksi & live chat.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link to="/admin/templates" className="btn btn-secondary px-4 py-2.5 text-xs font-bold text-yellow-400 border-yellow-500/30">
              <i className="fa-solid fa-clock-history"></i> Moderasi ({pendingTemplates.length})
            </Link>
            <Link to="/admin/orders" className="btn btn-secondary px-4 py-2.5 text-xs font-bold text-accentCyan border-accentCyan/30">
              <i className="fa-solid fa-diagram-project"></i> Orders Proyek ({projects.length})
            </Link>
            <Link to="/admin/chat" className="btn btn-primary btn-glow px-4 py-2.5 text-xs font-bold">
              <i className="fa-solid fa-headset"></i> Live Chat Console
            </Link>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Total Omset Platform</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold text-emerald-400">{formatRupiah(totalRevenue)}</span>
              <i className="fa-solid fa-sack-dollar text-2xl text-emerald-400/50"></i>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Pending Moderasi Template</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-yellow-400">{pendingTemplates.length}</span>
              <i className="fa-solid fa-hourglass-half text-2xl text-yellow-400/50"></i>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Proyek Website Aktif</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-accentCyan">{projects.length}</span>
              <i className="fa-solid fa-bars-progress text-2xl text-accentCyan/50"></i>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Total Pesan Live Chat</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-purple-400">{messages.length}</span>
              <i className="fa-solid fa-comments text-2xl text-purple-400/50"></i>
            </div>
          </div>
        </div>

        {/* Quick Admin Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Moderation Box */}
          <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-yellow-400"></i> Submisi Template Perlu Moderasi
              </h3>
              <Link to="/admin/templates" className="text-xs text-yellow-400 font-bold hover:underline">Kelola &rarr;</Link>
            </div>

            {pendingTemplates.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">Tidak ada template baru menunggu moderasi saat ini.</p>
            ) : (
              pendingTemplates.map(t => (
                <div key={t.id} className="bg-white/5 p-3 rounded-2xl border border-white/10 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">Seller: {t.sellerName}</p>
                  </div>
                  <Link to="/admin/templates" className="btn btn-secondary px-3 py-1.5 text-[11px] font-bold">
                    Review
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* Orders Box */}
          <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-diagram-project text-accentCyan"></i> Proyek Jasa Terdaftar
              </h3>
              <Link to="/admin/orders" className="text-xs text-accentCyan font-bold hover:underline">Kelola &rarr;</Link>
            </div>

            {projects.map(p => (
              <div key={p.id} className="bg-white/5 p-3 rounded-2xl border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-white">{p.name}</h4>
                  <p className="text-[11px] text-slate-400">Klien: {p.customerName} • Progres: {p.progress}%</p>
                </div>
                <span className="text-[10px] bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded font-bold">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
