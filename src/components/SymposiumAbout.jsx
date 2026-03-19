import styles from './SymposiumAbout.module.css'
import { useEffect, useRef } from 'react'

export default function SymposiumAbout() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) ref.current.classList.add(styles.visible)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.aboutWrapper} id="about">
      <div className={styles.container} ref={ref}>
        <div className={styles.glassCard}>
          <div className={styles.accent} aria-hidden="true">✦</div>
          <h2 className={styles.title}>About The Symposium</h2>
          <p className={styles.text}>
            Zyphoria '26 is an International Symposium that brings together students, 
            innovators, and technology enthusiasts from various institutions. 
            It encourages creativity, innovation, and collaboration through engaging competitions.
          </p>
          <div className={styles.glowEffect}></div>
        </div>
      </div>
    </section>
  )
}
