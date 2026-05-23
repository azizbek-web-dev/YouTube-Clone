import { useState } from 'react'
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMoreVertical,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageCircle,
  FiShare2,
} from 'react-icons/fi'
import { FaPlay } from 'react-icons/fa'
import { MdLoop } from 'react-icons/md'
import { formatViews } from '../../utils/format.js'
import './ShortsPlayer.css'

function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace('.0', '')} mln`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} ming`
  return String(n)
}

function ShortsPlayer({ short, isActive }) {
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [liked, setLiked] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="shorts-stage" data-active={isActive ? 'true' : 'false'}>
      <div className="shorts-player">
        <img
          src={short.thumbnail}
          alt={short.title}
          className="shorts-player-bg"
        />

        <div className="shorts-player-overlay">
          <div className="shorts-top-controls">
            <button
              className="shorts-icon-btn"
              onClick={() => setPlaying((v) => !v)}
              aria-label="Play/Pause"
            >
              {playing ? <FiPause /> : <FiPlay />}
            </button>
            <button
              className="shorts-icon-btn"
              onClick={() => setMuted((v) => !v)}
              aria-label="Volume"
            >
              {muted ? <FiVolumeX /> : <FiVolume2 />}
            </button>
            <button className="shorts-icon-btn" aria-label="More">
              <FiMoreVertical />
            </button>
          </div>

          {!playing && (
            <button
              className="shorts-center-play"
              onClick={() => setPlaying(true)}
              aria-label="Play"
            >
              <FaPlay />
            </button>
          )}

          <div className="shorts-bottom-info">
            <div className="shorts-channel">
              <div
                className="shorts-channel-avatar"
                style={{ backgroundColor: short.channel.color }}
              >
                {short.channel.handle.charAt(1).toUpperCase()}
              </div>
              <span className="shorts-channel-handle">
                {short.channel.handle}
              </span>
              <button
                className={`shorts-subscribe ${subscribed ? 'subscribed' : ''}`}
                onClick={() => setSubscribed((v) => !v)}
              >
                {subscribed ? "Obuna bo'lingan" : 'Obuna'}
              </button>
            </div>
            <p className="shorts-player-title">{short.title}</p>
            <p className="shorts-views-line">{formatViews(short.views)}</p>
          </div>
        </div>
      </div>

      <aside className="shorts-actions">
        <button
          className={`shorts-action ${liked ? 'active' : ''}`}
          onClick={() => setLiked((v) => !v)}
        >
          <span className="shorts-action-icon">
            <FiThumbsUp />
          </span>
          <span className="shorts-action-label">
            {formatCount(short.likes + (liked ? 1 : 0))}
          </span>
        </button>

        <button className="shorts-action">
          <span className="shorts-action-icon">
            <FiThumbsDown />
          </span>
          <span className="shorts-action-label">Yoqmadi</span>
        </button>

        <button className="shorts-action">
          <span className="shorts-action-icon">
            <FiMessageCircle />
          </span>
          <span className="shorts-action-label">
            {formatCount(short.comments)}
          </span>
        </button>

        <button className="shorts-action">
          <span className="shorts-action-icon">
            <FiShare2 />
          </span>
          <span className="shorts-action-label">Ulashish</span>
        </button>

        <button className="shorts-action">
          <span className="shorts-action-icon">
            <MdLoop />
          </span>
          <span className="shorts-action-label">Remiks</span>
        </button>

        <button
          className="shorts-action-avatar"
          style={{ backgroundColor: short.channel.color }}
        >
          {short.channel.handle.charAt(1).toUpperCase()}
        </button>
      </aside>
    </div>
  )
}

export default ShortsPlayer
