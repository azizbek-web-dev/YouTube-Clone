import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import MobileNav from './components/MobileNav/MobileNav.jsx'
import MobileDrawer from './components/MobileDrawer/MobileDrawer.jsx'
import Home from './pages/Home/Home.jsx'
import Shorts from './pages/Shorts/Shorts.jsx'
import Subscriptions from './pages/Subscriptions/Subscriptions.jsx'
import You from './pages/You/You.jsx'
import History from './pages/History/History.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import './App.css'

const AUTH_ROUTES = ['/login', '/register']

function App() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (AUTH_ROUTES.includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    )
  }

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
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/you" element={<You />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>

      <MobileNav />
    </div>
  )
}

export default App
