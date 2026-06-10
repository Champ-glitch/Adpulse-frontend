import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ROICalculator.module.css'

const PLATFORM_RATES: Record<string, { impressions: number; clicks: number; followers: number }> = {
  TikTok:     { impressions: 4200, clicks: 126, followers: 85 },
  Instagram:  { impressions: 3100, clicks: 93,  followers: 62 },
  Facebook:   { impressions: 5500, clicks: 110, followers: 45 },
  'Twitter/X':{ impressions: 2800, clicks: 84,  followers: 30 },
}

export default function ROICalculator() {
  const navigate = useNavigate()
  const [budget, setBudget] = useState(5000)
  const [platform, setPlatform] = useState('TikTok')
  const [calculated, setCalculated] = useState(false)

  const rate = PLATFORM_RATES[platform]
  const multiplier = budget / 1000
  const impressions = Math.round(rate.impressions * multiplier)
  const clicks = Math.round(rate.clicks * multiplier)
  const followers = Math.round(rate.followers * multiplier)
  const ctr = ((clicks / impressions) * 100).toFixed(1)

  return (
    <div className={styles.calc}>
      <div className={styles.calcHeader}>
        <span className={styles.calcBadge}>🧮 Free Tool</span>
        <h3>Campaign ROI Calculator</h3>
        <p>Estimate your reach before spending a single shilling</p>
      </div>

      <div className={styles.calcBody}>
        <div className={styles.inputGroup}>
          <label>Your Budget (KES)</label>
          <div className={styles.sliderWrap}>
            <input
              type="range" min={2000} max={50000} step={500}
              value={budget}
              onChange={e => { setBudget(Number(e.target.value)); setCalculated(true) }}
              className={styles.slider}
            />
            <div className={styles.sliderValue}>KES {budget.toLocaleString()}</div>
          </div>
          <div className={styles.sliderTicks}>
            <span>KES 2K</span><span>KES 25K</span><span>KES 50K</span>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Platform</label>
          <div className={styles.platformBtns}>
            {Object.keys(PLATFORM_RATES).map(p => (
              <button
                key={p}
                className={`${styles.platformBtn} ${platform === p ? styles.platformBtnActive : ''}`}
                onClick={() => { setPlatform(p); setCalculated(true) }}
              >{p}</button>
            ))}
          </div>
        </div>

        <div className={`${styles.results} ${calculated ? styles.resultsVisible : ''}`}>
          <div className={styles.resultCard}>
            <div className={styles.resultIcon}>👁️</div>
            <div className={styles.resultValue}>{impressions.toLocaleString()}</div>
            <div className={styles.resultLabel}>Est. Impressions</div>
          </div>
          <div className={styles.resultCard}>
            <div className={styles.resultIcon}>🖱️</div>
            <div className={styles.resultValue}>{clicks.toLocaleString()}</div>
            <div className={styles.resultLabel}>Est. Clicks</div>
          </div>
          <div className={styles.resultCard}>
            <div className={styles.resultIcon}>📈</div>
            <div className={styles.resultValue}>{ctr}%</div>
            <div className={styles.resultLabel}>Est. CTR</div>
          </div>
          <div className={styles.resultCard}>
            <div className={styles.resultIcon}>👥</div>
            <div className={styles.resultValue}>{followers.toLocaleString()}</div>
            <div className={styles.resultLabel}>Est. New Followers</div>
          </div>
        </div>

        <p className={styles.calcDisclaimer}>* Estimates based on average campaign performance. Actual results may vary.</p>

        <button className={styles.calcCta} onClick={() => navigate('/register')}>
          Launch This Campaign →
        </button>
      </div>
    </div>
  )
}
