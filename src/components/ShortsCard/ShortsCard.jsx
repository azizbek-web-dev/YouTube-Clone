import { FiMoreVertical } from 'react-icons/fi'
import { formatViews } from '../../utils/format.js'
import './ShortsCard.css'

function ShortsCard({ short }) {
  return (
    <article className="shorts-card">
      <div className="shorts-thumb-wrap">
        <img src={short.thumbnail} alt={short.title} className="shorts-thumb" />
      </div>
      <div className="shorts-meta">
        <h3 className="shorts-title">{short.title}</h3>
        <div className="shorts-views">{formatViews(short.views)}</div>
      </div>
      <button className="shorts-more" aria-label="More">
        <FiMoreVertical />
      </button>
    </article>
  )
}

export default ShortsCard
