// src/components/modals/DetailTab.jsx
import { Calendar, User, Building2, FileText, Tag, AlertCircle } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/helpers';
import { STATUS_CONFIG } from '../../data/statusConfig';

const DetailTab = ({ mail, type }) => {
  const InfoRow = ({ icon: Icon, label, value, valueClass = '' }) => (
    <div className="flex items-start py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center min-w-[200px]">
        <Icon className="w-5 h-5 text-gray-400 mr-3" />
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className={`flex-1 text-sm ${valueClass || 'text-gray-900'}`}>
        {value || '-'}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Status Badge */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600">Status:</span>
        <Badge variant={STATUS_CONFIG[mail.status]?.variant || 'default'}>
          {STATUS_CONFIG[mail.status]?.label || mail.status}
        </Badge>
      </div>

      {/* Informasi Umum */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informasi Umum
        </h3>
        <div className="space-y-1">
          <InfoRow
            icon={FileText}
            label="Nomor Agenda"
            value={mail.agendaNumber}
            valueClass="font-semibold text-blue-600"
          />
          <InfoRow
            icon={FileText}
            label="Nomor Surat"
            value={mail.mailNumber}
          />
          <InfoRow
            icon={Calendar}
            label={type === 'incoming' ? 'Tanggal Diterima' : 'Tanggal Dikirim'}
            value={formatDate(mail.receivedDate || mail.sentDate)}
          />
          <InfoRow
            icon={Calendar}
            label="Tanggal Surat"
            value={formatDate(mail.mailDate)}
          />
        </div>
      </div>

      {/* Pengirim/Penerima */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {type === 'incoming' ? 'Pengirim' : 'Penerima'}
        </h3>
        <div className="space-y-1">
          <InfoRow
            icon={Building2}
            label="Instansi"
            value={mail.sender || mail.recipient}
          />
          {mail.senderName && (
            <InfoRow
              icon={User}
              label="Nama Pengirim"
              value={mail.senderName}
            />
          )}
          {mail.senderPhone && (
            <InfoRow
              icon={User}
              label="Kontak"
              value={mail.senderPhone}
            />
          )}
        </div>
      </div>

      {/* Detail Surat */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Detail Surat
        </h3>
        <div className="space-y-1">
          <InfoRow
            icon={FileText}
            label="Perihal"
            value={mail.subject}
            valueClass="font-medium"
          />
          <InfoRow
            icon={Tag}
            label="Jenis Surat"
            value={mail.type}
          />
          <InfoRow
            icon={AlertCircle}
            label="Sifat Surat"
            value={
              <Badge 
                variant={
                  mail.priority === 'Segera' ? 'danger' :
                  mail.priority === 'Penting' ? 'warning' : 'default'
                }
              >
                {mail.priority}
              </Badge>
            }
          />
        </div>
      </div>

      {/* Catatan */}
      {mail.notes && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-900 mb-1">
                Catatan
              </h4>
              <p className="text-sm text-amber-800">{mail.notes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div>
            <span className="font-medium">Dibuat oleh:</span> {mail.createdBy || 'System'}
          </div>
          <div>
            <span className="font-medium">Terakhir diupdate:</span> {formatDate(mail.updatedAt || new Date())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTab;