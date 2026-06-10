import { useState, useEffect } from 'react'
import styles from './LiveBadges.module.css'

// Fake-realistic visitor count that fluctuates
function useVisitorCount() {
  const [count, setCount] = useState(7)
  useEffect(() => {
    const t = setInterval(() => {
      setCount(c => {
        const delta = Math.random() > 0.5 ? 1 : -1
        return Math.max(4, Math.min(18, c + delta))
      })
    }, 4000)
    return () => clearInterval(t)
  }, [])
  return count
}

// Countdown to end of promo (24h rolling)
function useCountdown() {
  const getEnd = () => {
    const stored = localStorage.getItem('adpulse_promo_end')
    if (stored) return Number(stored)
    const end = Date.now() + 24 * 60 * 60 * 1000
    localStorage.setItem('adpulse_promo_end', String(end))
    return end
  }
  const [timeLeft, setTimeLeft] = useState(getEnd() - Date.now())
  useEffect(() => {
    const t = setInterval(() => {
      const left = getEnd() - Date.now()
      if (left <= 0) {
        localStorage.removeItem('adpulse_promo_end')
        setTimeLeft(24 * 60 * 60 * 1000)
      } else {
        setTimeLeft(left)
      }
    }, 1000)
    return () => clearInterval(t)
  }, [])
  const h = Math.floor(timeLeft / 3600000)
  const m = Math.floor((timeLeft % 3600000) / 60000)
  const s = Math.floor((timeLeft % 60000) / 1000)
  return { h, m, s }
}

export function LiveVisitors() {
  const count = useVisitorCount()
  return (
    <div className={styles.visitors}>
      <span className={styles.liveDot} />
      <span><strong>{count}</strong> people viewing this page right now</span>
    </div>
  )
}

export function PromoCountdown() {
  const { h, m, s } = useCountdown()
  return (
    <div className={styles.countdown}>
      <span className={styles.countdownLabel}>🔥 Launch offer ends in</span>
      <div className={styles.timer}>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{String(h).padStart(2,'0')}</span>
          <span className={styles.timeLabel}>hrs</span>
        </div>
        <span className={styles.timeSep}>:</span>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{String(m).padStart(2,'0')}</span>
          <span className={styles.timeLabel}>min</span>
        </div>
        <span className={styles.timeSep}>:</span>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>{String(s).padStart(2,'0')}</span>
          <span className={styles.timeLabel}>sec</span>
        </div>
      </div>
    </div>
  )
}
