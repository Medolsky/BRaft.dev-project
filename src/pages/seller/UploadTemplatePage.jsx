import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';

export default function UploadTemplatePage() {
  const { submitTemplate } = useMarketplace();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    category: 'e-commerce',
    pricePersonal: '199000',
    priceCommercial: '399000',
    priceExtended: '799000',
    description: '',
    techStack: 'React, Tailwind CSS, Node.js',
    previewUrl: 'https://medolsky.github.io/BRaft.dev-project/#/templates'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitTemplate(form, user);
    alert('Template berhasil diunggah! Status saat ini: Pending Review Moderasi Admin.');
    navigate('/seller');
  };

  return (
    <div className="section-padding space-y-10">
      <div className="container max-w-3xl space-y-8">
        <div className="section-header space-y-2">
          <span className="section-tag">Unggah Produk Digital</span>
          <h1 className="section-title">Form Submisi Template Baru</h1>
          <p className="section-subtitle">Isi data template Anda. Setelah disetujui admin, template akan tayang di Marketplace.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700/80 p-8 rounded-3xl space-y-6 shadow-2xl text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-white block">Nama Template Website</label>
            <input
              type="text"
              placeholder="Contoh: KopiKraf - Coffee POS Web App"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-white block mb-1">Kategori Template</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
              >
                <option value="e-commerce">E-Commerce & Store</option>
                <option value="saas">SaaS & AI Applications</option>
                <option value="dashboard">Admin Dashboard</option>
                <option value="agency">Agency & Portfolio</option>
                <option value="landing">Landing Page</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-white block mb-1">Tech Stack (Dipisah koma)</label>
              <input
                type="text"
                placeholder="React, Tailwind, Node.js"
                value={form.techStack}
                onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Harga Personal (Rp)</label>
              <input
                type="number"
                value={form.pricePersonal}
                onChange={(e) => setForm({ ...form, pricePersonal: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-accentCyan"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-300 block mb-1">Harga Commercial (Rp)</label>
              <input
                type="number"
                value={form.priceCommercial}
                onChange={(e) => setForm({ ...form, priceCommercial: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-accentCyan"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-300 block mb-1">Harga Extended (Rp)</label>
              <input
                type="number"
                value={form.priceExtended}
                onChange={(e) => setForm({ ...form, priceExtended: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-accentCyan"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-white block mb-1">Live Demo Preview URL</label>
            <input
              type="url"
              value={form.previewUrl}
              onChange={(e) => setForm({ ...form, previewUrl: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
              required
            />
          </div>

          <div>
            <label className="font-bold text-white block mb-1">Deskripsi Lengkap & Spesifikasi Fitur</label>
            <textarea
              rows="4"
              placeholder="Jelaskan keunggulan, struktur koding, dan fitur template Anda..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
              required
            ></textarea>
          </div>

          <button type="submit" className="w-full btn btn-primary btn-glow py-3.5 font-extrabold text-xs">
            <i className="fa-solid fa-cloud-arrow-up"></i> Submit Template Untuk Moderasi Admin
          </button>
        </form>
      </div>
    </div>
  );
}
