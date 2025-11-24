import { Eye } from 'lucide-react'
import Badge from '../../common/Badge'
import Button from '../../common/Button'
import { formatShortDate, getStatusColor, getStatusLabel } from '../../../utils/helpers'

export default function OutgoingMailTable({ mails, role }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Nomor</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tujuan</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Perihal</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Kategori</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mails.length > 0 ? (
            mails.map((mail) => (
              <tr key={mail.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{mail.number}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{mail.to}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{mail.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{mail.category}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mail.globalStatus, 'keluar')}`}>
                    {getStatusLabel(mail.globalStatus)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Eye size={16} />
                    Lihat
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                Tidak ada surat yang ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
