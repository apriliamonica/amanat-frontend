export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatShortDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID')
}

export const getStatusColor = (status, type = 'masuk') => {
  const colors = {
    masuk: {
      DITERIMA: 'bg-blue-100 text-blue-800',
      DIPROSES: 'bg-yellow-100 text-yellow-800',
      DISPOSISI_KETUA: 'bg-orange-100 text-orange-800',
      DISPOSISI_SEKPENGURUS: 'bg-purple-100 text-purple-800',
      DISPOSISI_KABAG: 'bg-pink-100 text-pink-800',
      SELESAI: 'bg-green-100 text-green-800'
    },
    keluar: {
      DRAFT: 'bg-gray-100 text-gray-800',
      REVIEW_SEKPENGURUS: 'bg-blue-100 text-blue-800',
      LAMPIRAN_KABAG: 'bg-orange-100 text-orange-800',
      REVIEW_KETUA: 'bg-purple-100 text-purple-800',
      TERKIRIM: 'bg-green-100 text-green-800'
    }
  }
  return colors[type][status] || 'bg-gray-100 text-gray-800'
}

export const getRoleDisplayName = (role) => {
  const names = {
    'sekretaris-kantor': 'Sekretaris Kantor (Admin)',
    'ketua': 'Ketua Yayasan',
    'sekretaris-pengurus': 'Sekretaris Pengurus',
    'kabag': 'Kepala Bagian'
  }
  return names[role] || 'User'
}

export const getStatusLabel = (status) => {
  return status.replace(/_/g, ' ')
}
