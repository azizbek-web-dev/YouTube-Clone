import { useState } from 'react'
import CategoryBar from '../../components/CategoryBar/CategoryBar.jsx'
import './Home.css'

function Home() {
  const [category, setCategory] = useState('Hammasi')

  return (
    <div className="home">
      <CategoryBar active={category} onChange={setCategory} />

      <div className="home-placeholder">
        Tanlangan: <strong>{category}</strong>
        <p>Bu yerga keyingi qadamda video grid qo'shiladi.</p>
      </div>
    </div>
  )
}

export default Home
