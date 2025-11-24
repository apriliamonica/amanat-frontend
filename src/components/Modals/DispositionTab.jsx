// src/components/modals/DispositionTab.jsx
import { useState } from 'react';
import { UserCheck, Calendar, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/helpers';

const DispositionTab = ({ mail }) => {
  const [newDisposition, setNewDisposition] = useState({
    recipient: '',
    instruction: '',
    notes: ''
  });

  // Mock data disposisi existing
  const existingDispositions = mail.dispositions || [
    {
      id: 1,
      from: 'Kepala Dinas',
      to: 'Kabid Teknik',
      instruction: 'Untuk ditindaklanjuti segera',
      notes: 'Mohon koordinasi dengan pihak terkait',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      id: 2,
      from: 'Kabid Teknik',
      to: 'Seksi Perencanaan',
      instruction: 'Untuk dikaji dan dibuat laporan',
      notes: 'Deadline 1 minggu',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'in_progress'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New disposition:', newDisposition);
    // Implement submit logic
  };

  const instructions = [
    'Untuk ditindaklanjuti',
    'Untuk diketahui',
    'Untuk dikaji',
    'Untuk koordinasi',
    'Untuk dibuat laporan',
    'Untuk arsip'
  ];

  return (
    <div className="space-y-6">
      {/* Existing Dispositions */}
      {existingDispositions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Riwayat Disposisi
          </h3>
          <div className="space-y-3">
            {existingDispositions.map((disp) => (
              <div
                key={disp.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {disp.from} → {disp.to}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(disp.date, true)}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={disp.status === 'completed' ? 'success' : 'warning'}
                  >
                    {disp.status === 'completed' ? 'Selesai' : 'Proses'}
                  </Badge>
                </div>

                <div className="bg-blue-50 rounded p-3 mb-2">
                  <p className="text-sm font-medium text-blue-900">
                    {disp.instruction}
                  </p>
                </div>

                {disp.notes && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4 mt-0.5" />
                    <p>{disp.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Disposition Form */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Buat Disposisi Baru
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tujuan Disposisi *
            </label>
            <select
              value={newDisposition.recipient}
              onChange={(e) => setNewDisposition({
                ...newDisposition,
                recipient: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Pilih Penerima</option>
              <option value="Sekretaris">Sekretaris</option>
              <option value="Kabid Teknik">Kabid Teknik</option>
              <option value="Kabid Administrasi">Kabid Administrasi</option>
              <option value="Kabid Keuangan">Kabid Keuangan</option>
              <option value="Seksi Perencanaan">Seksi Perencanaan</option>
              <option value="Seksi Pelaksanaan">Seksi Pelaksanaan</option>
            </select>
          </div>

          {/* Instruction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instruksi *
            </label>
            <select
              value={newDisposition.instruction}
              onChange={(e) => setNewDisposition({
                ...newDisposition,
                instruction: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Pilih Instruksi</option>
              {instructions.map((inst) => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan Tambahan
            </label>
            <textarea
              value={newDisposition.notes}
              onChange={(e) => setNewDisposition({
                ...newDisposition,
                notes: e.target.value
              })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Catatan atau instruksi tambahan..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Kirim Disposisi
            </button>
            <button
              type="button"
              onClick={() => setNewDisposition({ recipient: '', instruction: '', notes: '' })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-1">Tips Disposisi:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>Pastikan memilih penerima disposisi yang tepat</li>
              <li>Berikan instruksi yang jelas dan spesifik</li>
              <li>Tambahkan catatan jika ada informasi tambahan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispositionTab;