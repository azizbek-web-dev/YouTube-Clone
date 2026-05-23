import { MdSubscriptions } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'
import './Subscriptions.css'

function Subscriptions() {
  return (
    <div className="subs-page">
      <div className="subs-empty">
        <MdSubscriptions className="subs-empty-icon" />
        <h2 className="subs-empty-title">Yangi videolarni o'tkazib yubormang</h2>
        <p className="subs-empty-text">
          Sevimli YouTube kanallaringizdan yangiliklarni ko'rish uchun hisobga
          kiring
        </p>
        <button className="subs-signin-btn">
          <FiUser />
          <span>Kirish</span>
        </button>
      </div>
    </div>
  )
}

export default Subscriptions
