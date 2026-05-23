import { useRef, useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './CategoryBar.css'

const categories = [
  'Hammasi',
  'Musiqa',
  'Mikslar',
  'Gaming',
  'Jonli',
  'Minecraft',
  'Rep aytish',
  'Futbol',
  "Jangovar va sarguzasht o'yinlari",
  "Sport o'yinlari",
  'Yaqinda yuklangan',
  'Yangi sizga',
  'Tomosha qilinganlar',
  'Yangiliklar',
  'Komediya',
  'Podkastlar',
  'Sayohat',
  "Pazandachilik",
]

function CategoryBar({ active, onChange }) {
  const scrollerRef = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const updateArrows = () => {
    const el = scrollerRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 0)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scrollBy = (delta) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div className="category-bar">
      {canLeft && (
        <button
          className="category-arrow left"
          onClick={() => scrollBy(-200)}
          aria-label="Scroll left"
        >
          <FiChevronLeft />
        </button>
      )}

      <div className="category-scroller" ref={scrollerRef}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-chip ${active === cat ? 'active' : ''}`}
            onClick={() => onChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {canRight && (
        <button
          className="category-arrow right"
          onClick={() => scrollBy(200)}
          aria-label="Scroll right"
        >
          <FiChevronRight />
        </button>
      )}
    </div>
  )
}

export default CategoryBar
