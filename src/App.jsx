import { useState } from 'react'
import AuthContext from './context/AuthContext'
import LoginPage from './components/auth/LoginPage'
import MainLayout from './components/layout/MainLayout'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleLogin = (role) => {
    setUserRole(role)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setCurrentPage('dashboard')
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <AuthContext.Provider value={{ userRole, isLoggedIn, handleLogout }}>
      <MainLayout 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        userRole={userRole}
      />
    </AuthContext.Provider>
  )
}
