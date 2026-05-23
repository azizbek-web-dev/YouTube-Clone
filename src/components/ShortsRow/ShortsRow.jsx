import { SiYoutubeshorts } from 'react-icons/si'
import ShortsCard from '../ShortsCard/ShortsCard.jsx'
import './ShortsRow.css'

function ShortsRow({ shorts }) {
  return (
    <section className="shorts-row">
      <header className="shorts-row-header">
        <SiYoutubeshorts className="shorts-row-icon" />
        <h2>Shorts</h2>
      </header>

      <div className="shorts-row-list">
        {shorts.map((s) => (
          <ShortsCard key={s.id} short={s} />
        ))}
      </div>
    </section>
  )
}

export default ShortsRow
