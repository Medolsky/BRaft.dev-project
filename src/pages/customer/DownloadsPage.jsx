import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function DownloadsPage() {
  const { orders } = useCart();
  const { user } = useAuth();

  const userOrders = orders.filter(o => o.customerEmail === user?.email || o.customerName === user?.name) || orders;

  const templateItems = userOrders.flatMap(o =>
    o.items.map(item => ({
      ...item,
      orderId: o.id,
      purchaseDate: o.date
    }))
  );

  return (
    <div className="section-padding space-y-10">
      <div className="container space-y-8">
        <div className="section-header space-y-2">
          <span className="section-tag">Digital Library</span>
          <h1 className="section-title">Unduhan Template & Lisensi Resmi</h1>
          <p className="section-subtitle">Semua file source code template dan license key resmi hasil pembelian Anda.</p>
        </div>

        {templateItems.length === 0 ? (
          <div className="bg-slate-900 border border-slate-700/80 p-12 rounded-3xl text-center text-slate-400 space-y-3">
            <i className="fa-solid fa-cloud-arrow-down text-5xl text-slate-600"></i>
            <p className="font-bold text-lg">Belum Ada Unduhan Template</p>
            <p className="text-xs">Beli template di Marketplace untuk mengaktifkan lisensi dan link download instan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templateItems.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Order #{item.orderId} • {item.purchaseDate}</span>
                    <span className="bg-emerald-500/20 text-emerald-400 font-extrabold px-2.5 py-0.5 rounded uppercase">
                      ACTIVE LICENSE
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{item.name}</h3>

                  <div className="bg-black/50 p-3 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">LICENSE KEY RESMI:</span>
                    <span className="text-xs font-mono font-bold text-accentCyan select-all block">
                      {item.licenseKey || 'LIC-COMM-9812-X9A-KEY'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    className="flex-1 btn btn-primary btn-glow py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                    onClick={() => alert(`Mengunduh Source Code ZIP untuk ${item.name}...`)}
                  >
                    <i className="fa-solid fa-download"></i> Download Source Code (ZIP)
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary px-3 py-2.5 text-xs font-bold"
                    onClick={() => alert('Membuka dokumentasi instalasi...')}
                    title="Dokumentasi"
                  >
                    <i className="fa-solid fa-book"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
