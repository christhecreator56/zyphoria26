import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Monitor, Palette, ArrowRight } from 'lucide-react'
import styles from './EventsPage.module.css'
import CustomCursor from './CustomCursor'
import Footer from './Footer'

const technicalEvents = [
  { id: 't1', title: 'Reverse Engineering', desc: 'Decode software or logic puzzles to uncover hidden functionality.' },
  { id: 't2', title: 'AI Prompt Battle', desc: 'Craft effective AI prompts to solve challenges using generative AI tools.' },
  { id: 't3', title: 'UI/UX Redesign', desc: 'Redesign an app or website interface to improve usability and aesthetics.' },
  { id: 't4', title: 'Tech Treasure Hunt', desc: 'Solve technical clues and puzzles scattered across campus.' },
  { id: 't5', title: 'Research Pitch', desc: 'Present compelling research ideas to an expert panel of judges.' },
  { id: 't6', title: 'Startup in 60 Min', desc: 'Conceptually pitch a business model and strategy in exactly one hour.' },
  { id: 't7', title: 'Bug Hunt', desc: 'Find and precisely fix critical bugs in code snippets across intense technical rounds.' },
]

const nonTechnicalEvents = [
  { id: 'n1', title: 'Engineering Standup', desc: 'Step up to the mic and show off your unique humor and wit to the crowd.' },
  { id: 'n2', title: 'Tech Meme War', desc: 'Create the most engaging, hilarious, and relatable tech memes.' },
  { id: 'n3', title: 'Mystery Box Innovation', desc: 'Work under pressure to build something highly creative using random surprise items.' },
  { id: 'n4', title: 'Reel Making', desc: 'Produce an aesthetic and engaging short video showcasing your editing skills.' },
  { id: 'n5', title: 'Dum Charades (Tech)', desc: 'A tech-flavored twist on the classic game of charades.' },
  { id: 'n6', title: 'E-Sports Arena', desc: 'Compete against top players from various colleges in intense multiplier gaming sessions.' },
  { id: 'n7', title: 'Useless Product Marketing', desc: 'Use your absolute best sales tactics to pitch an intentionally terrible product to judges.' },
]

// The new sleek Animated Accordion Strip
function EventStrip({ event }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`${styles.eventStrip} ${isOpen ? styles.isOpen : ''}`} 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.stripHeader}>
        <h4 className={styles.stripTitle}>{event.title}</h4>
        <div className={styles.stripToggle}>
          <div className={styles.toggleLine1}></div>
          <div className={styles.toggleLine2}></div>
        </div>
      </div>
      
      <div className={styles.stripBody}>
        <div className={styles.stripBodyInner}>
          <p className={styles.stripDesc}>{event.desc}</p>
          <button 
             className={styles.stripCta} 
             onClick={(e) => {
               e.stopPropagation();
               const formTarget = document.getElementById('regForm');
               if(formTarget) {
                 formTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
               }
             }}
          >
             Select & Register <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('tech');
  
  useEffect(() => {
    // Basic trick to ensure we start at the top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.wrapper}>
      <CustomCursor />
      
      {/* Background layer blur to dim the starry night */}
      <div className={styles.bgFilter}></div>

      <nav className={styles.glassNav}>
        <Link to="/" className={styles.navLink}>← Home</Link>
      </nav>

      <div className={styles.splitLayout}>
        
        {/* ================= LEFT PANE (Registration & Info) ================= */}
        <div className={styles.leftPane}>
          <div className={styles.headerInfo}>
            <h1 className={styles.splitTitle}>Zyphoria '26</h1>
            <p className={styles.splitSubtitle}>Browse Events & Register</p>
          </div>

          <form id="regForm" className={styles.regForm} onSubmit={e => e.preventDefault()}>
            <h3 className={styles.formTitle}>Team Registration</h3>
            
            <div className={styles.formGroup}>
              <label>Team Name</label>
              <input type="text" placeholder="Your awesome team name" required />
            </div>

            <div className={styles.formGroup}>
              <label>Team Leader Name</label>
              <input type="text" placeholder="Leader's Name" required />
            </div>

            <div className={styles.formGroup}>
              <label>Leader Email / Phone</label>
              <input type="text" placeholder="Contact Details" required />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Participant 2 Name</label>
                <input type="text" required />
              </div>
              <div className={styles.formGroup}>
                <label>Participant 3 Name</label>
                <input type="text" required />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Select 1 Technical Event</label>
              <select required>
                <option value="">-- Choose Tech Event --</option>
                {technicalEvents.map(e => <option key={e.id}>{e.title}</option>)}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Select 1 Non-Technical Event</label>
              <select required>
                <option value="">-- Choose Non-Tech Event --</option>
                {nonTechnicalEvents.map(e => <option key={e.id}>{e.title}</option>)}
              </select>
            </div>
            
            <button className={styles.submitBtn}>
              Pay ₹150 & Register
            </button>
          </form>
        </div>

        {/* ================= RIGHT PANE (Accordion Strip List) ================= */}
        <div className={styles.rightPane}>
          
          <div className={styles.tabContainer}>
             <button 
                className={`${styles.tabBtn} ${activeTab === 'tech' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('tech')}
             >
                <Monitor size={20} strokeWidth={2} /> Technical (15 Apr)
             </button>
             <button 
                className={`${styles.tabBtn} ${activeTab === 'nontech' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('nontech')}
             >
                <Palette size={20} strokeWidth={2} /> Non-Tech (16 Apr)
             </button>
          </div>

          <div className={styles.cardsScrollArea}>
            <div className={styles.eventListContainer}>
              {activeTab === 'tech' 
                ? technicalEvents.map(ev => <EventStrip key={ev.id} event={ev} />)
                : nonTechnicalEvents.map(ev => <EventStrip key={ev.id} event={ev} />)
              }
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  )
}
