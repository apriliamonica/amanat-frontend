import { useState } from 'react'
import { Menu, X, LogOut } from 'lucide-react'
import * as Icons from 'lucide-react'
import { MENU_ITEMS } from '../../utils/constants'

export default function Sidebar({ currentPage, onPageChange, onLogout }) {
  const [isOpen, setIsOpen] = useState(true)

  const getIcon = (iconName) => {
    const Icon = Icons[iconName]
    return Icon ? <Icon size={20} /> : null
  }

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 flex flex-col h-screen fixed left-0 top-0`}>
      {/* Header */}
      <div className="p-4 border-b border-blue-800 flex items-center justify-between">
        {isOpen && <h2 className="font-bold text-lg">AMANAT</h2>}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-blue-800 rounded transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              currentPage === item.id
                ? 'bg-blue-600 text-white'
                : 'text-blue-100 hover:bg-blue-800'
            }`}
            title={isOpen ? '' : item.label}
          >
            {getIcon(item.icon)}
            {isOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800 transition"
          title={isOpen ? '' : 'Keluar'}
        >
          <LogOut size={20} />
          {isOpen && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  )
}