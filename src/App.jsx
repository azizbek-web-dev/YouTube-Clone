import { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import MobileNav from './components/MobileNav/MobileNav.jsx'
import MobileDrawer from './components/MobileDrawer/MobileDrawer.jsx'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="app">
      <Navbar
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        onOpenDrawer={() => setDrawerOpen(true)}
      />
      <Sidebar open={sidebarOpen} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className={`app-main ${sidebarOpen ? 'with-sidebar' : 'with-mini'}`}>
        <div className="app-placeholder">
          <h2>Bu yerda video grid bo'ladi</h2>
          <p>Keyingi qadamda kategoriya filtri va video kartochkalari qo'shiladi.</p>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}

export default App
