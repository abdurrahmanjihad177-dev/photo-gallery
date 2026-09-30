// via.placeholder.com অনেক সময় কাজ করে না, তাই error হলে fallback image দেখানো হয়
export default function PhotoCard({ photo, onView }) {
  const { id, albumId, title, thumbnailUrl, url } = photo
  const fallback = `https://picsum.photos/seed/${id}/300/300`

  return (
    <article className="card">
      <img
        className="card-img"
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = fallback
        }}
      />
      <div className="card-body">
        <div className="badges">
          <span className="badge">Photo ID: {id}</span>
          <span className="badge alt">Album ID: {albumId}</span>
        </div>
        <h3 className="card-title">{title}</h3>
        <button className="btn small" onClick={() => onView({ ...photo, url, fallback })}>
          View details
        </button>
      </div>
    </article>
  )
}
