import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('adpulse_cookies')
    if (!accepted) setTimeout(() => setVisible(true), 2000)
  }, [])

  const accept = () => { localStorage.setItem('adpulse_cookies', 'accepted'); setVisible(false) }
  const decline = () => { localStorage.setItem('adpulse_cookies', 'declined'); setVisible(false) }

  if (!visible) return null

  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.icon}>🍪</span>
          <div>
            <strong>We use cookies</strong>
            <p>We use cookies to improve your experience and analyse site traffic. By accepting, you agree to our <a href="#">Privacy Policy</a>.</p>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.decline} onClick={decline}>Decline</button>
          <button className={styles.accept} onClick={accept}>Accept All</button>
        </div>
      </div>
    </div>
  )
}
