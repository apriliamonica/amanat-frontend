import { useState } from 'react'
import Button from '../common/Button'

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const roleMap = {
    'admin': 'sekretaris-kantor',
    'ketua': 'ketua',
    'sekpengurus': 'sekretaris-pengurus',
    'kabag': 'kabag'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!username || !password) {
      setError('Username dan password harus diisi')
      return
    }

    if (roleMap[username] && password === username) {
      setError('')
      onLogin(roleMap[username])
    } else {
      setError('Username atau password salah!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">AMANAT</h1>
          <p className="text-gray-600 mt-2">Aplikasi Manajemen Surat dan Arsip Terpadu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin / ketua / sekpengurus / kabag"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password (sama dengan username)"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Masuk
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-medium text-blue-900 mb-2">Demo Login:</p>
          <ul className="text-blue-800 space-y-1 text-xs">
            <li>• <strong>Admin:</strong> admin / admin</li>
            <li>• <strong>Ketua:</strong> ketua / ketua</li>
            <li>• <strong>Sekpengurus:</strong> sekpengurus / sekpengurus</li>
            <li>• <strong>Kabag:</strong> kabag / kabag</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
