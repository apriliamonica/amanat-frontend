export const statusConfig = {
  incomingMail: {
    DITERIMA: {
      label: 'Diterima',
      description: 'Surat diterima oleh Sekretaris Kantor'
    },
    DIPROSES: {
      label: 'Diproses',
      description: 'Surat sedang diverifikasi'
    },
    DISPOSISI_KETUA: {
      label: 'Disposisi Ketua',
      description: 'Menunggu disposisi dari Ketua Yayasan'
    },
    DISPOSISI_SEKPENGURUS: {
      label: 'Disposisi Sekpengurus',
      description: 'Menunggu disposisi dari Sekretaris Pengurus'
    },
    DISPOSISI_KABAG: {
      label: 'Disposisi Kabag',
      description: 'Menunggu tindakan dari Kepala Bagian'
    },
    SELESAI: {
      label: 'Selesai',
      description: 'Surat sudah diproses dan diarsipkan'
    }
  },
  outgoingMail: {
    DRAFT: {
      label: 'Draft',
      description: 'Surat masih dalam tahap draft'
    },
    REVIEW_SEKPENGURUS: {
      label: 'Review Sekpengurus',
      description: 'Menunggu review dari Sekretaris Pengurus'
    },
    LAMPIRAN_KABAG: {
      label: 'Lampiran Kabag',
      description: 'Menunggu lampiran dari Kepala Bagian'
    },
    REVIEW_KETUA: {
      label: 'Review Ketua',
      description: 'Menunggu review dan TTD dari Ketua'
    },
    TERKIRIM: {
      label: 'Terkirim',
      description: 'Surat sudah dikirim dan diarsipkan'
    }
  }
}