import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'
import { useState } from 'react'

function Catalog({ addToCart }) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('name-asc')

  const toggleSort = (type) => {
    if (type === 'name') {
      setSortBy(prev => prev === 'name-asc' ? 'name-desc' : 'name-asc');
    } else if (type === 'price') {
      setSortBy(prev => prev === 'price-asc' ? 'price-desc' : 'price-asc');
    }
  }

  let filteredGuns = GUNS.filter(gun => {
    const matchesSearch = gun.name.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'All' || gun.type === typeFilter
    return matchesSearch && matchesType
  })

  filteredGuns.sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return 0
  })

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filteredGuns.length} pieces</span>
        </div>

        <div className="controls" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search guns..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '8px', flex: '1', minWidth: '200px', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)' }}
          />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '8px', border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink)' }}>
            <option value="All">All Types</option>
            <option value="Pistol">Pistol</option>
            <option value="Rifle">Rifle</option>
            <option value="Shotgun">Shotgun</option>
          </select>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => toggleSort('name')} style={{ padding: '8px 16px', border: '1px solid var(--line)', background: sortBy.startsWith('name') ? 'var(--line)' : 'var(--paper)', color: 'var(--ink)', cursor: 'pointer' }}>
              Name {sortBy === 'name-asc' ? '↑' : sortBy === 'name-desc' ? '↓' : ''}
            </button>
            <button onClick={() => toggleSort('price')} style={{ padding: '8px 16px', border: '1px solid var(--line)', background: sortBy.startsWith('price') ? 'var(--line)' : 'var(--paper)', color: 'var(--ink)', cursor: 'pointer' }}>
              Price {sortBy === 'price-asc' ? '↑' : sortBy === 'price-desc' ? '↓' : ''}
            </button>
          </div>
        </div>

        {filteredGuns.length > 0 ? (
          <ul className="stock">
            {filteredGuns.map((gun) => <GunCard key={gun.name} gun={gun} addToCart={addToCart} />)}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '40px', color: 'var(--steel)' }}>no guns match</p>
        )}
      </section>
    </>
  )
}

export default Catalog
