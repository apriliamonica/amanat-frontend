import { useState } from 'react'
import { Plus } from 'lucide-react'
import Card from '../../common/Card'
import Button from '../../common/Button'
import SearchBar from '../../common/SearchBar'
import IncomingMailTable from './IncomingMailTable'
import { mockIncomingMails } from '../../../data/mockData'

export default function IncomingMailPage({ role }) {
  const [mails] = useState(mockIncomingMails)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMails = mails.filter(mail =>
    mail.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mail.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mail.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Surat Masuk</h2>
          <p className="text-gray-600">Kelola dan pantau surat masuk</p>
        </div>
        {role === 'sekretaris-kantor' && (
          <Button className="flex items-center gap-2">
            <Plus size={20} />
            Tambah Surat Masuk
          </Button>
        )}
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex gap-4">
          <SearchBar 
            placeholder="Cari nomor surat, asal, atau perihal..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="flex-1"
          />
          <Button variant="outline">Filter</Button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <IncomingMailTable mails={filteredMails} role={role} />
      </Card>
    </div>
  )
}
