import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { FaYoutube } from 'react-icons/fa'
import {
  HiOutlineMusicNote,
  HiOutlineNewspaper,
  HiOutlineSparkles,
} from 'react-icons/hi'
import { IoGameControllerOutline, IoFootballOutline } from 'react-icons/io5'
import { MdOutlineSchool, MdOutlineLocalMall } from 'react-icons/md'
import './MobileDrawer.css'

const categories = [
  { icon: <HiOutlineMusicNote />, label: 'Musiqa' },
  { icon: <FaYoutube />, label: 'Jonli' },
  { icon: <IoGameControllerOutline />, label: 'Gaming' },
  { icon: <HiOutlineNewspaper />, label: 'Yangiliklar' },
  { icon: <IoFootballOutline />, label: 'Sport' },
  { icon: <MdOutlineSchool />, label: "O'rganish" },
  { icon: <HiOutlineSparkles />, label: "Moda va go'zallik" },
]

function MobileDrawer({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div
        className={`drawer-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
      />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-header">
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <FiX />
          </button>
          <Link to="/" className="drawer-logo" onClick={onClose}>
            <FaYoutube className="drawer-logo-icon" />
            <span>YouTube</span>
          </Link>
        </div>

        <nav className="drawer-list">
          {categories.map((cat) => (
            <button key={cat.label} className="drawer-item">
              <span className="drawer-item-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </nav>

        <div className="drawer-section">
          <h4>YouTube xizmatlari</h4>
          <button className="drawer-item">
            <span className="drawer-item-icon">
              <FaYoutube />
            </span>
            <span>YouTube Kids</span>
          </button>
        </div>

        <footer className="drawer-footer">
          <a href="#">Kanal haqida</a>
          <a href="#">Matbuot</a>
          <a href="#">Mualliflik huquqi</a>
          <a href="#">Aloqa</a>
          <a href="#">Reklama</a>
          <p className="drawer-copy">&copy; 2026 Google LLC</p>
        </footer>
      </aside>
    </>
  )
}

export default MobileDrawer
