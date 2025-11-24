// src/components/pages/OutgoingMail/OutgoingMailForm.jsx
import { useState } from 'react';
import { Save, X, Upload, Calendar, FileText, Building2, User, Tag, Send } from 'lucide-react';
import Button from '../../common/Button';
import { validateMailNumber, validateRequired, validateEmail } from '../../../utils/validators';
import { generateAgendaNumber } from '../../../utils/helpers';

const OutgoingMailForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    agendaNumber: generateAgendaNumber('SK'),
    mailNumber: '',
    mailDate: new Date().toISOString().split('T')[0],
    sentDate: '',
    recipient: '',
    recipientAddress: '',
    recipientPhone: '',
    recipientEmail: '',
    subject: '',
    type: '',
    priority: 'Biasa',
    copyTo: '',
    notes: '',
    attachments: []
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const mailTypes = [
    'Surat Dinas',
    'Surat Undangan',
    'Surat Edaran',
    'Surat Tugas',
    'Surat Keterangan',
    'Surat Permohonan',
    'Surat Pemberitahuan',
    'Surat Keputusan',
    'Nota Dinas',
    'Memorandum',
    'Lainnya'
  ];

  const priorities = ['Biasa', 'Penting', 'Segera', 'Sangat Segera'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploading(true);
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          attachments: [...prev.attachments, ...files.map(f => ({
            id: Date.now() + Math.random(),
            name: f.name,
            size: f.size,
            type: f.type,
            file: f
          }))]
        }));
        setUploading(false);
      }, 1000);
    }
  };

  const removeAttachment = (id) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(a => a.id !== id)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.mailNumber)) {
      newErrors.mailNumber = 'Nomor surat harus diisi';
    } else if (!validateMailNumber(formData.mailNumber)) {
      newErrors.mailNumber = 'Format nomor surat tidak valid';
    }

    if (!validateRequired(formData.mailDate)) {
      newErrors.mailDate = 'Tanggal surat harus diisi';
    }

    if (!validateRequired(formData.recipient)) {
      newErrors.recipient = 'Penerima harus diisi';
    }

    if (!validateRequired(formData.subject)) {
      newErrors.subject = 'Perihal harus diisi';
    }

    if (!validateRequired(formData.type)) {
      newErrors.type = 'Jenis surat harus dipilih';
    }

    if (formData.recipientEmail && !validateEmail(formData.recipientEmail)) {
      newErrors.recipientEmail = 'Format email tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: initialData?.id || Date.now(),
        status: formData.sentDate ? 'Terkirim' : 'Draft',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-white">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {initialData ? 'Edit' : 'Tambah'} Surat Keluar
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Nomor Agenda: <span className="font-semibold text-green-600">{formData.agendaNumber}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Informasi Surat */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informasi Surat
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Nomor Surat */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Surat *
                  </label>
                  <input
                    type="text"
                    name="mailNumber"
                    value={formData.mailNumber}
                    onChange={handleChange}
                    placeholder="005/DIR/2024"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.mailNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.mailNumber && (
                    <p className="text-xs text-red-500 mt-1">{errors.mailNumber}</p>
                  )}
                </div>

                {/* Tanggal Surat */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Surat *
                  </label>
                  <input
                    type="date"
                    name="mailDate"
                    value={formData.mailDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.mailDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.mailDate && (
                    <p className="text-xs text-red-500 mt-1">{errors.mailDate}</p>
                  )}
                </div>

                {/* Tanggal Dikirim */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Dikirim (Opsional)
                  </label>
                  <input
                    type="date"
                    name="sentDate"
                    value={formData.sentDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Kosongkan jika masih draft
                  </p>
                </div>

                {/* Jenis Surat */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Surat *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.type ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Pilih Jenis Surat</option>
                    {mailTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-xs text-red-500 mt-1">{errors.type}</p>
                  )}
                </div>

                {/* Sifat Surat */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sifat Surat *
                  </label>
                  <div className="flex gap-4">
                    {priorities.map(priority => (
                      <label key={priority} className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={formData.priority === priority}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Perihal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Perihal *
                </label>
                <textarea
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Perihal surat..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
                )}
              </div>
            </div>

            {/* Informasi Penerima */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Informasi Penerima
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Nama Penerima */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Instansi/Penerima *
                  </label>
                  <input
                    type="text"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleChange}
                    placeholder="Nama penerima atau instansi tujuan"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.recipient ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.recipient && (
                    <p className="text-xs text-red-500 mt-1">{errors.recipient}</p>
                  )}
                </div>

                {/* Alamat Penerima */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Penerima (Opsional)
                  </label>
                  <textarea
                    name="recipientAddress"
                    value={formData.recipientAddress}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Alamat lengkap penerima"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Telepon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telepon (Opsional)
                  </label>
                  <input
                    type="text"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleChange}
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Opsional)
                  </label>
                  <input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      errors.recipientEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.recipientEmail && (
                    <p className="text-xs text-red-500 mt-1">{errors.recipientEmail}</p>
                  )}
                </div>

                {/* Tembusan */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tembusan (Opsional)
                  </label>
                  <textarea
                    name="copyTo"
                    value={formData.copyTo}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Daftar pihak yang menerima tembusan (pisahkan dengan enter)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Catatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Catatan internal atau keterangan tambahan..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Upload Lampiran */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lampiran File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-500 transition-colors">
                <div className="text-center">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <span className="text-sm text-green-600 hover:text-green-700">
                      Pilih file
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, XLS, JPG (Maks. 10MB per file)
                  </p>
                </div>
              </div>

              {/* File List */}
              {formData.attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.attachments.map(file => (
                    <div key={file.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <FileText className="w-4 h-4 text-green-500" />
                      <span className="flex-1 text-sm text-gray-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(file.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Send className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Informasi:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Isi tanggal dikirim jika surat sudah dikirim</li>
                    <li>Kosongkan tanggal dikirim jika surat masih draft</li>
                    <li>Surat dapat diubah selama masih berstatus draft</li>
                  </ul>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="sticky bottom-0 flex justify-end gap-3 p-6 border-t bg-gray-50">
            <Button variant="secondary" onClick={onClose}>
              <X className="w-4 h-4" />
              Batal
            </Button>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4" />
              {initialData ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutgoingMailForm;