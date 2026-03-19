import { useEffect, useRef, useCallback, useState } from 'react'
import styles from './App.module.css'
import ParticleCanvas    from './components/ParticleCanvas'
import FloatingElements  from './components/FloatingElements'
import HeroContent       from './components/HeroContent'
import SymposiumAbout    from './components/SymposiumAbout'
import CountdownSection  from './components/CountdownSection'
import AboutSection      from './components/AboutSection'
import IntroSequence     from './components/IntroSequence'
import CustomCursor      from './components/CustomCursor'
import NavBar            from './components/NavBar'
import Footer            from './components/Footer'

import bgImg from '/Background Removed (2).png'

export default function App () {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('zyphoria_intro_done') === 'true';
    }
    return false;
  });

  const [introOnMount] = useState(introDone);

  const handleIntroComplete = () => {
    setIntroDone(true);
    sessionStorage.setItem('zyphoria_intro_done', 'true');
  };
  const bgRef      = useRef(null)
  const moonRef    = useRef(null)
  const starRef    = useRef(null)
  const treeRef    = useRef(null)
  const contentRef = useRef(null)

  /* ── Smooth mouse parallax ── */
  const mouse  = useRef({ x: 0.5, y: 0.5 })
  const target = useRef({ x: 0.5, y: 0.5 })
  const rafId  = useRef(null)

  const lerp = (a, b, t) => a + (b - a) * t

  const animateParallax = useCallback(() => {
    if (!introDone) {
      rafId.current = requestAnimationFrame(animateParallax)
      return
    }

    mouse.current.x = lerp(mouse.current.x, target.current.x, 0.05)
    mouse.current.y = lerp(mouse.current.y, target.current.y, 0.05)

    const dx = mouse.current.x - 0.5
    const dy = mouse.current.y - 0.5

    if (bgRef.current)
      bgRef.current.style.transform = `scale(1.04) translate(${dx * -14}px, ${dy * -9}px)`

    if (moonRef.current) {
      moonRef.current.style.marginLeft = `${dx * 30}px`
      moonRef.current.style.marginTop  = `${dy * 20}px`
    }
    if (starRef.current) {
      starRef.current.style.marginLeft = `${dx * -22}px`
      starRef.current.style.marginTop  = `${dy * -16}px`
    }
    if (treeRef.current)
      treeRef.current.style.marginLeft = `${dx * 12}px`

    if (contentRef.current)
      contentRef.current.style.transform = `translateY(0) translate(${dx * -8}px, ${dy * -5}px)`

    rafId.current = requestAnimationFrame(animateParallax)
  }, [introDone])

  useEffect(() => {
    const onMove = e => {
      target.current.x = e.clientX / window.innerWidth
      target.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animateParallax)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [animateParallax])

  /* ── Scroll fade for hero content ── */
  useEffect(() => {
    const contentEl = document.getElementById('heroContent')
    const scrollEl  = document.getElementById('heroScroll')
    const onScroll  = () => {
      const prog = window.scrollY / (window.innerHeight * 0.5)
      if (contentEl) contentEl.style.opacity = Math.max(0, 1 - prog * 1.6)
      if (scrollEl)  scrollEl.style.opacity  = Math.max(0, 1 - prog * 2.5)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.appWrapper}>
      <CustomCursor />
      {introDone && <NavBar />}
      
      {!introDone && <IntroSequence onComplete={handleIntroComplete} />}

      <div className={`${styles.mainContent} ${introDone ? styles.revealed : ''} ${introOnMount ? styles.immediate : ''}`}>
        {/* ══════════════ HERO ══════════════ */}
        <section className={styles.hero} id="hero">

          <div className={styles.heroBgLayer}>
            {/* Background */}
            <div className={styles.heroBg}>
              <img
                ref={bgRef}
                src={bgImg}
                alt="Van Gogh Starry Night"
                className={styles.heroBgImg}
                id="heroBg"
              />
              <div className={styles.heroOverlay} />
            </div>

            {/* Twinkling particle dust */}
            <ParticleCanvas />

            {/* Moon + Star + Cypress Tree */}
            <FloatingElements
              moonRef={moonRef}
              starRef={starRef}
              treeRef={treeRef}
            />
          </div>

          {/* Text & CTAs */}
          <div ref={contentRef} style={{ position: 'relative', zIndex: 10 }}>
            <HeroContent />
          </div>

        </section>

        <SymposiumAbout />
        <CountdownSection />

        {/* ══════════════ ABOUT ══════════════ */}
        <AboutSection />
        
        <Footer />
      </div>
    </div>
  )
}
