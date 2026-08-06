import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

const INITIAL_PROJECTS = [
  {
    id: 'PRJ-2026-01',
    name: 'Website E-Commerce KopiKraf Nusantara',
    packageName: 'Business & Skripsi Complete',
    customerName: 'Rapiii',
    customerEmail: 'user@webcraft.id',
    projectManager: 'Ikhwanul (Lead PM)',
    startDate: '01/08/2026',
    estimatedCompletion: '10/08/2026',
    progress: 75,
    status: 'Client Review',
    brief: 'Membuat toko online kopi lokal dengan katalog barang, integrasi WhatsApp direct order, dan sistem POS kasir.',
    milestones: [
      { id: 1, name: 'Diskusi & Briefing Initial', completed: true },
      { id: 2, name: 'Desain Wireframe UI/UX Figma', completed: true },
      { id: 3, name: 'Development Frontend & Backend', completed: true },
      { id: 4, name: 'Client Review & Testing', completed: false },
      { id: 5, name: 'Deployment & Serah Terima File', completed: false }
    ],
    revisions: [
      {
        id: 'rev-1',
        date: '04/08/2026',
        request: 'Tolong tambahkan badge PROMO pada katalog produk utama.',
        status: 'Selesai Dikerjakan'
      }
    ],
    files: [
      { name: 'Wireframe_Figma_KopiKraf.pdf', size: '4.2 MB', url: '#' },
      { name: 'SourceCode_KopiKraf_Beta.zip', size: '18.1 MB', url: '#' }
    ]
  }
];

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('webcraft_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem('webcraft_projects', JSON.stringify(projects));
  }, [projects]);

  // Create new project order
  const createProject = (orderInfo) => {
    const newProject = {
      id: 'PRJ-' + new Date().getFullYear() + '-' + Math.floor(10 + Math.random() * 90),
      name: orderInfo.packageName || 'Proyek Website Custom',
      packageName: orderInfo.packageName || 'Package Business',
      customerName: orderInfo.customerName || 'Klien WebCraft',
      customerEmail: orderInfo.customerEmail || 'client@webcraft.id',
      projectManager: 'Ikhwanul (Lead PM)',
      startDate: new Date().toLocaleDateString('id-ID'),
      estimatedCompletion: '7 Hari Kerja',
      progress: 20,
      status: 'Planning & Design',
      brief: orderInfo.brief || 'Custom website development request.',
      milestones: [
        { id: 1, name: 'Diskusi & Briefing Initial', completed: true },
        { id: 2, name: 'Desain Wireframe UI/UX Figma', completed: false },
        { id: 3, name: 'Development Frontend & Backend', completed: false },
        { id: 4, name: 'Client Review & Testing', completed: false },
        { id: 5, name: 'Deployment & Serah Terima File', completed: false }
      ],
      revisions: [],
      files: []
    };

    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  // Add revision request by customer
  const addRevisionRequest = (projectId, requestText) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const newRev = {
            id: 'rev-' + Date.now(),
            date: new Date().toLocaleDateString('id-ID'),
            request: requestText,
            status: 'Sedang Diproses'
          };
          return {
            ...p,
            status: 'Revision',
            revisions: [newRev, ...p.revisions]
          };
        }
        return p;
      })
    );
  };

  // Update project progress and status by Admin
  const updateProjectStatus = (projectId, status, progress, milestones) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            status: status || p.status,
            progress: progress !== undefined ? progress : p.progress,
            milestones: milestones || p.milestones
          };
        }
        return p;
      })
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        createProject,
        addRevisionRequest,
        updateProjectStatus
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectContext);
}
