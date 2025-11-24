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

export const generateAgendaNumber = (prefix = 'SM') => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}-${year}${month}-${String(random).padStart(4, '0')}`;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const getFileIcon = (mimeType) => {
  // Import icons - pastikan ada di component yang pakai
  const icons = {
    pdf: 'FileText',
    image: 'Image',
    excel: 'FileSpreadsheet',
    default: 'File'
  };
  
  if (mimeType.includes('pdf')) return icons.pdf;
  if (mimeType.includes('image')) return icons.image;
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return icons.excel;
  return icons.default;
};