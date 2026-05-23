import { useMemo, useState } from 'react'
import CategoryBar from '../../components/CategoryBar/CategoryBar.jsx'
import VideoCard from '../../components/VideoCard/VideoCard.jsx'
import { videos } from '../../data/videos.js'
import './Home.css'

function Home() {
  const [category, setCategory] = useState('Hammasi')

  const filtered = useMemo(() => {
    if (category === 'Hammasi') return videos
    return videos.filter((v) => v.category === category)
  }, [category])

  return (
    <div className="home">
      <CategoryBar active={category} onChange={setCategory} />

      {filtered.length === 0 ? (
        <p className="home-empty">
          <strong>{category}</strong> bo'yicha videolar topilmadi.
        </p>
      ) : (
        <div className="video-grid">
          {filtered.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
