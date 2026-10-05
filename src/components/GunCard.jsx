import { useRef } from 'react'

function GunCard({ gun, addToCart }) {
  const popup = useRef(null)

  return (
    <li className="card">
      <div className="card-btn" style={{ cursor: 'default' }}>
        <img className="card-img" src={gun.image} alt="" width="120" height="90" onClick={() => popup.current.showModal()} style={{cursor: 'pointer'}} />
        <div onClick={() => popup.current.showModal()} style={{flex: 1, display: 'flex', flexDirection: 'column', cursor: 'pointer'}}>
          <span className="name display">{gun.name}</span>
          <span className="type">
            {gun.type} · {gun.caliber}
          </span>
          <span className="price">${gun.price.toLocaleString()}</span>
        </div>
        <button 
          onClick={() => addToCart(gun.name)}
          style={{ margin: '10px 14px 0', padding: '8px', background: 'var(--ink)', color: 'var(--paper)', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Add to Cart
        </button>
      </div>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img className="popup-img" src={gun.image} alt="" width="240" height="180" />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <form method="dialog">
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </li>
  )
}

export default GunCard
