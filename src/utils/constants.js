export const ROLES = {
  SEKRETARIS_KANTOR: 'sekretaris-kantor',
  KETUA: 'ketua',
  SEKRETARIS_PENGURUS: 'sekretaris-pengurus',
  KABAG: 'kabag'
}

export const SURAT_MASUK_STATUS = {
  DITERIMA: 'DITERIMA',
  DIPROSES: 'DIPROSES',
  DISPOSISI_KETUA: 'DISPOSISI_KETUA',
  DISPOSISI_SEKPENGURUS: 'DISPOSISI_SEKPENGURUS',
  DISPOSISI_KABAG: 'DISPOSISI_KABAG',
  SELESAI: 'SELESAI'
}
export const SURAT_KELUAR_STATUS = {
  DRAFT: 'DRAFT',
  REVIEW_SEKPENGURUS: 'REVIEW_SEKPENGURUS',
  LAMPIRAN_KABAG: 'LAMPIRAN_KABAG',
  REVIEW_KETUA: 'REVIEW_KETUA',
  TERKIRIM: 'TERKIRIM'
}

export const PRIORITY = {
  TINGGI: 'Tinggi',
  SEDANG: 'Sedang',
  RENDAH: 'Rendah'
}

export const CATEGORY = {
  UNDANGAN: 'Undangan',
  PERMOHONAN: 'Permohonan',
  PEMBERITAHUAN: 'Pemberitahuan',
  VERIFIKASI: 'Verifikasi',
  AUDIT: 'Audit',
  KETERANGAN: 'Keterangan',
  PROPOSAL: 'Proposal',
  LAINNYA: 'Lainnya'
}

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'Mail' },
  { id: 'surat-masuk', label: 'Surat Masuk', icon: 'Mail' },
  { id: 'surat-keluar', label: 'Surat Keluar', icon: 'Send' },
  { id: 'disposisi', label: 'Disposisi', icon: 'FileText' },
  { id: 'arsip', label: 'Arsip', icon: 'Archive' }
]