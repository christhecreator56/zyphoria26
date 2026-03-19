import styles from './CountdownSection.module.css'
import { useState, useEffect, useRef } from 'react'

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const ref = useRef(null)

  useEffect(() => {
    // April 15, 2026 09:00:00
    const targetDate = new Date('2026-04-15T09:00:00').getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const diff = targetDate - now

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateTimer()
    const intNum = setInterval(updateTimer, 1000)

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) ref.current.classList.add(styles.visible)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)

    return () => {
      clearInterval(intNum)
      observer.disconnect()
    }
  }, [])

  const addZero = (num) => num < 10 ? `0${num}` : num

  return (
    <section className={styles.countdownWrapper}>
      <div className={styles.container} ref={ref}>
        <h3 className={styles.headerTitle}>Time Until Zyphoria '26</h3>
        
        <div className={styles.countdownGrid}>
          <div className={styles.timeBox}>
            <span className={styles.num}>{addZero(timeLeft.days)}</span>
            <span className={styles.label}>Days</span>
          </div>
          <div className={styles.colon}>:</div>
          
          <div className={styles.timeBox}>
            <span className={styles.num}>{addZero(timeLeft.hours)}</span>
            <span className={styles.label}>Hours</span>
          </div>
          <div className={styles.colon}>:</div>

          <div className={styles.timeBox}>
            <span className={styles.num}>{addZero(timeLeft.minutes)}</span>
            <span className={styles.label}>Minutes</span>
          </div>
          <div className={styles.colon}>:</div>

          <div className={styles.timeBox}>
            <span className={styles.num}>{addZero(timeLeft.seconds)}</span>
            <span className={styles.label}>Seconds</span>
          </div>
        </div>
      </div>
    </section>
  )
}
