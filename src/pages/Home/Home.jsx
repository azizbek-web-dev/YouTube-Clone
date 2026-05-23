import { useMemo, useState } from 'react'
import CategoryBar from '../../components/CategoryBar/CategoryBar.jsx'
import VideoCard from '../../components/VideoCard/VideoCard.jsx'
import ShortsRow from '../../components/ShortsRow/ShortsRow.jsx'
import { videos } from '../../data/videos.js'
import { shorts } from '../../data/shorts.js'
import './Home.css'

const FIRST_ROW_COUNT = 4

function Home() {
  const [category, setCategory] = useState('Hammasi')

  const filtered = useMemo(() => {
    if (category === 'Hammasi') return videos
    return videos.filter((v) => v.category === category)
  }, [category])

  const firstRow = filtered.slice(0, FIRST_ROW_COUNT)
  const rest = filtered.slice(FIRST_ROW_COUNT)
  const showShorts = category === 'Hammasi' && firstRow.length > 0

  return (
    <div className="home">
      <CategoryBar active={category} onChange={setCategory} />

      {filtered.length === 0 ? (
        <p className="home-empty">
          <strong>{category}</strong> bo'yicha videolar topilmadi.
        </p>
      ) : (
        <>
          <div className="video-grid">
            {firstRow.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {showShorts && <ShortsRow shorts={shorts} />}

          {rest.length > 0 && (
            <div className="video-grid">
              {rest.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home
