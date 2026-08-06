import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-12 mt-20 text-slate-400 text-sm">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="brand-logo flex items-center gap-2 text-2xl font-bold">
            <span className="logo-icon text-accentCyan"><i className="fa-solid fa-cube"></i></span>
            <span className="logo-text text-white">Web<span className="accent-text text-accentCyan">Craft</span></span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Platform Digital Terintegrasi yang menyediakan Jasa Pembuatan Website Presisi, Marketplace Template Terverifikasi, dan Sistem Management Proyek Terpadu.
          </p>
          <div className="flex gap-3 text-lg text-slate-300">
            <a href="https://github.com/Medolsky" target="_blank" rel="noopener noreferrer" className="hover:text-accentCyan transition-colors">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="hover:text-accentCyan transition-colors"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#" className="hover:text-accentCyan transition-colors"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-accentCyan transition-colors"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>

        {/* Column 2: Agency Services */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm">Layanan Agency</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/services" className="hover:text-accentCyan">Company Profile</Link></li>
            <li><Link to="/services" className="hover:text-accentCyan">Landing Page Pro</Link></li>
            <li><Link to="/services" className="hover:text-accentCyan">E-Commerce System</Link></li>
            <li><Link to="/services" className="hover:text-accentCyan">Aplikasi Skripsi IT</Link></li>
            <li><Link to="/services" className="hover:text-accentCyan">Custom Web App</Link></li>
          </ul>
        </div>

        {/* Column 3: Marketplace */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm">Marketplace Template</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/templates" className="hover:text-accentCyan">Semua Template</Link></li>
            <li><Link to="/templates" className="hover:text-accentCyan">Template E-Commerce</Link></li>
            <li><Link to="/templates" className="hover:text-accentCyan">Template SaaS & AI</Link></li>
            <li><Link to="/templates" className="hover:text-accentCyan">Admin Dashboard</Link></li>
            <li><Link to="/seller" className="hover:text-accentCyan">Jual Template (Seller)</Link></li>
          </ul>
        </div>

        {/* Column 4: Bantuan & Perusahaan */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm">Perusahaan & Support</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about" className="hover:text-accentCyan">Tentang WebCraft</Link></li>
            <li><Link to="/portfolio" className="hover:text-accentCyan">Portfolio Case Study</Link></li>
            <li><Link to="/contact" className="hover:text-accentCyan">Hubungi Kami</Link></li>
            <li><Link to="/account" className="hover:text-accentCyan">Dashboard Akun</Link></li>
            <li><Link to="/admin" className="hover:text-accentCyan">Admin Control</Link></li>
          </ul>
        </div>
      </div>

      <div className="container border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>&copy; 2026 WebCraft Marketplace & Agency. All Rights Reserved. Built with precision for Digital Growth.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-400">Terms & Conditions</a>
          <a href="#" className="hover:text-slate-400">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400">License Policy</a>
        </div>
      </div>
    </footer>
  );
}
