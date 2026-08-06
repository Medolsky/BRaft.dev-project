import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TEMPLATES } from '../data/templatesData';

const MarketplaceContext = createContext();

export function MarketplaceProvider({ children }) {
  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem('webcraft_templates');
    return saved ? JSON.parse(saved) : INITIAL_TEMPLATES;
  });

  const [payouts, setPayouts] = useState(() => {
    const saved = localStorage.getItem('webcraft_payouts');
    return saved ? JSON.parse(saved) : [
      {
        id: 'PO-8821',
        sellerName: 'Alex Creator',
        amount: 1450000,
        method: 'Bank BCA (123-456-7890)',
        status: 'Diproses',
        date: '04/08/2026'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('webcraft_templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('webcraft_payouts', JSON.stringify(payouts));
  }, [payouts]);

  // Submit template for moderation
  const submitTemplate = (templateData, sellerInfo) => {
    const newTemplate = {
      id: 'tmpl-' + Date.now(),
      slug: templateData.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: templateData.name,
      category: templateData.category || 'e-commerce',
      categoryLabel: templateData.category === 'saas' ? 'SaaS & AI' : 'E-Commerce & Store',
      sellerName: sellerInfo.name || 'Seller Creator',
      sellerAvatar: sellerInfo.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=seller',
      rating: 5.0,
      salesCount: 0,
      licenses: {
        personal: parseInt(templateData.pricePersonal) || 199000,
        commercial: parseInt(templateData.priceCommercial) || 399000,
        extended: parseInt(templateData.priceExtended) || 799000
      },
      version: 'v1.0.0',
      techStack: templateData.techStack ? templateData.techStack.split(',').map(s => s.trim()) : ['React', 'Tailwind CSS'],
      thumbnail: templateData.thumbnail || 'assets/umkm.png',
      previewUrl: templateData.previewUrl || 'https://medolsky.github.io/BRaft.dev-project/#/templates',
      description: templateData.description,
      features: ['Source Code Clean', 'Dokumentasi Lengkap', 'Responsive Mobile'],
      status: 'Pending Review',
      fileSize: '15 MB (ZIP)',
      updatedDate: new Date().toLocaleDateString('id-ID')
    };

    setTemplates(prev => [newTemplate, ...prev]);
    return newTemplate;
  };

  // Admin moderation: Approve / Reject / Notes
  const updateTemplateStatus = (templateId, status, notes = '') => {
    setTemplates(prev =>
      prev.map(t => (t.id === templateId ? { ...t, status, adminNotes: notes } : t))
    );
  };

  // Request payout
  const requestPayout = (sellerName, amount, method) => {
    const newPayout = {
      id: 'PO-' + Math.floor(1000 + Math.random() * 9000),
      sellerName,
      amount,
      method,
      status: 'Pending Review',
      date: new Date().toLocaleDateString('id-ID')
    };
    setPayouts(prev => [newPayout, ...prev]);
    return newPayout;
  };

  // Approve payout
  const updatePayoutStatus = (payoutId, status) => {
    setPayouts(prev =>
      prev.map(p => (p.id === payoutId ? { ...p, status } : p))
    );
  };

  return (
    <MarketplaceContext.Provider
      value={{
        templates,
        payouts,
        submitTemplate,
        updateTemplateStatus,
        requestPayout,
        updatePayoutStatus
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  return useContext(MarketplaceContext);
}
