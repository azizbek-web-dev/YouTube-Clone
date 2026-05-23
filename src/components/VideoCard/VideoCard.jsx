import { Link } from 'react-router-dom'
import { FiMoreVertical } from 'react-icons/fi'
import { MdVerified } from 'react-icons/md'
import { formatViews, timeAgo } from '../../utils/format.js'
import './VideoCard.css'

function VideoCard({ video }) {
  return (
    <article className="video-card">
      <Link to={`/watch/${video.id}`} className="video-thumb-wrap">
        <img src={video.thumbnail} alt={video.title} className="video-thumb" />
        <span className="video-duration">{video.duration}</span>
      </Link>

      <div className="video-body">
        <div
          className="video-avatar"
          style={{ backgroundColor: video.channelColor }}
        >
          {video.channel.charAt(0).toUpperCase()}
        </div>

        <div className="video-meta">
          <Link to={`/watch/${video.id}`} className="video-title">
            {video.title}
          </Link>
          <div className="video-channel">
            <span>{video.channel}</span>
            {video.channelVerified && (
              <MdVerified className="video-verified" />
            )}
          </div>
          <div className="video-stats">
            {formatViews(video.views)} &middot; {timeAgo(video.publishedAt)}
          </div>
        </div>

        <button className="video-more" aria-label="More">
          <FiMoreVertical />
        </button>
      </div>
    </article>
  )
}

export default VideoCard
