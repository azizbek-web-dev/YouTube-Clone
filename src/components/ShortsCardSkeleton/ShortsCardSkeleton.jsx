import './ShortsCardSkeleton.css'

function ShortsCardSkeleton() {
  return (
    <article className="shorts-card-skel">
      <div className="skel skel-shorts-thumb" />
      <div className="shorts-card-skel-meta">
        <div className="skel skel-line skel-line-1" />
        <div className="skel skel-line skel-line-2" />
      </div>
    </article>
  )
}

export default ShortsCardSkeleton
