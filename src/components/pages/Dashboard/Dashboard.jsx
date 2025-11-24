import * as Icons from 'lucide-react'
import Card from '../../common/Card'
import Button from '../../common/Button'
import { getDashboardStats } from '../../../data/mockData'

export default function Dashboard() {
  const stats = getDashboardStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Selamat datang di AMANAT</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const IconComponent = Icons.Mail
          return (
            <Card key={idx} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-full p-3`}>
                  <IconComponent className="text-white" size={24} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Action Items */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Surat Menunggu Aksi Anda</h3>
        <div className="space-y-3">
          {[
            { no: 'SM/001/XI/2025', judul: 'Undangan Rapat Koordinasi', status: 'PERLU_DISPOSISI', urgent: true },
            { no: 'SK/002/XI/2025', judul: 'Surat Keterangan Aktif', status: 'PERLU_REVIEW', urgent: false }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{item.no}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.urgent 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.judul}</p>
              </div>
              <Button size="sm">Lihat</Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="text-sm font-medium text-gray-600">Total Surat Bulan Ini</h4>
          <p className="text-2xl font-bold text-gray-900 mt-2">77</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% dari bulan lalu</p>
        </Card>
        <Card className="p-6">
          <h4 className="text-sm font-medium text-gray-600">Rata-rata Waktu Proses</h4>
          <p className="text-2xl font-bold text-gray-900 mt-2">2.3 hari</p>
          <p className="text-xs text-gray-600 mt-2">Tepat waktu</p>
        </Card>
        <Card className="p-6">
          <h4 className="text-sm font-medium text-gray-600">Tingkat Penyelesaian</h4>
          <p className="text-2xl font-bold text-gray-900 mt-2">89%</p>
          <p className="text-xs text-green-600 mt-2">↑ 5% dari minggu lalu</p>
        </Card>
      </div>
    </div>
  )
}