import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';

export default function SellerPayoutPage() {
  const { payouts, requestPayout } = useMarketplace();
  const { user } = useAuth();
  const [amount, setAmount] = useState('500000');
  const [method, setMethod] = useState('Bank BCA - 1234567890 (a.n Seller)');

  const myPayouts = payouts.filter(p => p.sellerName === user?.name || p.sellerName === 'Alex Creator') || payouts;

  const handlePayoutSubmit = (e) => {
    e.preventDefault();
    requestPayout(user?.name || 'Seller Creator', parseInt(amount), method);
    alert('Permintaan pencairan saldo berhasil diajukan! Admin akan memproses transfer dalam 1x24 jam.');
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="section-padding space-y-10">
      <div className="container space-y-8">
        <div className="section-header space-y-2">
          <span className="section-tag">Keuangan Seller</span>
          <h1 className="section-title">Pencairan Saldo & Riwayat Payout</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Request Payout Form */}
          <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Tarik Saldo Pendapatan</h3>

            <div className="bg-black/50 p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400">SALDO TERSEDIA:</span>
              <span className="text-xl font-extrabold text-emerald-400 block">{formatRupiah(1850000)}</span>
            </div>

            <form onSubmit={handlePayoutSubmit} className="space-y-3">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Jumlah Penarikan (Rp)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-accentCyan"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Metode Transfer & No Rekening</label>
                <input
                  type="text"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-accentCyan"
                  required
                />
              </div>

              <button type="submit" className="w-full btn btn-primary btn-glow py-3 font-bold">
                Minta Pencairan Saldo (Payout)
              </button>
            </form>
          </div>

          {/* Payout History List (2 cols) */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-700/80 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Riwayat Penarikan Saldo</h3>

            <div className="space-y-3">
              {myPayouts.map((p) => (
                <div key={p.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-accentCyan font-mono">{p.id} • {p.date}</span>
                    <h4 className="font-bold text-white">{formatRupiah(p.amount)}</h4>
                    <p className="text-[11px] text-slate-400">{p.method}</p>
                  </div>

                  <span className={`font-extrabold px-3 py-1 rounded-full ${
                    p.status === 'Paid' || p.status === 'Selesai'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
