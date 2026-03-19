import styles from './FloatingElements.module.css'
import moonImg    from '/Moon PNG.png'
import starImg    from '/Star PNG.png'
import cypressImg from '/Cypress Tree PNG.png'

export default function FloatingElements ({ moonRef, starRef, treeRef }) {
  return (
    <div className={styles.layer} aria-hidden="true">

      {/* ── Moon ── slow clockwise rotation + gentle float */}
      <div className={styles.moon} ref={moonRef} id="moonEl">
        <div className={styles.moonGlow} />
        <img src={moonImg} alt="Van Gogh Moon" className={styles.moonImg} />
      </div>

      {/* ── Star ── counter-clockwise rotation + twinkle */}
      <div className={styles.star} ref={starRef} id="starEl">
        <div className={styles.starGlow} />
        <img src={starImg} alt="Van Gogh Star" className={styles.starImg} />
      </div>

      {/* ── Cypress Tree ── gentle sway at bottom */}
      <div className={styles.tree} ref={treeRef} id="treeEl">
        <img src={cypressImg} alt="Van Gogh Cypress Tree" className={styles.treeImg} />
      </div>

    </div>
  )
}
