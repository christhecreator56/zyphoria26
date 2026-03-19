import styles from './AboutSection.module.css'
import { useEffect, useRef } from 'react'
import { CalendarDays, Monitor, Palette, Rocket, Users, Phone } from 'lucide-react'

const bentoItems = [
  { id: 'b1', span: 'colspan2rowspan2', icon: <CalendarDays size={42} strokeWidth={1.5} color="#f5d98a" />, title: 'The Event', desc: 'Technical Events: 15 April 2026\nNon-Technical Events: 16 April 2026\nVenue: Department of CSE, RIT\n\nExperience cutting-edge technology showcases, AI-driven challenges, and hands-on competitions curated by iDataMind and CSE faculty.' },
  { id: 'b2', span: 'colspan1rowspan2', icon: <Monitor size={42} strokeWidth={1.5} color="#f5d98a" />, title: 'Technical', desc: '• Reverse Engineering\n• AI Prompt Battle\n• UI/UX Redesign\n• Tech Treasure Hunt\n• Research Pitch\n• Startup in 60 Min\n• Bug Hunt' },
  { id: 'b3', span: 'colspan1rowspan1', icon: <Palette size={42} strokeWidth={1.5} color="#f5d98a" />, title: 'Non-Technical', desc: 'E-Sports, Standup, Reels & Mystery Box Innovations!' },
  { id: 'b4', span: 'colspan1rowspan1', icon: <Rocket size={42} strokeWidth={1.5} color="#f5d98a" />, title: 'Pillars', desc: 'Innovation, Competition & Community' },
  { id: 'b5', span: 'colspan2rowspan1', icon: <Users size={42} strokeWidth={1.5} color="#f5d98a" />, title: 'Team Registration', desc: 'Teams of 3. ₹150 per participant. 1 Tech + 1 Non-Tech event included.', hasCta: true },
  { id: 'b6', span: 'colspan2rowspan1', icon: <Phone size={42} strokeWidth={1.5} color="#f5d98a" />, title: 'Contact Us', desc: 'zyphoria26.cse@gmail.com\nInstagram: @zyphoria_26_rit\n\nCoordinators: Divyadarshini K, Gajalakshmi C, M.S. Sathish, S. Sanjit Kumar' }
];

export default function AboutSection () {
  const cardRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add(styles.visible)
      }),
      { threshold: 0.15 }
    )
    cardRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.about} id="events">
      <div className={styles.container}>
        <div className={styles.accent} aria-hidden="true">✦</div>
        <h2 className={styles.title}>Events & Details</h2>
        <p className={styles.text}>
          Explore the dynamic events and core pillars shaping Zyphoria '26.
          Battle the brightest minds across institutions in 14+ technical and non-technical events.
        </p>
        <div className={styles.bentoGrid}>
          {bentoItems.map((c, i) => (
            <div
              key={c.id}
              className={`${styles.card} ${styles[c.span]} `}
              ref={el => (cardRefs.current[i] = el)}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{c.icon}</div>
                <h3>{c.title}</h3>
              </div>
              <p>{c.desc.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}</p>
              
              {c.hasCta && (
                <div className={styles.ctaBtn}>
                  <a href="/events" className={styles.ctaLink}>Register Team</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
