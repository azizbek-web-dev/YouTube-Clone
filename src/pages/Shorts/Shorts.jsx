import { useEffect, useRef, useState } from 'react'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import ShortsPlayer from './ShortsPlayer.jsx'
import { shorts } from '../../data/shorts.js'
import './Shorts.css'

function Shorts() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const stageRefs = useRef([])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number(entry.target.dataset.index)
            setActiveIndex(idx)
          }
        })
      },
      { root, threshold: [0.6] }
    )

    stageRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (idx) => {
    const target = stageRefs.current[idx]
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goPrev = () => activeIndex > 0 && scrollTo(activeIndex - 1)
  const goNext = () =>
    activeIndex < shorts.length - 1 && scrollTo(activeIndex + 1)

  return (
    <div className="shorts-page">
      <div className="shorts-scroll" ref={containerRef}>
        {shorts.map((s, i) => (
          <div
            key={s.id}
            data-index={i}
            ref={(el) => (stageRefs.current[i] = el)}
          >
            <ShortsPlayer short={s} isActive={i === activeIndex} />
          </div>
        ))}
      </div>

      <div className="shorts-nav">
        <button
          className="shorts-nav-btn"
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Previous"
        >
          <FiChevronUp />
        </button>
        <button
          className="shorts-nav-btn"
          onClick={goNext}
          disabled={activeIndex === shorts.length - 1}
          aria-label="Next"
        >
          <FiChevronDown />
        </button>
      </div>
    </div>
  )
}

export default Shorts
