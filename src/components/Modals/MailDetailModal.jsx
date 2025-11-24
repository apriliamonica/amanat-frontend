// src/components/modals/MailDetailModal.jsx
import { useState } from 'react';
import { X, FileText, Route, ClipboardCheck, Paperclip } from 'lucide-react';
import DetailTab from './DetailTab';
import TrackingTab from './TrackingTab';
import DispositionTab from './DispositionTab';
import AttachmentTab from './AttachmentTab';

const MailDetailModal = ({ isOpen, onClose, mail, type = 'incoming' }) => {
  const [activeTab, setActiveTab] = useState('detail');

  if (!isOpen || !mail) return null;

  const tabs = [
    { id: 'detail', label: 'Detail', icon: FileText },
    { id: 'tracking', label: 'Tracking', icon: Route },
    { id: 'disposition', label: 'Disposisi', icon: ClipboardCheck },
    { id: 'attachment', label: 'Lampiran', icon: Paperclip }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Detail Surat {type === 'incoming' ? 'Masuk' : 'Keluar'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Nomor Agenda: {mail.agendaNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'detail' && <DetailTab mail={mail} type={type} />}
            {activeTab === 'tracking' && <TrackingTab mail={mail} />}
            {activeTab === 'disposition' && <DispositionTab mail={mail} />}
            {activeTab === 'attachment' && <AttachmentTab mail={mail} />}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Tutup
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cetak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailDetailModal;