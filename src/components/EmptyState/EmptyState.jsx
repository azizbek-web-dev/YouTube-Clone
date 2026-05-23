import { Link } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import './EmptyState.css'

function EmptyState({ icon, title, text, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-text">{text}</p>
      <Link to={action?.to ?? '/login'} className="empty-state-btn">
        {action?.icon ?? <FiUser />}
        <span>{action?.label ?? 'Kirish'}</span>
      </Link>
    </div>
  )
}

export default EmptyState
