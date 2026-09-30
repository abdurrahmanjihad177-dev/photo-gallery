export default function Header({ search, onSearch, dark, onToggleDark }) {
  return (
    <header className="header">
      <h1 className="logo">Photo Gallery</h1>
      <input
        className="search"
        type="search"
        placeholder="Title দিয়ে search করুন..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="btn" onClick={onToggleDark}>
        {dark ? 'Light mode' : 'Dark mode'}
      </button>
    </header>
  )
}
