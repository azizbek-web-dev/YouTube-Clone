import { useMemo, useState } from 'react'
import CategoryBar from '../../components/CategoryBar/CategoryBar.jsx'
import VideoCard from '../../components/VideoCard/VideoCard.jsx'
import ShortsRow from '../../components/ShortsRow/ShortsRow.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { videos } from '../../data/videos.js'
import { shorts } from '../../data/shorts.js'
import './Home.css'

function Home() {
  const [category, setCategory] = useState('Hammasi')
  const isMobile = useIsMobile()

  const filtered = useMemo(() => {
    if (category === 'Hammasi') return videos
    return videos.filter((v) => v.category === category)
  }, [category])

  const firstRowCount = isMobile ? 1 : 3
  const firstRow = filtered.slice(0, firstRowCount)
  const rest = filtered.slice(firstRowCount)
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

          {showShorts && <ShortsRow shorts={shorts.slice(0, 5)} />}

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
