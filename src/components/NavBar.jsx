import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={`${import.meta.env.BASE_URL}rit-logo.png`} alt="RIT Logo" className={styles.logo} />
      </div>
      <div className={styles.glassContainer}>
        <a href="#hero" className={styles.link}>Home</a>
        <a href="#about" className={styles.link}>About</a>
        <Link to="/events" className={styles.link}>Events</Link>
        <a href="#events" className={styles.link}>Details</a>
        <Link to="/events" className={styles.registerBtn}>Register</Link>
      </div>
    </nav>
  )
}
