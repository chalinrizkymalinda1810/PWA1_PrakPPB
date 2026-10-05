import { useRef } from 'react'
import GUNS from '../data/guns.js'

const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, cartItemCount, cart, addToCart, removeFromCart }) {
  const cartDialog = useRef(null)

  let totalPrice = 0
  const cartItems = Object.keys(cart).map(gunName => {
    const gun = GUNS.find(g => g.name === gunName)
    const quantity = cart[gunName]
    totalPrice += gun.price * quantity
    return { gun, quantity }
  })

  return (
    <header className="header">
      <span className="brand display">Bore &amp; Barrel</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
        <button className="nav-link" onClick={() => cartDialog.current.showModal()}>
          Cart {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
        </button>
      </nav>

      <dialog className="popup" ref={cartDialog} onClick={(e) => e.target === cartDialog.current && cartDialog.current.close()}>
        <h3 className="display">Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: '0 20px', marginTop: '16px' }}>
            {cartItems.map(({ gun, quantity }) => (
              <li key={gun.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                <div>
                  <strong>{gun.name}</strong>
                  <div style={{ color: 'var(--steel)', fontSize: '0.9rem' }}>${gun.price.toLocaleString()} x {quantity}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => removeFromCart(gun.name)} style={{ padding: '4px 8px', cursor: 'pointer', border: '1px solid var(--line)', background: 'var(--paper)' }}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => addToCart(gun.name)} style={{ padding: '4px 8px', cursor: 'pointer', border: '1px solid var(--line)', background: 'var(--paper)' }}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <h4 style={{ margin: '20px 20px 0', textAlign: 'right' }}>Total: ${totalPrice.toLocaleString()}</h4>
        )}
        <form method="dialog">
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </header>
  )
}

export default Header
