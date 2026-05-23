import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiMenu,
  FiSearch,
  FiMic,
  FiVideo,
  FiBell,
  FiMoreVertical,
  FiUser,
  FiArrowLeft,
} from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa'
import './Navbar.css'

function Navbar({ onToggleSidebar, onOpenDrawer }) {
  const [query, setQuery] = useState('')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <header className="navbar">
      {/* Mobile search overlay */}
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
        <button className="icon-btn hide-mobile" aria-label="Create">
          <FiVideo />
        </button>
        <button className="icon-btn hide-mobile" aria-label="Notifications">
          <FiBell />
        </button>
        <button className="icon-btn" aria-label="More">
          <FiMoreVertical />
        </button>
        <button className="sign-in-btn">
          <FiUser />
          <span>Kirish</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
