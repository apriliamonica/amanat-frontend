import { Search } from 'lucide-react'

export default function SearchBar({ 
  placeholder = 'Cari...',
  value,
  onChange,
  className = ''
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}