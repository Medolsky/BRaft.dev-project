import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, isSeller, logout, switchRole } = useAuth();
  const { cart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <header id="main-header" className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/90 border-b border-slate-700/60 shadow-lg">
      <div className="container flex items-center justify-between py-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo flex items-center gap-2 text-xl font-bold">
          <span className="logo-icon text-accentCyan text-2xl"><i className="fa-solid fa-cube"></i></span>
          <span className="logo-text text-white">Web<span className="accent-text text-accentCyan">Craft</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMobileOpen ? 'active' : ''}`} id="nav-links">
          <Link to="/" className="nav-item" onClick={closeMobileMenu}>Home</Link>
          <Link to="/services" className="nav-item flex items-center gap-1.5" onClick={closeMobileMenu}>
            <i className="fa-solid fa-briefcase text-accentCyan"></i> Services & Pricing
          </Link>
          <Link to="/templates" className="nav-item flex items-center gap-1.5" onClick={closeMobileMenu}>
            <i className="fa-solid fa-store text-accentPurple"></i> Marketplace Templates
          </Link>
          <Link to="/portfolio" className="nav-item" onClick={closeMobileMenu}>Portfolio</Link>
          <Link to="/about" className="nav-item" onClick={closeMobileMenu}>About Us</Link>
          <Link to="/contact" className="nav-item" onClick={closeMobileMenu}>Contact</Link>

          {/* Quick Dashboards for logged-in roles */}
          {isAuthenticated && (
            <div className="border-t border-white/10 pt-2 md:border-t-0 md:pt-0 flex flex-col md:flex-row gap-2">
              <Link to="/account" className="nav-item text-accentCyan font-bold" onClick={closeMobileMenu}>
                <i className="fa-solid fa-user"></i> My Account
              </Link>
              {isSeller && (
                <Link to="/seller" className="nav-item text-emerald-400 font-bold" onClick={closeMobileMenu}>
                  <i className="fa-solid fa-store"></i> Seller Panel
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="nav-item text-purple-400 font-bold" onClick={closeMobileMenu}>
                  <i className="fa-solid fa-shield-halved"></i> Admin Panel
                </Link>
              )}
            </div>
          )}
        </nav>

        {/* Actions & Profile Dropdown */}
        <div className="nav-actions flex items-center gap-3">
          {/* Shopping Cart Button */}
          <button
            type="button"
            className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-accentCyan/50 text-white transition-all"
            onClick={() => setIsCartOpen(true)}
            aria-label="Keranjang Belanja"
          >
            <i className="fa-solid fa-cart-shopping text-lg"></i>
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accentCyan text-black font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Auth Status / Dropdown */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-white/5 border border-white/10 hover:border-accentCyan/50 transition-all text-sm font-semibold text-white"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg border border-accentCyan/40 object-cover"
                />
                <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                  isAdmin ? 'bg-purple-600 text-white' : isSeller ? 'bg-emerald-500 text-black' : 'bg-cyan-500/20 text-accentCyan'
                }`}>
                  {user.role}
                </span>
                <i className="fa-solid fa-chevron-down text-xs text-slate-400"></i>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-[#0f172a] border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in">
                  <div className="p-3 border-b border-white/10">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <div className="py-1.5 space-y-1">
                    <Link
                      to="/account"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:bg-white/5 rounded-xl transition-all"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <i className="fa-solid fa-user-gear text-accentCyan"></i> Customer Dashboard
                    </Link>

                    {isSeller && (
                      <Link
                        to="/seller"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-emerald-400 font-bold hover:bg-emerald-500/10 rounded-xl transition-all"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="fa-solid fa-store"></i> Seller Dashboard
                      </Link>
                    )}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-purple-400 font-bold hover:bg-purple-500/10 rounded-xl transition-all"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="fa-solid fa-shield-halved"></i> Admin Control Panel
                      </Link>
                    )}

                    <div className="pt-1 border-t border-white/10">
                      <p className="px-3 text-[10px] text-slate-400 font-bold uppercase mb-1">Demo Role Switcher:</p>
                      <div className="grid grid-cols-3 gap-1 px-1">
                        <button
                          type="button"
                          className="py-1 text-[10px] bg-white/5 hover:bg-cyan-500/20 text-accentCyan font-bold rounded-lg"
                          onClick={() => { switchRole('user'); setIsUserMenuOpen(false); }}
                        >
                          User
                        </button>
                        <button
                          type="button"
                          className="py-1 text-[10px] bg-white/5 hover:bg-emerald-500/20 text-emerald-400 font-bold rounded-lg"
                          onClick={() => { switchRole('seller'); setIsUserMenuOpen(false); }}
                        >
                          Seller
                        </button>
                        <button
                          type="button"
                          className="py-1 text-[10px] bg-white/5 hover:bg-purple-500/20 text-purple-400 font-bold rounded-lg"
                          onClick={() => { switchRole('admin'); setIsUserMenuOpen(false); }}
                        >
                          Admin
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 mt-1">
                    <button
                      type="button"
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-semibold"
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        navigate('/login');
                      }}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i> Keluar (Logout)
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-glow font-bold text-sm">
              <i className="fa-solid fa-right-to-bracket"></i> Masuk / Daftar
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle sm:hidden"
            id="mobile-menu-btn"
            aria-label="Toggle Menu"
            onClick={toggleMobileMenu}
          >
            <i className={`fa-solid ${isMobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
