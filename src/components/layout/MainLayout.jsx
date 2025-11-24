import Sidebar from './Sidebar'
import Header from './Header'
import Dashboard from '../pages/Dashboard/Dashboard'
import IncomingMailPage from '../pages/IncomingMail/IncomingMailPage'
import OutgoingMailPage from '../pages/OutgoingMail/OutgoingMailPage'
import DispositionPage from '../pages/Disposition/DispositionPage'
import ArchivePage from '../pages/Archive/ArchivePage'

export default function MainLayout({ 
  currentPage, 
  onPageChange, 
  userRole,
  onLogout 
}) {
  const handleLogout = () => {
    onLogout()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="ml-64 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header userRole={userRole} />

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'surat-masuk' && <IncomingMailPage role={userRole} />}
            {currentPage === 'surat-keluar' && <OutgoingMailPage role={userRole} />}
            {currentPage === 'disposisi' && <DispositionPage role={userRole} />}
            {currentPage === 'arsip' && <ArchivePage />}
          </div>
        </div>
      </main>
    </div>
  )
}