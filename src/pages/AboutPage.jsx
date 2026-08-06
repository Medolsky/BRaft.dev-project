import React from 'react';
import { COMPANY_INFO, FOUNDER_PROFILE, TEAM_MEMBERS } from '../data/aboutData';

export default function AboutPage() {
  return (
    <div className="section-padding space-y-16">
      <div className="container space-y-12">
        {/* Title Header */}
        <div className="section-header center space-y-3">
          <span className="section-tag">Tentang WebCraft</span>
          <h1 className="section-title">Infrastruktur Digital Presisi & Marketplace</h1>
          <p className="section-subtitle">
            {COMPANY_INFO.description}
          </p>
        </div>

        {/* Company Mission Grid */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-xl font-extrabold text-white text-center">Visi & Misi Perusahaan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPANY_INFO.mission.map((m, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accentCyan/20 text-accentCyan flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Profile Section */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6">
          <span className="text-xs font-bold text-accentCyan uppercase block text-center">Founder & Engineering Lead</span>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={FOUNDER_PROFILE.avatar}
              alt={FOUNDER_PROFILE.name}
              className="w-36 h-36 rounded-full border-4 border-accentCyan/50 shadow-2xl object-cover"
            />
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-2xl font-extrabold text-white">{FOUNDER_PROFILE.name}</h3>
              <p className="text-xs font-bold text-accentCyan">{FOUNDER_PROFILE.role}</p>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">{FOUNDER_PROFILE.bio}</p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                {FOUNDER_PROFILE.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-slate-300 font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white text-center">Tim Profesional BraftDev / WebCraft</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="bg-slate-900/80 border border-slate-700/80 p-6 rounded-3xl flex items-center gap-4 shadow-xl">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{member.name}</h4>
                  <p className="text-xs text-accentPurple font-semibold">{member.role}</p>
                  <p className="text-xs text-slate-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
