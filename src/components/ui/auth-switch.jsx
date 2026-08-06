import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { User, ShieldCheck, Mail, Lock, UserPlus, ArrowRight, Github, Chrome, Store } from "lucide-react";

export function AuthSwitch({
  onLogin,
  onRegister,
  onSocialLogin,
  className,
  ...props
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (onRegister) onRegister({ name, email, password, role });
    } else {
      if (onLogin) onLogin({ email, password, role });
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-md bg-slate-900/95 border border-slate-700/80 p-8 rounded-3xl shadow-2xl backdrop-blur-2xl transition-all duration-300 space-y-6 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accentCyan/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center space-y-2 relative z-10">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {isRegister ? "Buat Akun WebCraft" : "Selamat Datang Kembali"}
        </h2>
        <p className="text-xs text-slate-400">
          {isRegister
            ? "Daftar akun baru untuk memesan jasa atau membeli template"
            : "Masuk untuk melanjutkan ke dashboard, proyek & unduhan Anda"}
        </p>
      </div>

      {/* Role Selection Switcher (Customer vs Seller vs Admin) */}
      <div className="grid grid-cols-3 p-1 bg-white/5 border border-white/10 rounded-2xl relative z-10">
        <button
          type="button"
          className={cn(
            "py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1",
            role === "user"
              ? "bg-accentCyan text-black shadow-lg"
              : "text-slate-400 hover:text-white"
          )}
          onClick={() => setRole("user")}
        >
          <User className="w-3.5 h-3.5" />
          <span>Customer</span>
        </button>
        <button
          type="button"
          className={cn(
            "py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1",
            role === "seller"
              ? "bg-emerald-500 text-black shadow-lg"
              : "text-slate-400 hover:text-white"
          )}
          onClick={() => setRole("seller")}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Seller</span>
        </button>
        <button
          type="button"
          className={cn(
            "py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1",
            role === "admin"
              ? "bg-purple-600 text-white shadow-lg"
              : "text-slate-400 hover:text-white"
          )}
          onClick={() => setRole("admin")}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>
      </div>

      {/* Social OAuth Buttons */}
      <div className="space-y-2.5 relative z-10">
        <button
          type="button"
          className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-3 transition-all group"
          onClick={() => onSocialLogin && onSocialLogin("google", role)}
        >
          <Chrome className="w-4 h-4 text-accentCyan group-hover:scale-110 transition-transform" />
          <span>Lanjutkan dengan Google</span>
        </button>

        <button
          type="button"
          className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-3 transition-all group"
          onClick={() => onSocialLogin && onSocialLogin("github", role)}
        >
          <Github className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          <span>Lanjutkan dengan GitHub</span>
        </button>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="flex-1 h-[1px] bg-white/10"></div>
        <span className="text-[11px] text-slate-500 font-semibold uppercase">atau Email</span>
        <div className="flex-1 h-[1px] bg-white/10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {isRegister && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-accentCyan" /> Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accentCyan transition-colors"
              required
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-accentCyan" /> Email Address
          </label>
          <input
            type="email"
            placeholder={role === "admin" ? "admin@webcraft.id" : role === "seller" ? "seller@webcraft.id" : "user@example.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accentCyan transition-colors"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-accentCyan" /> Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accentCyan transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          className={cn(
            "w-full py-3 font-extrabold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2",
            role === "admin"
              ? "bg-purple-600 hover:bg-purple-500 text-white"
              : role === "seller"
              ? "bg-emerald-500 hover:bg-emerald-400 text-black"
              : "btn btn-primary btn-glow"
          )}
        >
          {isRegister ? (
            <>
              <UserPlus className="w-4 h-4" /> Daftar Akun {role.toUpperCase()}
            </>
          ) : (
            <>
              <ArrowRight className="w-4 h-4" /> Masuk Sebagai {role.toUpperCase()}
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-3 border-t border-white/10 relative z-10">
        <button
          type="button"
          className="text-xs text-accentCyan hover:underline font-semibold"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Sudah punya akun? Masuk di sini"
            : "Belum punya akun? Daftar gratis di sini"}
        </button>
      </div>
    </div>
  );
}

export default AuthSwitch;
