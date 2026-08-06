import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo WebCraft Support!\n\nNama: ${form.name}\nEmail: ${form.email}\nSubjek: ${form.subject}\n\nPesan:\n${form.message}`;
    window.open(`https://wa.me/62895414739150?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="section-padding space-y-16">
      <div className="container max-w-4xl space-y-12">
        <div className="section-header center space-y-3">
          <span className="section-tag">Hubungi Kami</span>
          <h1 className="section-title">Konsultasi & Support WebCraft</h1>
          <p className="section-subtitle">
            Punya pertanyaan mengenai paket jasa pembuatan website, marketplace template, atau pendaftaran seller?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl text-center space-y-3 shadow-xl">
            <i className="fa-brands fa-whatsapp text-3xl text-emerald-400"></i>
            <h3 className="text-sm font-bold text-white">WhatsApp Direct</h3>
            <p className="text-xs text-slate-400">+62 895-4147-39150</p>
            <a href="https://wa.me/62895414739150" target="_blank" rel="noopener noreferrer" className="btn btn-secondary px-4 py-2 text-xs font-bold block">
              Chat Sekarang
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl text-center space-y-3 shadow-xl">
            <i className="fa-solid fa-envelope text-3xl text-accentCyan"></i>
            <h3 className="text-sm font-bold text-white">Email Support</h3>
            <p className="text-xs text-slate-400">hello@webcraft.id</p>
            <a href="mailto:hello@webcraft.id" className="btn btn-secondary px-4 py-2 text-xs font-bold block">
              Kirim Email
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl text-center space-y-3 shadow-xl">
            <i className="fa-solid fa-clock text-3xl text-purple-400"></i>
            <h3 className="text-sm font-bold text-white">Jam Operasional</h3>
            <p className="text-xs text-slate-400">Senin - Sabtu: 08.00 - 21.00 WIB</p>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase inline-block">
              Support 24/7
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-lg font-bold text-white text-center">Kirim Pesan Konsultasi</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nama Anda</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Subjek Pertanyaan</label>
              <input
                type="text"
                placeholder="Topik Diskusi..."
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Isi Pesan / Kebutuhan</label>
              <textarea
                rows="4"
                placeholder="Tuliskan pesan Anda secara detail..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-accentCyan"
                required
              ></textarea>
            </div>

            <button type="submit" className="w-full btn btn-primary btn-glow py-3 font-bold text-xs">
              <i className="fa-brands fa-whatsapp"></i> Kirim Pesan & Hubungi Admin via WA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
