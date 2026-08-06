import React, { useState } from 'react';
import { AGENCY_PACKAGES, SERVICE_ADDONS } from '../data/servicesData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ServicesPage() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [selectedBase, setSelectedBase] = useState(750000);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [briefText, setBriefText] = useState('');

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateTotal = () => {
    const addonSum = selectedAddons.reduce((acc, a) => acc + a.price, 0);
    return selectedBase + addonSum;
  };

  const formatRupiah = (num) => {
    return typeof num === 'number'
      ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num)
      : num;
  };

  const handleOrderCalculated = () => {
    const customItem = {
      id: 'custom-package-' + Date.now(),
      name: 'Custom Calculated Website Package',
      description: `Layanan kustom dengan add-on: ${selectedAddons.map(a => a.name).join(', ') || 'Standar'}`,
      price: calculateTotal()
    };
    addToCart(customItem, 'package', calculateTotal());
  };

  return (
    <div className="section-padding space-y-16">
      <div className="container space-y-12">
        {/* Title Header */}
        <div className="section-header center space-y-3">
          <span className="section-tag">Jasa Pembuatan Website Presisi</span>
          <h1 className="section-title">Pilihan Paket & Transparansi Biaya</h1>
          <p className="section-subtitle">
            Pilih paket yang sesuai dengan skala bisnis atau akademis Anda, atau hitung estimasi biaya secara realtime.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AGENCY_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-slate-900/90 border border-slate-700/80 hover:border-accentCyan rounded-3xl p-8 transition-all hover:-translate-y-2 flex flex-col justify-between space-y-6 shadow-2xl relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-accentCyan/20 text-accentCyan px-3 py-1 rounded-full uppercase">
                    {pkg.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{pkg.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{pkg.description}</p>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-2xl font-extrabold text-accentCyan">{formatRupiah(pkg.price)}</span>
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

              {typeof pkg.price === 'number' ? (
                <button
                  type="button"
                  className="w-full btn btn-primary btn-glow py-3 font-bold text-xs"
                  onClick={() => addToCart(pkg, 'package', pkg.price)}
                >
                  <i className="fa-solid fa-cart-plus"></i> Pesan Paket Ini
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full btn btn-secondary py-3 font-bold text-xs"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  <i className="fa-solid fa-file-signature"></i> Minta Penawaran Custom
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Cost Estimator Calculator */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-8 backdrop-blur-xl">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-accentCyan uppercase">Live Calculator</span>
            <h2 className="text-2xl font-extrabold text-white">Kalkulator Biaya Custom Interactive</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              {/* Base Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white block">1. Pilih Paket Dasar</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedBase === 750000 ? 'bg-accentCyan/10 border-accentCyan text-white' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                    onClick={() => setSelectedBase(750000)}
                  >
                    <span className="font-bold block text-sm">UMKM Landing Page</span>
                    <span className="text-xs text-accentCyan font-bold">Rp 750.000</span>
                  </button>
                  <button
                    type="button"
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedBase === 1500000 ? 'bg-accentCyan/10 border-accentCyan text-white' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                    onClick={() => setSelectedBase(1500000)}
                  >
                    <span className="font-bold block text-sm">Business & Skripsi</span>
                    <span className="text-xs text-accentCyan font-bold">Rp 1.500.000</span>
                  </button>
                  <button
                    type="button"
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedBase === 3000000 ? 'bg-accentCyan/10 border-accentCyan text-white' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                    onClick={() => setSelectedBase(3000000)}
                  >
                    <span className="font-bold block text-sm">Enterprise Web App</span>
                    <span className="text-xs text-accentCyan font-bold">Rp 3.000.000</span>
                  </button>
                </div>
              </div>

              {/* Addons Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white block">2. Pilih Add-On Tambahan</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isChecked ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                        onClick={() => toggleAddon(addon)}
                      >
                        <span className="text-xs font-semibold">{addon.name}</span>
                        <span className="text-xs font-extrabold text-accentCyan">+ {formatRupiah(addon.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Total Result Summary */}
            <div className="bg-black/50 border border-white/10 p-6 rounded-2xl space-y-6">
              <h4 className="text-base font-bold text-white border-b border-white/10 pb-3">Ringkasan Estimasi</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Paket Dasar:</span>
                  <span className="font-bold">{formatRupiah(selectedBase)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Add-ons ({selectedAddons.length}):</span>
                  <span className="font-bold">{formatRupiah(selectedAddons.reduce((acc, a) => acc + a.price, 0))}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-white">
                  <span className="font-bold text-sm">Total Estimasi:</span>
                  <span className="text-xl font-extrabold text-accentCyan">{formatRupiah(calculateTotal())}</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full btn btn-primary btn-glow py-3 font-bold text-xs"
                onClick={handleOrderCalculated}
              >
                <i className="fa-solid fa-cart-plus"></i> Ambil Penawaran & Masukkan Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">Minta Penawaran Custom Quote</h3>
              <button onClick={() => setIsQuoteModalOpen(false)} className="text-slate-400 hover:text-white text-xl">&times;</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Permintaan penawaran custom telah dikirim! Tim Admin WebCraft akan merespon via Email & WhatsApp.');
                setIsQuoteModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Brief & Kebutuhan Fitur</label>
                <textarea
                  rows="4"
                  placeholder="Jelaskan jenis website, fitur khusus, dan target deadline Anda..."
                  value={briefText}
                  onChange={(e) => setBriefText(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full btn btn-primary btn-glow py-3 font-bold">
                Kirim Permintaan Penawaran
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
