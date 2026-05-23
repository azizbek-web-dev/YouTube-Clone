import { MdOutlineVideoLibrary } from 'react-icons/md'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'

function You() {
  return (
    <EmptyState
      icon={<MdOutlineVideoLibrary />}
      title="Sevimli videolardan bahramand bo'ling"
      text="Siz yoqtirgan yoki saqlagan videolarni ochish uchun hisobingizga kiring"
    />
  )
}

export default You
