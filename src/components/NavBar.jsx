import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.glassContainer}>
        <a href="#hero" className={styles.link}>Home</a>
        <a href="#about" className={styles.link}>About</a>
        <a href="/events" className={styles.link}>Events</a>
        <a href="#events" className={styles.link}>Details</a>
        <a href="/events" className={styles.registerBtn}>Register</a>
      </div>
    </nav>
  )
}
