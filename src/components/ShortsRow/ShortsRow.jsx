import { SiYoutubeshorts } from 'react-icons/si'
import ShortsCard from '../ShortsCard/ShortsCard.jsx'
import ShortsCardSkeleton from '../ShortsCardSkeleton/ShortsCardSkeleton.jsx'
import './ShortsRow.css'

function ShortsRow({ shorts, loading }) {
  return (
    <section className="shorts-row">
      <header className="shorts-row-header">
        <SiYoutubeshorts className="shorts-row-icon" />
        <h2>Shorts</h2>
      </header>

      <div className="shorts-row-list">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <ShortsCardSkeleton key={i} />
            ))
          : shorts.map((s) => <ShortsCard key={s.id} short={s} />)}
      </div>
    </section>
  )
}

export default ShortsRow
