import { useState } from 'react'
import PhotoCard from './PhotoCard'

export default function PhotoGallery({ photos, search }) {
  const [album, setAlbum] = useState('all')
  const [selected, setSelected] = useState(null)

  const albums = [...new Set(photos.map((p) => p.albumId))]

  const filtered = photos.filter(
    (p) =>
      (album === 'all' || p.albumId === Number(album)) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section>
      <div className="toolbar">
        <p>{filtered.length} টি photo</p>
        <select className="select" value={album} onChange={(e) => setAlbum(e.target.value)}>
          <option value="all">সব Album</option>
          {albums.map((a) => (
            <option key={a} value={a}>Album {a}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="status">কোনো photo পাওয়া যায়নি। অন্য keyword দিয়ে চেষ্টা করুন।</p>
      ) : (
        <div className="grid">
          {filtered.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} onView={setSelected} />
          ))}
        </div>
      )}

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <img
              src={selected.url}
              alt={selected.title}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = selected.fallback.replace('300/300', '600/600')
              }}
            />
            <h3>{selected.title}</h3>
            <p>Photo ID: {selected.id} · Album ID: {selected.albumId}</p>
            <button className="btn" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  )
}
