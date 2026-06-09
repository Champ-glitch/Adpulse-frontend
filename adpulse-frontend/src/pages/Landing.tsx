import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Landing.module.css'

const PLATFORMS = ['TikTok', 'Instagram', 'Facebook', 'Twitter/X']
const STATS = [
  { value: '2.4M+', label: 'Impressions Delivered' },
  { value: '340+', label: 'Active Campaigns' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24h', label: 'Campaign Go-Live' },
]

export default function Landing() {
  const navigate = useNavigate()
  const [activePlatform, setActivePlatform] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlatform(p => (p + 1) % PLATFORMS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.page}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span className={styles.logoDot} />
          Ad-Pulse
        </div>
        <div className={styles.navLinks}>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#platforms">Platforms</a>
        </div>
        <div className={styles.navActions}>
          <button className={styles.btnGhost} onClick={() => navigate('/login')}>Sign in</button>
          <button className={styles.btnPulse} onClick={() => navigate('/register')}>Get Started</button>
        </div>
        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#platforms" onClick={() => setMenuOpen(false)}>Platforms</a>
          <button className={styles.btnPulse} onClick={() => navigate('/register')}>Get Started</button>
        </div>
      )}

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          Now live — M-Pesa & Crypto payments accepted
        </div>

        <h1 className={styles.heroTitle}>
          The pulse of your
          <br />
          <span className={styles.platformCycle}>
            <span key={activePlatform} className={styles.platformWord}>{PLATFORMS[activePlatform]}</span>
          </span>
          <br />
          <span className={styles.heroSub}>advertising.</span>
        </h1>

        <p className={styles.heroDesc}>
          Launch powerful ad campaigns across TikTok, Instagram, Facebook & Twitter/X.
          Pay with M-Pesa or crypto. Go live in 24 hours.
        </p>

        <div className={styles.heroCta}>
          <button className={styles.btnPulseLg} onClick={() => navigate('/register')}>
            Start Your Campaign
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className={styles.btnGhostLg} onClick={() => navigate('/login')}>
            View Dashboard
          </button>
        </div>

        <div className={styles.heroStats}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className={styles.platformsSection} id="platforms">
        <div className={styles.sectionLabel}>Platforms</div>
        <h2 className={styles.sectionTitle}>Run everywhere<br/>your audience lives</h2>
        <div className={styles.platformCards}>
          {[
            { name: 'TikTok', color: '#ff0050', desc: 'Reach Gen Z with viral video ads', icon: '🎵' },
            { name: 'Instagram', color: '#e1306c', desc: 'Stories, Reels & Feed placements', icon: '📸' },
            { name: 'Facebook', color: '#1877f2', desc: 'Largest reach across all ages', icon: '👥' },
            { name: 'Twitter/X', color: '#1da1f2', desc: 'Real-time conversations & trends', icon: '🐦' },
          ].map((p, i) => (
            <div key={i} className={styles.platformCard} style={{ '--accent': p.color } as React.CSSProperties}>
              <div className={styles.platformIcon}>{p.icon}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className={styles.platformGlow} />
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className={styles.howSection} id="how">
        <div className={styles.sectionLabel}>Process</div>
        <h2 className={styles.sectionTitle}>From idea to<br/>impressions in 4 steps</h2>
        <div className={styles.steps}>
          {[
            { step: '01', title: 'Create Account', desc: 'Sign up with your email and phone number. Takes 30 seconds.' },
            { step: '02', title: 'Build Campaign', desc: 'Upload your creative, set budget, pick platforms & target audience.' },
            { step: '03', title: 'Pay & Confirm', desc: 'Pay via M-Pesa or crypto. Get instant confirmation.' },
            { step: '04', title: 'Track Results', desc: 'Watch real-time impressions, clicks and spend on your dashboard.' },
          ].map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNumber}>{s.step}</div>
              <div className={styles.stepContent}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {i < 3 && <div className={styles.stepConnector} />}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricingSection} id="pricing">
        <div className={styles.sectionLabel}>Pricing</div>
        <h2 className={styles.sectionTitle}>Simple, transparent<br/>pricing</h2>
        <div className={styles.pricingCards}>
          {[
            { name: 'Starter', price: 'KES 2,000', usd: '$15', desc: 'Perfect for small businesses testing the waters', features: ['1 Platform', 'Up to 50K impressions', 'Image ads', 'Basic analytics', '7-day campaign'] },
            { name: 'Growth', price: 'KES 8,000', usd: '$60', desc: 'Scale your brand across multiple channels', features: ['3 Platforms', 'Up to 500K impressions', 'Image & video ads', 'Real-time analytics', '30-day campaign', 'Priority support'], highlight: true },
            { name: 'Scale', price: 'KES 25,000', usd: '$185', desc: 'Full power for serious advertisers', features: ['All 4 Platforms', 'Unlimited impressions', 'All ad types', 'Advanced analytics', '60-day campaign', 'Dedicated manager'] },
          ].map((p, i) => (
            <div key={i} className={`${styles.pricingCard} ${p.highlight ? styles.pricingHighlight : ''}`}>
              {p.highlight && <div className={styles.popularBadge}>Most Popular</div>}
              <h3>{p.name}</h3>
              <div className={styles.price}>
                <span className={styles.priceMain}>{p.price}</span>
                <span className={styles.priceAlt}>≈ {p.usd}</span>
              </div>
              <p className={styles.pricingDesc}>{p.desc}</p>
              <ul className={styles.featureList}>
                {p.features.map((f, j) => (
                  <li key={j}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={p.highlight ? styles.btnPulse : styles.btnGhost} onClick={() => navigate('/register')}>
                Get Started
              </button>
            </div>
          ))}
        </div>
        <p className={styles.pricingNote}>* Custom budgets also accepted. Pay exactly what you want to spend.</p>
      </section>

      {/* Payment methods */}
      <section className={styles.paySection}>
        <h2 className={styles.sectionTitle}>Pay your way</h2>
        <div className={styles.payMethods}>
          <div className={styles.payCard}>
            <div className={styles.payIcon}>📱</div>
            <h3>M-Pesa</h3>
            <p>Instant STK push directly to your phone. No card needed.</p>
          </div>
          <div className={styles.payDivider}>or</div>
          <div className={styles.payCard}>
            <div className={styles.payIcon}>₿</div>
            <h3>Cryptocurrency</h3>
            <p>USDT, BTC, ETH and 50+ coins via secure payment gateway.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaPulse} />
          <h2>Ready to make your<br/>brand pulse?</h2>
          <p>Join hundreds of businesses already growing with Ad-Pulse</p>
          <button className={styles.btnPulseLg} onClick={() => navigate('/register')}>
            Launch Your First Campaign
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <span className={styles.logoDot} />
          Ad-Pulse
        </div>
        <p>© 2024 Ad-Pulse.pro · Built in Nairobi 🇰🇪</p>
        <div className={styles.footerLinks}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  )
}
