import { NavLink } from 'react-router-dom'
import { FiHome, FiUser, FiPlusCircle } from 'react-icons/fi'
import { MdOutlineSlowMotionVideo, MdSubscriptions } from 'react-icons/md'
import './MobileNav.css'

const items = [
  { icon: <FiHome />, label: 'Asosiy', to: '/' },
  { icon: <MdOutlineSlowMotionVideo />, label: 'Shorts', to: '/shorts' },
  { icon: <FiPlusCircle />, label: '', to: '/create', isCreate: true },
  { icon: <MdSubscriptions />, label: 'Obunalar', to: '/subscriptions' },
  { icon: <FiUser />, label: 'Siz', to: '/you' },
]

function MobileNav() {
  return (
    <nav className="mobile-nav">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'active' : ''} ${
              item.isCreate ? 'create' : ''
            }`
          }
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          {item.label && <span className="mobile-nav-label">{item.label}</span>}
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileNav
