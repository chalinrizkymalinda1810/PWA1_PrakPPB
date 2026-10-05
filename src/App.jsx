import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState({})

  const addToCart = (gunName) => {
    setCart(prev => ({
      ...prev,
      [gunName]: (prev[gunName] || 0) + 1
    }))
  }

  const removeFromCart = (gunName) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[gunName] > 1) {
        newCart[gunName]--
      } else {
        delete newCart[gunName]
      }
      return newCart
    })
  }

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
    <div className="shell">
      <Header 
        tab={tab} 
        onTab={setTab} 
        cartItemCount={cartItemCount} 
        cart={cart} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart} 
      />

      <main className="main">
        {tab === 'Catalog' && <Catalog addToCart={addToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />
    </div>
  )
}

export default App
