import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';

export default function MyProjectsPage() {
  const { projects, addRevisionRequest } = useProjects();
  const { user } = useAuth();
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  const [revisionText, setRevisionText] = useState('');

  const userProjects = projects.filter(p => p.customerEmail === user?.email || p.customerName === user?.name) || projects;
  const activeProject = userProjects.find(p => p.id === selectedProjectId) || userProjects[0];

  const handleRevisionSubmit = (e) => {
    e.preventDefault();
    if (!revisionText.trim() || !activeProject) return;
    addRevisionRequest(activeProject.id, revisionText);
    setRevisionText('');
    alert('Permintaan revisi berhasil dikirimkan ke tim Admin & Project Manager!');
  };

  return (
    <div className="section-padding space-y-10">
      <div className="container space-y-8">
        <div className="section-header space-y-2">
          <span className="section-tag">Management Proyek Jasa</span>
          <h1 className="section-title">Pelacakan Timeline Proyek & Revisi</h1>
        </div>

        {!activeProject ? (
          <div className="bg-slate-900 border border-slate-700/80 p-12 rounded-3xl text-center text-slate-400 space-y-3">
            <i className="fa-solid fa-folder-open text-5xl text-slate-600"></i>
            <p className="font-bold text-lg">Belum Ada Proyek Aktif</p>
            <p className="text-xs">Pesan paket jasa di menu Services untuk memulai proyek pembuatan website Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Project Switcher */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Daftar Proyek Anda:</h3>
              <div className="space-y-2">
                {userProjects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      activeProject.id === p.id ? 'bg-accentCyan/15 border-accentCyan text-white shadow-lg' : 'bg-slate-900 border-white/10 text-slate-400'
                    }`}
                    onClick={() => setSelectedProjectId(p.id)}
                  >
                    <span className="text-[10px] text-accentCyan font-extrabold block">{p.id}</span>
                    <span className="font-bold text-xs block text-white truncate">{p.name}</span>
                    <div className="flex justify-between items-center text-[10px] mt-2">
                      <span>Progres: {p.progress}%</span>
                      <span className="text-purple-400 font-bold">{p.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Timeline & Detail (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Details */}
              <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs text-accentCyan font-bold">{activeProject.id} • {activeProject.packageName}</span>
                    <h2 className="text-xl font-extrabold text-white">{activeProject.name}</h2>
                  </div>
                  <span className="bg-purple-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full w-fit">
                    Status: {activeProject.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300 pt-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Project Manager:</span>
                    <span className="font-bold text-white">{activeProject.projectManager}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tanggal Mulai:</span>
                    <span className="font-bold text-white">{activeProject.startDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Estimasi ACC:</span>
                    <span className="font-bold text-white">{activeProject.estimatedCompletion}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>Tahap Pengerjaan</span>
                    <span className="text-accentCyan">{activeProject.progress}% Selesai</span>
                  </div>
                  <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div className="h-full bg-gradient-to-r from-accentCyan to-purple-500 rounded-full transition-all duration-500" style={{ width: `${activeProject.progress}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Milestone Progress Timeline</h3>
                <div className="space-y-2">
                  {activeProject.milestones.map((m) => (
                    <div key={m.id} className={`flex items-center gap-3 p-3 rounded-xl border text-xs ${
                      m.completed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}>
                      <i className={`fa-solid ${m.completed ? 'fa-circle-check text-emerald-400' : 'fa-circle-notch animate-spin text-slate-500'}`}></i>
                      <span className="font-semibold">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revision Requests Section */}
              <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Pengajuan Revisi Tambahan</h3>

                <form onSubmit={handleRevisionSubmit} className="space-y-3">
                  <textarea
                    rows="3"
                    placeholder="Tuliskan poin revisi atau perubahan yang Anda inginkan..."
                    value={revisionText}
                    onChange={(e) => setRevisionText(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accentCyan"
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-primary btn-glow px-4 py-2 text-xs font-bold">
                    <i className="fa-solid fa-paper-plane"></i> Kirim Permintaan Revisi
                  </button>
                </form>

                {activeProject.revisions.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-white">Riwayat Revisi Terdaftar:</h4>
                    {activeProject.revisions.map((rev) => (
                      <div key={rev.id} className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>{rev.date}</span>
                          <span className="text-accentCyan font-bold">{rev.status}</span>
                        </div>
                        <p className="text-slate-200">{rev.request}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
