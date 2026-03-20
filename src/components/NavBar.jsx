import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`} onClick={toggleMenu} />
      
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.logoContainer}>
          <img src={`${import.meta.env.BASE_URL}rit-logo.png`} alt="RIT Logo" className={styles.logo} />
        </div>

        <button 
          className={`${styles.hamburger} ${isOpen ? styles.menuOpen : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`${styles.glassContainer} ${isOpen ? styles.menuOpen : ''}`}>
          <a href="#hero" className={styles.link} onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" className={styles.link} onClick={() => setIsOpen(false)}>About</a>
          <Link to="/events" className={styles.link} onClick={() => setIsOpen(false)}>Events</Link>
          <a href="#events" className={styles.link} onClick={() => setIsOpen(false)}>Details</a>
          <Link to="/events" className={styles.registerBtn} onClick={() => setIsOpen(false)}>Register</Link>
        </div>
      </nav>
    </>
  )
}
