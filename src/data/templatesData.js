export const INITIAL_TEMPLATES = [
  {
    id: 'tmpl-1',
    name: 'KopiKraf - Coffee Shop & POS Web App',
    slug: 'kopikraf-pos',
    category: 'e-commerce',
    categoryLabel: 'E-Commerce & Retail',
    sellerName: 'BraftDev Official',
    sellerAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=braftdev',
    rating: 4.9,
    salesCount: 142,
    licenses: {
      personal: 199000,
      commercial: 399000,
      extended: 799000
    },
    version: 'v2.1.0',
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'MySQL'],
    thumbnail: 'assets/umkm.png',
    previewUrl: 'https://medolsky.github.io/BRaft.dev-project/#/store',
    description: 'Template web app kasir POS dan inventori toko dengan desain glassmorphism modern, cetak struk bluetooth, laporan penjualan otomatis, dan katalog barang.',
    features: [
      'Point of Sale (POS) Kasir Interaktif',
      'Manajemen Stok & Kategori Produk',
      'Laporan Keuangan & Export Excel',
      'Desain Fully Responsive Mobile'
    ],
    status: 'Approved',
    fileSize: '18.4 MB (ZIP)',
    updatedDate: '04 Aug 2026'
  },
  {
    id: 'tmpl-2',
    name: 'EduBrain - AI Study Assistant Platform',
    slug: 'edubrain-ai-app',
    category: 'saas',
    categoryLabel: 'SaaS & AI Applications',
    sellerName: 'Alex Creator',
    sellerAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=alex',
    rating: 5.0,
    salesCount: 218,
    licenses: {
      personal: 249000,
      commercial: 499000,
      extended: 999000
    },
    version: 'v1.4.0',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind', 'OpenAI API'],
    thumbnail: 'assets/mahasiswa.png',
    previewUrl: 'https://medolsky.github.io/BRaft.dev-project/#/store',
    description: 'Template SaaS asisten belajar AI tugas akhir & skripsi dengan UI modern, halaman dashboard mahasiswa, integrasi ChatGPT API, dan rekomendasi jalur belajar.',
    features: [
      'Integrasi ChatGPT API Prompt Engineering',
      'Dashboard Analitik Belajar Mahasiswa',
      'Sistem Auth Multi-Role User',
      'Dark & Light Mode Toggle'
    ],
    status: 'Approved',
    fileSize: '24.1 MB (ZIP)',
    updatedDate: '01 Aug 2026'
  },
  {
    id: 'tmpl-3',
    name: 'NexusCore - SaaS Analytics & Admin Dashboard',
    slug: 'nexuscore-dashboard',
    category: 'dashboard',
    categoryLabel: 'Admin Dashboard',
    sellerName: 'DevCraft Studio',
    sellerAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=devcraft',
    rating: 4.8,
    salesCount: 89,
    licenses: {
      personal: 299000,
      commercial: 599000,
      extended: 1299000
    },
    version: 'v3.0.1',
    techStack: ['React 18', 'Tailwind CSS', 'Recharts', 'PostgreSQL'],
    thumbnail: 'assets/enterprise.png',
    previewUrl: 'https://medolsky.github.io/BRaft.dev-project/#/admin',
    description: 'Dashboard analitik perusahaan dengan visualisasi chart data transaksi, tabel manajemen staf, otomatisasi invoice PDF, dan manajemen role.',
    features: [
      'Visualisasi Chart Data Real-time',
      'Tabel CRUD Staf & User Management',
      'Export PDF & Excel Invoice',
      'Komponen UI Modular Shadcn Style'
    ],
    status: 'Approved',
    fileSize: '32.8 MB (ZIP)',
    updatedDate: '28 Jul 2026'
  }
];

export const TEMPLATE_CATEGORIES = [
  { id: 'all', label: 'Semua Template' },
  { id: 'agency', label: 'Agency & Portfolio' },
  { id: 'e-commerce', label: 'E-Commerce & Store' },
  { id: 'saas', label: 'SaaS & Applications' },
  { id: 'dashboard', label: 'Admin Dashboard' },
  { id: 'landing', label: 'Landing Page' }
];
