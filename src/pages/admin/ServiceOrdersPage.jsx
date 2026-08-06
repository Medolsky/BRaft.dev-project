import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';

export default function ServiceOrdersPage() {
  const { projects, updateProjectStatus } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleStatusChange = (status, progress) => {
    if (!activeProject) return;
    updateProjectStatus(activeProject.id, status, progress);
    alert(`Status proyek ${activeProject.id} diperbarui menjadi: ${status} (${progress}%)`);
  };

  return (
    <div className="section-padding space-y-10">
      <div className="container space-y-8">
        <div className="section-header space-y-2">
          <span className="section-tag">Admin Service Control</span>
          <h1 className="section-title">Kelola Pesanan Proyek Jasa & Milestone</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Switcher */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Daftar Order Proyek:</h3>
            <div className="space-y-2">
              {projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    activeProject?.id === p.id ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg' : 'bg-slate-900 border-white/10 text-slate-400'
                  }`}
                  onClick={() => setSelectedProjectId(p.id)}
                >
                  <span className="text-[10px] text-accentCyan font-extrabold block">{p.id}</span>
                  <span className="font-bold text-xs block text-white truncate">{p.name}</span>
                  <p className="text-[11px] text-slate-400 mt-1">Klien: {p.customerName}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Project Control Form (2 cols) */}
          {activeProject && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-700/80 p-6 rounded-3xl space-y-6 shadow-2xl">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs text-accentCyan font-bold">{activeProject.id} • {activeProject.packageName}</span>
                    <h2 className="text-xl font-extrabold text-white">{activeProject.name}</h2>
                    <p className="text-xs text-slate-400">Pemesan: {activeProject.customerName} ({activeProject.customerEmail})</p>
                  </div>
                  <span className="bg-purple-600 text-white font-extrabold text-xs px-3 py-1 rounded-full">
                    {activeProject.status}
                  </span>
                </div>

                {/* Status Update Quick Buttons */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white block">Perbarui Tahapan Status Proyek:</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white font-semibold"
                      onClick={() => handleStatusChange('Brief Review & Planning', 20)}
                    >
                      Brief Review (20%)
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white font-semibold"
                      onClick={() => handleStatusChange('Design Wireframe', 40)}
                    >
                      Design Wireframe (40%)
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white font-semibold"
                      onClick={() => handleStatusChange('Development Code', 60)}
                    >
                      Development (60%)
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white font-semibold"
                      onClick={() => handleStatusChange('Client Review & Testing', 80)}
                    >
                      Client Review (80%)
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-xl text-xs text-emerald-400 font-bold"
                      onClick={() => handleStatusChange('Completed & Deployed', 100)}
                    >
                      ✓ Completed (100%)
                    </button>
                  </div>
                </div>

                {/* Brief & Deliverables */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-white">Catatan Brief Klien:</h4>
                  <p className="bg-black/50 p-3 rounded-xl border border-white/10 text-xs text-slate-300">
                    {activeProject.brief}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
