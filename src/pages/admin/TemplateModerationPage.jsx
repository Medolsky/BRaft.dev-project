import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function TemplateModerationPage() {
  const { templates, updateTemplateStatus } = useMarketplace();

  const handleApprove = (id) => {
    updateTemplateStatus(id, 'Approved', 'Disetujui oleh Admin Moderasi.');
    alert('Template disetujui dan resmi dipublikasikan ke Marketplace!');
  };

  const handleReject = (id) => {
    const notes = prompt('Masukkan catatan alasan penolakan / revisi:');
    if (notes) {
      updateTemplateStatus(id, 'Rejected', notes);
      alert('Status template diubah menjadi Rejected/Revision Required.');
    }
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="section-padding space-y-10">
      <div className="container space-y-8">
        <div className="section-header space-y-2">
          <span className="section-tag">Moderasi Marketplace</span>
          <h1 className="section-title">Konsol Moderasi Template Seller</h1>
          <p className="section-subtitle">Periksa kelayakan source code, demo preview URL, dan keamanan template seller sebelum ditayangkan.</p>
        </div>

        <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="space-y-4">
            {templates.map((t) => (
              <div key={t.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="flex items-center gap-4">
                  <img src={t.thumbnail} alt={t.name} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{t.name}</h3>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        t.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : t.status === 'Rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-slate-400">Seller: {t.sellerName} • Category: {t.categoryLabel}</p>
                    <p className="text-accentCyan font-extrabold">Harga Personal: {formatRupiah(t.licenses.personal)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <a
                    href={t.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary px-3 py-1.5 text-xs font-bold"
                  >
                    <i className="fa-solid fa-eye text-accentCyan"></i> Test Demo
                  </a>

                  {t.status !== 'Approved' && (
                    <button
                      type="button"
                      className="btn btn-primary btn-glow px-3 py-1.5 text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400"
                      onClick={() => handleApprove(t.id)}
                    >
                      <i className="fa-solid fa-check"></i> Approve
                    </button>
                  )}

                  {t.status !== 'Rejected' && (
                    <button
                      type="button"
                      className="btn btn-secondary px-3 py-1.5 text-xs font-bold text-red-400 border-red-500/30 hover:bg-red-500/20"
                      onClick={() => handleReject(t.id)}
                    >
                      <i className="fa-solid fa-xmark"></i> Reject / Revisi
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
