import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ExitPopup.module.css'

export default function ExitPopup() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const dismissed = sessionStorage.getItem('adpulse_exit_popup')
    if (dismissed) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        setVisible(true)
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    // Also show on mobile after 30 seconds of scrolling
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('adpulse_exit_popup')) {
        setVisible(true)
      }
    }, 30000)

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('adpulse_exit_popup', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.overlay} onClick={dismiss}>
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={dismiss}>✕</button>
        <div className={styles.badge}>🎁 Limited Offer</div>
        <h2>Wait — before you go!</h2>
        <p>Get <strong className={styles.highlight}>20% more reach</strong> on your first campaign when you sign up today.</p>
        <div className={styles.offer}>
          <div className={styles.offerItem}>
            <span>✓</span> Free campaign review
          </div>
          <div className={styles.offerItem}>
            <span>✓</span> Priority 12-hour launch
          </div>
          <div className={styles.offerItem}>
            <span>✓</span> Bonus reach on first campaign
          </div>
        </div>
        <button className={styles.cta} onClick={() => { dismiss(); navigate('/register') }}>
          Claim My Offer →
        </button>
        <button className={styles.skip} onClick={dismiss}>No thanks, I'll pass</button>
      </div>
    </div>
  )
}
