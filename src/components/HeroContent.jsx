import { Link } from 'react-router-dom'
import styles from './HeroContent.module.css'

export default function HeroContent () {
  return (
    <div className={styles.content} id="heroContent">
      <div className={styles.badge}>✦ CSE RIT & iDataMind ✦</div>

      <h1 className={styles.title} id="heroTitle">
        <span className={styles.titleLine}>ZYPHORIA '26</span>
      </h1>

      <p className={styles.subtitle} id="heroSubtitle">
        International Symposium
      </p>

      <p className={styles.tagline} id="heroTagline">
        The Future, Compiled. | 15 - 16 April 2026
      </p>

      <div className={styles.cta} id="heroCta">
        <Link to="/events" className={`${styles.btn} ${styles.btnPrimary}`} id="btnRegister">
          Register Now
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scroll} id="heroScroll">
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll to discover</span>
      </div>
    </div>
  )
}

