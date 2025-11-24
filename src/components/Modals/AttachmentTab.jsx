// src/components/modals/AttachmentTab.jsx
import { useState } from 'react';
import { FileText, Download, Eye, Upload, X, File, Image, FileSpreadsheet } from 'lucide-react';
import { formatFileSize, getFileIcon } from '../../utils/helpers';

const AttachmentTab = ({ mail }) => {
  const [uploading, setUploading] = useState(false);

  // Mock attachments data
  const attachments = mail.attachments || [
    {
      id: 1,
      name: 'Surat_Resmi.pdf',
      size: 2458632,
      type: 'application/pdf',
      uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      url: '#'
    },
    {
      id: 2,
      name: 'Lampiran_Data.xlsx',
      size: 458632,
      type: 'application/vnd.ms-excel',
      uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      url: '#'
    },
    {
      id: 3,
      name: 'Foto_Lokasi.jpg',
      size: 1258632,
      type: 'image/jpeg',
      uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      url: '#'
    }
  ];

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUploading(true);
      // Simulate upload
      setTimeout(() => {
        setUploading(false);
        console.log('Files uploaded:', files);
      }, 2000);
    }
  };

  const handleDownload = (attachment) => {
    console.log('Downloading:', attachment.name);
    // Implement download logic
  };

  const handlePreview = (attachment) => {
    console.log('Preview:', attachment.name);
    // Implement preview logic
  };

  const handleDelete = (id) => {
    if (confirm('Hapus lampiran ini?')) {
      console.log('Deleting attachment:', id);
      // Implement delete logic
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 mb-2">
            Upload Lampiran Baru
          </p>
          <p className="text-xs text-gray-500 mb-4">
            PDF, DOC, XLS, JPG, PNG (Maks. 10MB)
          </p>
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            Pilih File
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-2 animate-pulse" style={{ width: '60%' }} />
            </div>
            <p className="text-xs text-center text-gray-600 mt-2">
              Mengunggah file...
            </p>
          </div>
        )}
      </div>

      {/* Attachments List */}
      {attachments.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lampiran ({attachments.length})
          </h3>
          <div className="space-y-3">
            {attachments.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <FileIcon className="w-10 h-10 text-blue-500" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • Diunggah {new Date(file.uploadDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePreview(file)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Lihat"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDownload(file)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Belum ada lampiran</p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm font-medium text-amber-900 mb-2">
          ⚠️ Ketentuan Upload Lampiran:
        </p>
        <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
          <li>Format file: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG</li>
          <li>Ukuran maksimal per file: 10 MB</li>
          <li>Pastikan file dapat dibaca dengan jelas</li>
          <li>Hindari upload file yang rusak atau terenkripsi</li>
        </ul>
      </div>

      {/* Statistics */}
      {attachments.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {attachments.length}
            </p>
            <p className="text-xs text-gray-600">Total File</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {formatFileSize(attachments.reduce((sum, file) => sum + file.size, 0))}
            </p>
            <p className="text-xs text-gray-600">Total Ukuran</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentTab;