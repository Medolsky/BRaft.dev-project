export const PORTFOLIO_ITEMS = [
  {
    id: 'port-1',
    title: 'KopiKraf - Web POS & Inventori Kedai Kopi',
    category: 'UMKM & Retail',
    client: 'KopiKraf Nusantara',
    duration: '5 Hari Kerja',
    techStack: ['Laravel 10', 'Tailwind CSS', 'MySQL', 'Web Print API'],
    thumbnail: 'assets/umkm.png',
    challenge: 'Kedai KopiKraf kesulitan mencatat transaksi kasir secara cepat dan stok barang sering tidak akurat antara gudang dan outlet.',
    solution: 'WebCraft merancang web POS kasir responsif yang terhubung langsung dengan printer Bluetooth thermal serta sistem otomatisasi pemotongan stok otomatis.',
    impact: 'Peningkatan kecepatan transaksi hingga 40% dan eliminasi selisih pencatatan stok barang.',
    metrics: ['+40% Kecepatan Kasir', '0% Selisih Stok', '128+ Struk/Hari']
  },
  {
    id: 'port-2',
    title: 'EduBrain - Platform Study Assistant AI',
    category: 'Mahasiswa & Skripsi',
    client: 'Tugas Akhir Teknik Informatika',
    duration: '7 Hari Kerja',
    techStack: ['React.js', 'Node.js', 'OpenAI GPT-4 API', 'Tailwind'],
    challenge: 'Membutuhkan platform edukasi berbasis kecerdasan buatan untuk proyek skripsi yang siap diuji oleh dosen penguji dengan arsitektur bersih.',
    solution: 'WebCraft membangun sistem web AI interaktif yang merekomendasikan materi belajar berdasarkan kuis tingkat pemahaman mahasiswa secara otomatis.',
    impact: 'Lolos ujian skripsi dengan nilai A dan mendapatkan apresiasi dosen penguji atas kerapihan kode.',
    metrics: ['Nilai Ujian A', '100% Kode Rapi', 'Integrasi AI API']
  },
  {
    id: 'port-3',
    title: 'NexusCore - SaaS Analytics Dashboard Enterprise',
    category: 'Enterprise & SaaS',
    client: 'Nexus Global Logistik',
    duration: '3 Minggu',
    techStack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    challenge: 'Manajemen logistik membutuhkan dashboard pemantauan transaksi pengiriman barang secara real-time dari 5 cabang wilayah.',
    solution: 'WebCraft mengembangkan dashboard analitik enterprise terintegrasi API pembayaran, otomatisasi invoice PDF, dan role management.',
    impact: 'Otomatisasi pengolahan laporan bulanan perusahaan yang sebelumnya memakan waktu 3 hari menjadi 1 klik.',
    metrics: ['Real-time 5 Cabang', 'Otomatisasi PDF', 'Multi-Role Access']
  }
];
