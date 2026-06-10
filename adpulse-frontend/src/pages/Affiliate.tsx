import { useNavigate } from 'react-router-dom'
import styles from './Affiliate.module.css'

const HOW_IT_WORKS = [
  { step: '01', title: 'Sign Up Free', desc: 'Create your Ad-Pulse account and get your unique referral link instantly.' },
  { step: '02', title: 'Share Your Link', desc: 'Share your referral link on WhatsApp, social media, your website — anywhere.' },
  { step: '03', title: 'They Pay, You Earn', desc: 'When someone signs up and pays for a campaign using your link, you earn 15% commission.' },
  { step: '04', title: 'Withdraw via M-Pesa', desc: 'Withdraw your earnings anytime straight to M-Pesa. Minimum KES 500.' },
]

const TIERS = [
  { name: 'Starter', referrals: '1–5', commission: '10%', perCampaign: 'KES 200–800', badge: '🌱', color: 'var(--text-secondary)' },
  { name: 'Growth', referrals: '6–20', commission: '15%', perCampaign: 'KES 300–1,200', badge: '🚀', color: 'var(--pulse)', highlight: true },
  { name: 'Pro', referrals: '21+', commission: '20%', perCampaign: 'KES 400–1,600', badge: '💎', color: 'var(--electric)' },
]

export default function Affiliate() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.orb1} /><div className={styles.orb2} />

      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <span className={styles.logoDot} />Ad-Pulse
        </div>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Back to Home</button>
      </nav>

      <div className={styles.container}>
        {/* Hero */}
        <div className={styles.hero}>
          <span className={styles.sectionLabel}>Affiliate Program</span>
          <h1>Earn money by<br/>referring businesses</h1>
          <p>Share Ad-Pulse with your network. Earn up to <strong className={styles.highlight}>20% commission</strong> on every campaign they pay for. Withdraw straight to M-Pesa.</p>
          <div className={styles.heroCta}>
            <button className={styles.btnPulse} onClick={() => navigate('/register')}>
              Join Free & Get Your Link
            </button>
            <a href="https://wa.me/254732751315?text=Hi%20Ad-Pulse%2C%20I%20want%20to%20join%20the%20affiliate%20program" target="_blank" rel="noopener noreferrer" className={styles.btnWa}>
              💬 Ask on WhatsApp
            </a>
          </div>
        </div>

        {/* Earnings calculator */}
        <div className={styles.earningsBox}>
          <h3>💰 How much can you earn?</h3>
          <div className={styles.earningsGrid}>
            {[
              { referrals: '5 referrals/month', campaigns: '× KES 5,000 avg', rate: '× 15%', earn: 'KES 3,750/mo' },
              { referrals: '10 referrals/month', campaigns: '× KES 5,000 avg', rate: '× 15%', earn: 'KES 7,500/mo' },
              { referrals: '20 referrals/month', campaigns: '× KES 8,000 avg', rate: '× 20%', earn: 'KES 32,000/mo' },
            ].map((e, i) => (
              <div key={i} className={`${styles.earningCard} ${i === 2 ? styles.earningCardBest : ''}`}>
                {i === 2 && <span className={styles.bestBadge}>💎 Top Earner</span>}
                <div className={styles.earningRow}><span>{e.referrals}</span></div>
                <div className={styles.earningRow}><span>{e.campaigns}</span></div>
                <div className={styles.earningRow}><span className={styles.earningRate}>{e.rate}</span></div>
                <div className={styles.earningResult}>{e.earn}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className={styles.section}>
          <h2>How it works</h2>
          <div className={styles.steps}>
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>{s.step}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commission tiers */}
        <div className={styles.section}>
          <h2>Commission tiers</h2>
          <div className={styles.tiers}>
            {TIERS.map((t, i) => (
              <div key={i} className={`${styles.tier} ${t.highlight ? styles.tierHighlight : ''}`}>
                <div className={styles.tierBadge}>{t.badge}</div>
                <h3 style={{ color: t.color }}>{t.name}</h3>
                <div className={styles.tierCommission}>{t.commission}</div>
                <div className={styles.tierLabel}>commission</div>
                <div className={styles.tierDivider} />
                <div className={styles.tierStat}><span>Referrals</span><strong>{t.referrals}</strong></div>
                <div className={styles.tierStat}><span>Per campaign</span><strong>{t.perCampaign}</strong></div>
              </div>
            ))}
          </div>
        </div>

        {/* Who should join */}
        <div className={styles.whoSection}>
          <h2>Perfect for</h2>
          <div className={styles.whoGrid}>
            {[
              { icon: '📱', title: 'Social Media Influencers', desc: 'You have an audience of business owners — monetize it.' },
              { icon: '💼', title: 'Freelancers & Consultants', desc: 'Offer Ad-Pulse to your clients and earn recurring commission.' },
              { icon: '🎓', title: 'Students & Side Hustlers', desc: 'Earn real money by sharing a link — no experience needed.' },
              { icon: '🏢', title: 'Marketing Agencies', desc: 'White-label or refer clients. Earn passive income per campaign.' },
            ].map((w, i) => (
              <div key={i} className={styles.whoCard}>
                <span className={styles.whoIcon}>{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h2>Start earning today</h2>
          <p>Free to join. No approval needed. Your link is ready the moment you sign up.</p>
          <button className={styles.btnPulse} onClick={() => navigate('/register')}>
            Create Account & Get Your Link →
          </button>
        </div>
      </div>
    </div>
  )
}
