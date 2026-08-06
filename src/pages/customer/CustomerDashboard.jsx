import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import { useCart } from '../../context/CartContext';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { orders } = useCart();

  const userProjects = projects.filter(p => p.customerEmail === user?.email || p.customerName === user?.name) || projects;
  const userOrders = orders.filter(o => o.customerEmail === user?.email || o.customerName === user?.name) || orders;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="section-padding space-y-10">
      <div className="container space-y-8">
        {/* User Banner */}
        <div className="bg-slate-900 border border-slate-700/80 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img src={user?.avatar} alt={user?.name} className="w-16 h-16 rounded-2xl border-2 border-accentCyan object-cover" />
            <div>
              <span className="text-[10px] bg-accentCyan/20 text-accentCyan px-2.5 py-0.5 rounded font-extrabold uppercase">
                {user?.role} ACCOUNT
              </span>
              <h1 className="text-2xl font-extrabold text-white mt-1">Selamat Datang, {user?.name}!</h1>
              <p className="text-xs text-slate-400">{user?.email} • Terdaftar sejak {user?.joinedDate || '2026'}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/account/projects" className="btn btn-primary btn-glow px-4 py-2.5 text-xs font-bold">
              <i className="fa-solid fa-list-check"></i> Proyek Jasa ({userProjects.length})
            </Link>
            <Link to="/account/downloads" className="btn btn-secondary px-4 py-2.5 text-xs font-bold">
              <i className="fa-solid fa-download"></i> Unduhan Template
            </Link>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Proyek Website Aktif</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-accentCyan">{userProjects.length}</span>
              <i className="fa-solid fa-diagram-project text-2xl text-accentCyan/50"></i>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Template Dibeli</span>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-purple-400">{userOrders.length}</span>
              <i className="fa-solid fa-box-archive text-2xl text-purple-400/50"></i>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-3xl shadow-xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Total Investasi</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold text-emerald-400">
                {formatRupiah(userOrders.reduce((acc, o) => acc + o.total, 0))}
              </span>
              <i className="fa-solid fa-wallet text-2xl text-emerald-400/50"></i>
            </div>
          </div>
        </div>

        {/* Active Projects Preview */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="fa-solid fa-bars-progress text-accentCyan"></i> Proyek Website Berjalan
            </h2>
            <Link to="/account/projects" className="text-xs text-accentCyan font-bold hover:underline">
              Kelola Proyek & Revisi &rarr;
            </Link>
          </div>

          {userProjects.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">Belum ada proyek jasa aktif. Silakan pesan melalui menu Services.</p>
          ) : (
            <div className="space-y-4">
              {userProjects.map((prj) => (
                <div key={prj.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <span className="text-[10px] text-accentCyan font-extrabold">{prj.id}</span>
                      <h3 className="text-sm font-bold text-white">{prj.name}</h3>
                    </div>
                    <span className="text-xs bg-purple-600/30 text-purple-300 font-bold px-3 py-1 rounded-full border border-purple-500/40 w-fit">
                      {prj.status}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                      <span>Progres Pengerjaan:</span>
                      <span>{prj.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accentCyan to-purple-500 rounded-full transition-all duration-500" style={{ width: `${prj.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
