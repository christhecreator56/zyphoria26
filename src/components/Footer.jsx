import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Side */}
        <div className={styles.brandSide}>
          <h2 className={styles.brandTitle}>ZYPHORIA '26</h2>
          <p className={styles.brandDesc}>
            A cosmic odyssey where the future of technology and elegance meet. 
            Join the journey of innovation and excellence at Rajalakshmi Institute of Technology.
          </p>
          <div className={styles.socials}>
            <a href="https://instagram.com" className={styles.socialIcon} aria-label="Instagram">
              <span style={{ fontSize: '1.2rem' }}>✦</span>
            </a>
            <a href="https://linkedin.com" className={styles.socialIcon} aria-label="LinkedIn">
              <span style={{ fontSize: '1.2rem' }}>◈</span>
            </a>
            <a href="https://twitter.com" className={styles.socialIcon} aria-label="X (formerly Twitter)">
              <span style={{ fontSize: '1.2rem' }}>✙</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={styles.linksHeader}>Navigation</h3>
          <ul className={styles.links}>
            <li className={styles.linkItem}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/events">Events</Link>
            </li>
            <li className={styles.linkItem}>
              <a href="#about">About Symposium</a>
            </li>
            <li className={styles.linkItem}>
              <a href="#hero">Back to Top</a>
            </li>
          </ul>
        </div>

        {/* Department Info */}
        <div>
          <h3 className={styles.linksHeader}>Presented By</h3>
          <ul className={styles.links}>
            <li className={styles.linkItem}>
              <span style={{ color: 'rgba(253, 246, 227, 0.7)' }}>
                Department of Computer Science & Engineering
              </span>
            </li>
            <li className={styles.linkItem}>
              <span style={{ color: 'rgba(253, 246, 227, 0.7)' }}>
                Rajalakshmi Institute of Technology
              </span>
            </li>
            <li className={styles.linkItem}>
              <span style={{ color: 'var(--gold-soft)' }}>
                In Collaboration with iDataMind
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          © {currentYear} Zyphoria '26. All rights reserved.
        </span>
        <span className={styles.credit}>
          Crafted for Excellence by <strong>RIT CSE</strong>
        </span>
      </div>
    </footer>
  )
}
