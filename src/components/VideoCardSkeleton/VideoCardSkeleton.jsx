import './VideoCardSkeleton.css'

function VideoCardSkeleton() {
  return (
    <article className="video-card-skel">
      <div className="skel skel-thumb" />
      <div className="video-card-skel-body">
        <div className="skel skel-avatar" />
        <div className="video-card-skel-meta">
          <div className="skel skel-line skel-line-1" />
          <div className="skel skel-line skel-line-2" />
          <div className="skel skel-line skel-line-3" />
        </div>
      </div>
    </article>
  )
}

export default VideoCardSkeleton
