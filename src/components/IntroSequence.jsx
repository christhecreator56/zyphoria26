import { useState, useEffect } from 'react';
import styles from './IntroSequence.module.css';

export default function IntroSequence({ onComplete }) {
  const [state, setState] = useState({ text1: false, text2: false });

  useEffect(() => {
    // Cinematic timings
    const t0 = setTimeout(() => setState({ text1: true, text2: false }), 400);   // Fade in Text 1
    const t1 = setTimeout(() => setState({ text1: false, text2: false }), 2600); // Fade out Text 1
    const t2 = setTimeout(() => setState({ text1: false, text2: true }), 3600);  // Fade in Text 2
    const t3 = setTimeout(() => setState({ text1: false, text2: false }), 5800); // Fade out Text 2
    const t4 = setTimeout(() => onComplete(), 6800);                             // Trigger circular mask reveal

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div className={styles.introContainer}>
      <div className={`${styles.textWrapper} ${state.text1 ? styles.visible : styles.hidden}`}>
        <h1 className={styles.rajalakshmi}>RAJALAKSHMI INSTITUTE OF TECHNOLOGY</h1>
      </div>
      <div className={`${styles.textWrapper} ${state.text2 ? styles.visible : styles.hidden}`}>
        <div className={styles.deptWrapper}>
          <h2 className={styles.department}>THE DEPARTMENT OF CSE</h2>
          <h3 className={styles.presents}>PRESENTS</h3>
        </div>
      </div>

      <img src={`${import.meta.env.BASE_URL}Star PNG.png`} alt="star" className={`${styles.star} ${styles.star1}`} />
      <img src={`${import.meta.env.BASE_URL}Star PNG.png`} alt="star" className={`${styles.star} ${styles.star2}`} />
      <img src={`${import.meta.env.BASE_URL}Star PNG.png`} alt="star" className={`${styles.star} ${styles.star3}`} />
    </div>
  );
}
