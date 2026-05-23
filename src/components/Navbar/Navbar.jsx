import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiMenu,
  FiSearch,
  FiMic,
  FiVideo,
  FiBell,
  FiMoreVertical,
  FiUser,
  FiArrowLeft,
  FiLogOut,
} from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext.jsx'
import './Navbar.css'

function Navbar({ onToggleSidebar, onOpenDrawer }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const onLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="navbar">
      {mobileSearchOpen && (
        <div className="navbar-mobile-search">
          <button
            className="icon-btn"
            onClick={() => setMobileSearchOpen(false)}
            aria-label="Back"
          >
            <FiArrowLeft />
          </button>
          <form className="search-form" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Qidiruv"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <button className="icon-btn" aria-label="Voice search">
            <FiMic />
          </button>
        </div>
      )}

      <div className="navbar-left">
        <button
          className="icon-btn hide-mobile"
          onClick={onToggleSidebar}
          aria-label="Menu"
        >
          <FiMenu />
        </button>
        <button
          className="icon-btn show-mobile"
          onClick={onOpenDrawer}
          aria-label="Menu"
        >
          <FiMenu />
        </button>
        <Link to="/" className="navbar-logo" aria-label="YouTube home">
          <FaYoutube className="navbar-logo-icon" />
          <span className="navbar-logo-text">YouTube</span>
        </Link>
      </div>

      <div className="navbar-center hide-mobile">
        <form className="search-box" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Qidiruv"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-submit" aria-label="Search">
            <FiSearch />
          </button>
        </form>
        <button className="icon-btn voice-btn" aria-label="Voice search">
          <FiMic />
        </button>
      </div>

      <div className="navbar-right">
        <button
          className="icon-btn show-mobile"
          onClick={() => setMobileSearchOpen(true)}
          aria-label="Search"
        >
          <FiSearch />
        </button>
        {user ? (
          <>
            <button className="icon-btn hide-mobile" aria-label="Create">
              <FiVideo />
            </button>
            <button className="icon-btn hide-mobile" aria-label="Notifications">
              <FiBell />
            </button>
            <div className="navbar-user" ref={menuRef}>
              <button
                className="navbar-user-avatar"
                style={{ backgroundColor: user.color }}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Account menu"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {menuOpen && (
                <div className="navbar-user-menu">
                  <div className="navbar-user-info">
                    <div
                      className="navbar-user-info-avatar"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="navbar-user-info-name">{user.name}</div>
                      <div className="navbar-user-info-handle">
                        {user.handle}
                      </div>
                    </div>
                  </div>
                  <button className="navbar-user-menu-item" onClick={onLogout}>
                    <FiLogOut />
                    <span>Hisobdan chiqish</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="icon-btn" aria-label="More">
              <FiMoreVertical />
            </button>
            <Link to="/login" className="sign-in-btn">
              <FiUser />
              <span>Kirish</span>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
