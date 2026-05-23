import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiUser,
  FiClock,
  FiFlag,
  FiSettings,
  FiHelpCircle,
  FiMessageSquare,
} from 'react-icons/fi'
import {
  MdSubscriptions,
  MdOutlineSlowMotionVideo,
} from 'react-icons/md'
import './Sidebar.css'

const mainItems = [
  { icon: <FiHome />, label: 'Asosiy', to: '/' },
  { icon: <MdOutlineSlowMotionVideo />, label: 'Shorts', to: '/shorts' },
  { icon: <MdSubscriptions />, label: 'Obunalar', to: '/subscriptions' },
]

const youItems = [
  { icon: <FiUser />, label: 'Siz', to: '/you' },
  { icon: <FiClock />, label: 'Tomosha tarixi', to: '/history' },
]

const settingsItems = [
  { icon: <FiSettings />, label: 'Sozlamalar' },
  { icon: <FiFlag />, label: 'Shikoyatlar tarixi' },
  { icon: <FiHelpCircle />, label: 'Yordam' },
  { icon: <FiMessageSquare />, label: 'Fikr bildirish' },
]

function SidebarItem({ icon, label, to, mini }) {
  const className = ({ isActive }) =>
    `sidebar-item ${mini ? 'sidebar-item-mini' : ''} ${isActive ? 'active' : ''}`

  if (to) {
    return (
      <NavLink to={to} className={className} end>
        <span className="sidebar-item-icon">{icon}</span>
        <span className="sidebar-item-label">{label}</span>
      </NavLink>
    )
  }

  return (
    <button className={`sidebar-item ${mini ? 'sidebar-item-mini' : ''}`}>
      <span className="sidebar-item-icon">{icon}</span>
      <span className="sidebar-item-label">{label}</span>
    </button>
  )
}

function Sidebar({ open }) {
  if (!open) {
    return (
      <aside className="sidebar sidebar-mini">
        {mainItems.map((item) => (
          <SidebarItem key={item.label} {...item} mini />
        ))}
        <SidebarItem icon={<FiUser />} label="Siz" to="/you" mini />
      </aside>
    )
  }

  return (
    <aside className="sidebar sidebar-full">
      <section className="sidebar-section">
        {mainItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </section>

      <section className="sidebar-section">
        <h3 className="sidebar-title">Siz</h3>
        {youItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </section>

      <section className="sidebar-section">
        {settingsItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </section>

      <footer className="sidebar-footer">
        <div className="sidebar-links">
          <a href="#">Kanal haqida</a>
          <a href="#">Matbuot</a>
          <a href="#">Mualliflik huquqi</a>
          <a href="#">Biz bilan aloqa</a>
          <a href="#">Ijodkorlar</a>
          <a href="#">Reklama</a>
          <a href="#">Dasturchilar</a>
        </div>
        <div className="sidebar-links">
          <a href="#">Shartlar</a>
          <a href="#">Maxfiylik</a>
          <a href="#">Qoidalar va xavfsizlik</a>
          <a href="#">YouTube qanday ishlaydi</a>
          <a href="#">Yangi funksiyalarni sinash</a>
        </div>
        <p className="sidebar-copy">&copy; 2026 Google LLC</p>
      </footer>
    </aside>
  )
}

export default Sidebar
