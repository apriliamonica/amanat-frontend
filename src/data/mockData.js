import { SURAT_MASUK_STATUS, SURAT_KELUAR_STATUS, PRIORITY, CATEGORY } from '../utils/constants'

export const mockIncomingMails = [
  {
    id: 1,
    number: 'SM/001/XI/2025',
    from: 'Kemendikbud',
    date: '2025-11-18',
    subject: 'Undangan Rapat Koordinasi Pendidikan',
    category: CATEGORY.UNDANGAN,
    priority: PRIORITY.TINGGI,
    globalStatus: SURAT_MASUK_STATUS.DISPOSISI_KETUA,
    content: 'Kami mengundang untuk hadir dalam rapat koordinasi...',
    attachments: []
  },
  {
    id: 2,
    number: 'SM/002/XI/2025',
    from: 'Kementerian Keuangan',
    date: '2025-11-17',
    subject: 'Pemberitahuan Pencairan Dana Bantuan',
    category: CATEGORY.PEMBERITAHUAN,
    priority: PRIORITY.TINGGI,
    globalStatus: SURAT_MASUK_STATUS.DIPROSES,
    content: 'Menyampaikan pemberitahuan...',
    attachments: []
  },
  {
    id: 3,
    number: 'SM/003/XI/2025',
    from: 'BKN Regional',
    date: '2025-11-16',
    subject: 'Verifikasi Data Kepegawaian',
    category: CATEGORY.VERIFIKASI,
    priority: PRIORITY.SEDANG,
    globalStatus: SURAT_MASUK_STATUS.DISPOSISI_SEKPENGURUS,
    content: 'Dimohon untuk melakukan verifikasi...',
    attachments: []
  }
]

export const mockOutgoingMails = [
  {
    id: 1,
    number: 'SK/001/XI/2025',
    to: 'Dinas Kesehatan',
    date: '2025-11-18',
    subject: 'Permohonan Bantuan Peralatan Medis',
    category: CATEGORY.PERMOHONAN,
    globalStatus: SURAT_KELUAR_STATUS.REVIEW_SEKPENGURUS,
    content: 'Dengan hormat, kami mengajukan permohonan...',
    attachments: []
  },
  {
    id: 2,
    number: 'SK/002/XI/2025',
    to: 'Universitas Indonesia',
    date: '2025-11-17',
    subject: 'Proposal Kerjasama Penelitian',
    category: CATEGORY.PROPOSAL,
    globalStatus: SURAT_KELUAR_STATUS.DRAFT,
    content: 'Kami mengajukan proposal kerjasama...',
    attachments: []
  }
]

export const mockDispositions = [
  {
    id: 1,
    mailNumber: 'SM/001/XI/2025',
    from: 'Sekretaris Kantor',
    to: 'Ketua Yayasan',
    instruction: 'Mohon ditinjau dan dibuat disposisi',
    date: '2025-11-18',
    status: 'PENDING',
    history: [
      {
        action: 'Surat diterima',
        user: 'Budi Santoso',
        date: '2025-11-18 09:00',
        status: 'COMPLETED'
      }
    ]
  }
]

export const mockTracking = {
  incoming: [
    {
      status: 'DITERIMA',
      title: 'Diterima Sekretaris Kantor',
      user: 'Budi Santoso',
      role: 'Sekretaris Kantor',
      date: '18 Nov 2025, 09:00',
      action: 'Menerima dan verifikasi surat',
      completed: true
    },
    {
      status: 'DIPROSES',
      title: 'Diproses Sekretaris Kantor',
      user: 'Budi Santoso',
      role: 'Sekretaris Kantor',
      date: '18 Nov 2025, 09:30',
      action: 'Verifikasi kelengkapan surat',
      completed: true
    },
    {
      status: 'DISPOSISI_KETUA',
      title: 'Sedang di Ketua Yayasan',
      user: 'Dr. Siti Nurhaliza',
      role: 'Ketua Pengurus Yayasan',
      date: 'Sekarang...',
      action: 'Meninjau dan membuat disposisi',
      completed: false
    },
    {
      status: 'DISPOSISI_SEKPENGURUS',
      title: 'Akan ke Sekretaris Pengurus',
      user: '-',
      role: '-',
      date: '-',
      action: '-',
      completed: false
    }
  ],
  outgoing: [
    {
      status: 'DRAFT',
      title: 'Draft Dibuat',
      user: 'Budi Santoso',
      role: 'Sekretaris Kantor',
      date: '18 Nov 2025, 08:00',
      action: 'Membuat draft surat',
      completed: true
    },
    {
      status: 'REVIEW_SEKPENGURUS',
      title: 'Sedang di Sekretaris Pengurus',
      user: 'Dewi Lestari',
      role: 'Sekretaris Pengurus',
      date: 'Sekarang...',
      action: 'Meninjau dan memvalidasi draft',
      completed: false
    },
    {
      status: 'REVIEW_KETUA',
      title: 'Akan ke Ketua untuk TTD',
      user: '-',
      role: '-',
      date: '-',
      action: '-',
      completed: false
    }
  ]
}

export const getDashboardStats = () => {
  return [
    { label: 'Surat Masuk', value: '45', color: 'bg-blue-500' },
    { label: 'Surat Keluar', value: '32', color: 'bg-green-500' },
    { label: 'Disposisi Aktif', value: '12', color: 'bg-orange-500' },
    { label: 'Total Arsip', value: '156', color: 'bg-purple-500' }
  ]
}
