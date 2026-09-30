import { useState, useEffect } from 'react'
import Header from './components/Header'
import PhotoGallery from './components/PhotoGallery'
import Footer from './components/Footer'

const API_URL = 'https://jsonplaceholder.typicode.com/photos'

export default function App() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [dark, setDark] = useState(false)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Data load করা যায়নি')
        return res.json()
      })
      .then((data) => setPhotos(data.slice(0, 100)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  return (
    <>
      <Header
        search={search}
        onSearch={setSearch}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
      />
      <main className="main">
        {loading && <p className="status">Loading photos...</p>}
        {error && <p className="status error">{error}</p>}
        {!loading && !error && <PhotoGallery photos={photos} search={search} />}
      </main>
      <Footer />
    </>
  )
}
