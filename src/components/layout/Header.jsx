import { getRoleDisplayName, formatDate } from '../../utils/helpers'

export default function Header({ userRole }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AMANAT</h1>
          <p className="text-sm text-gray-600">{getRoleDisplayName(userRole)}</p>
        </div>
        <div className="text-sm text-gray-600">
          {formatDate(new Date())}
        </div>
      </div>
    </header>
  )
}