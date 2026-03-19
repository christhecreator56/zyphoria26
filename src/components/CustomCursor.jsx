import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const blurRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blurX = mouseX;
    let blurY = mouseY;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.opacity = 1;
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (blurRef.current) {
        blurRef.current.style.opacity = 1;
      }

      const target = e.target;
      isHovering = !!(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('#moonEl') ||
        target.closest('#starEl')
      );

      if (blurRef.current) {
        if (isHovering) {
          blurRef.current.classList.add(styles.active);
        } else {
          blurRef.current.classList.remove(styles.active);
        }
      }
    };

    const animate = () => {
      const dx = mouseX - blurX;
      const dy = mouseY - blurY;
      
      blurX += dx * 0.15;
      blurY += dy * 0.15;

      // Only update DOM if the difference is noticeable to optimize CPU
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        if (blurRef.current) {
          blurRef.current.style.transform = `translate3d(${blurX}px, ${blurY}px, 0)`;
        }
      }

      raf = requestAnimationFrame(animate);
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = 0;
      if (blurRef.current) blurRef.current.style.opacity = 0;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    
    // Initial invisible until moved
    if (dotRef.current) dotRef.current.style.opacity = 0;
    if (blurRef.current) blurRef.current.style.opacity = 0;

    let raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className={styles.cursorBlur} ref={blurRef} />
      <div className={styles.cursorDot} ref={dotRef} />
    </>
  );
}
