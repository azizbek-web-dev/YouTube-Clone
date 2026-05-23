import { useEffect, useMemo, useState } from 'react'
import CategoryBar from '../../components/CategoryBar/CategoryBar.jsx'
import VideoCard from '../../components/VideoCard/VideoCard.jsx'
import VideoCardSkeleton from '../../components/VideoCardSkeleton/VideoCardSkeleton.jsx'
import ShortsRow from '../../components/ShortsRow/ShortsRow.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { videos } from '../../data/videos.js'
import { shorts } from '../../data/shorts.js'
import './Home.css'

const SECOND_GRID_SKELETON_COUNT = 6

function Home() {
  const [category, setCategory] = useState('Hammasi')
  const [loading, setLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [category])

  const filtered = useMemo(() => {
    if (category === 'Hammasi') return videos
    return videos.filter((v) => v.category === category)
  }, [category])

  const firstRowCount = isMobile ? 1 : 3
  const firstRow = filtered.slice(0, firstRowCount)
  const rest = filtered.slice(firstRowCount)
  const showShorts = category === 'Hammasi' && (loading || firstRow.length > 0)

  if (loading) {
    return (
      <div className="home">
        <CategoryBar active={category} onChange={setCategory} />

        <div className="video-grid">
          {Array.from({ length: firstRowCount }).map((_, i) => (
            <VideoCardSkeleton key={`first-${i}`} />
          ))}
        </div>

        {showShorts && <ShortsRow shorts={shorts.slice(0, 5)} loading />}

        <div className="video-grid">
          {Array.from({ length: SECOND_GRID_SKELETON_COUNT }).map((_, i) => (
            <VideoCardSkeleton key={`rest-${i}`} />
          ))}
        </div>
      </div>
    )
  }

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
