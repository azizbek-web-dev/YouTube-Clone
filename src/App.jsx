import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import MobileNav from './components/MobileNav/MobileNav.jsx'
import MobileDrawer from './components/MobileDrawer/MobileDrawer.jsx'
import Home from './pages/Home/Home.jsx'
import Shorts from './pages/Shorts/Shorts.jsx'
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shorts" element={<Shorts />} />
        </Routes>
      </main>

      <MobileNav />
    </div>
  )
}

export default App
