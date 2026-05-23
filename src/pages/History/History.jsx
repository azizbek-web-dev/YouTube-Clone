import { FiClock, FiTrash2, FiPauseCircle, FiSearch } from 'react-icons/fi'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import './History.css'

const actions = [
  { icon: <FiTrash2 />, label: 'Tomosha tarixini tozalash' },
  { icon: <FiPauseCircle />, label: 'Tomosha tarixini pauzalash' },
  { icon: <FiTrash2 />, label: 'Qidiruv tarixini tozalash' },
  { icon: <FiPauseCircle />, label: 'Qidiruv tarixini pauzalash' },
]

function History() {
  return (
    <div className="history-page">
      <div className="history-main">
        <EmptyState
          icon={<FiClock />}
          title="Nimalarni tomosha qilayotganingizni biling"
          text={
            <>
              Tomosha tarixini ko'rish uchun hisobingizga kiring.{' '}
              <a href="#" className="history-learn-more">
                Batafsil
              </a>
            </>
          }
        />
      </div>

      <aside className="history-actions">
        {actions.map((a) => (
          <button key={a.label} className="history-action">
            <span className="history-action-icon">{a.icon}</span>
            <span>{a.label}</span>
          </button>
        ))}
      </aside>
    </div>
  )
}

export default History
