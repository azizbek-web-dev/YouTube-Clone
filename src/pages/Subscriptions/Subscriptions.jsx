import { MdSubscriptions } from 'react-icons/md'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'

function Subscriptions() {
  return (
    <EmptyState
      icon={<MdSubscriptions />}
      title="Yangi videolarni o'tkazib yubormang"
      text="Sevimli YouTube kanallaringizdan yangiliklarni ko'rish uchun hisobga kiring"
    />
  )
}

export default Subscriptions
