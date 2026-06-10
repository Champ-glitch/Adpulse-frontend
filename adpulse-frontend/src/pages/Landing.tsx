import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Landing.module.css'
import ROICalculator from '../components/ROICalculator'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CookieBanner from '../components/CookieBanner'
import ExitPopup from '../components/ExitPopup'
import { LiveVisitors, PromoCountdown } from '../components/LiveBadges'

const PLATFORMS = ['TikTok', 'Instagram', 'Facebook', 'Twitter/X']
const WA_NUMBER = '254732751315' // Airtel WhatsApp Business
const WA_LINK = `https://wa.me/${WA_NUMBER}`

const STATS = [
  { value: '12K+', label: 'Impressions Delivered' },
  { value: '38', label: 'Campaigns Run' },
  { value: '96%', label: 'Client Satisfaction' },
  { value: '24h', label: 'Campaign Go-Live' },
]

const PARTNERS = ['TikTok', 'Meta', 'Instagram', 'Facebook', 'Twitter/X', 'WhatsApp Business', 'Safaricom', 'Airtel']

export default function Landing() {
  const navigate = useNavigate()
  const [activePlatform, setActivePlatform] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setActivePlatform(p => (p + 1) % PLATFORMS.length), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.page}>
      <ExitPopup />
      <CookieBanner />
      <div className={styles.orb1} /><div className={styles.orb2} /><div className={styles.orb3} />

      {/* Promo bar */}
      <div className={styles.promoBar}>
        🎉 Launch special — Get 20% extra reach on your first campaign.
        <button className={styles.promoBtn} onClick={() => navigate('/register')}>Claim Now →</button>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => window.scrollTo(0,0)}>
          <span className={styles.logoDot} />Ad-Pulse
        </div>
        <div className={styles.navLinks}>
          <a href="#services">Services</a>
          <a href="#calculator">Calculator</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
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
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#calculator" onClick={() => setMenuOpen(false)}>ROI Calculator</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <div className={styles.mobileMenuActions}>
            <button className={styles.btnGhost} onClick={() => { navigate('/login'); setMenuOpen(false) }}>Sign in</button>
            <button className={styles.btnPulse} onClick={() => { navigate('/register'); setMenuOpen(false) }}>Get Started</button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          Nairobi-based · Serving clients across Africa &amp; worldwide
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
          Run ads and grow your social media presence across TikTok, Instagram, Facebook & Twitter/X.
          Pay with M-Pesa or crypto. Go live in 24 hours.
        </p>
        <div className={styles.heroCta}>
          <button className={styles.btnPulseLg} onClick={() => navigate('/register')}>
            Start Your Campaign
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button className={styles.btnGhostLg} onClick={() => navigate('/login')}>Sign In</button>
        </div>
        <div className={styles.heroLive}>
          <LiveVisitors />
          <PromoCountdown />
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

      {/* Scrolling partners bar */}
      <div className={styles.partnersBar}>
        <div className={styles.partnersTrack}>
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span key={i} className={styles.partnerItem}>{p}</span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className={styles.servicesSection} id="services">
        <div className={styles.sectionLabel}>What We Offer</div>
        <h2 className={styles.sectionTitle}>Two powerful ways<br/>to grow your brand</h2>
        <div className={styles.serviceCards}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap} style={{ background: 'rgba(232,255,71,0.08)', border: '1px solid rgba(232,255,71,0.15)' }}>
              <span style={{ fontSize: '2rem' }}>📢</span>
            </div>
            <h3>Paid Advertising</h3>
            <p>Run targeted ad campaigns across TikTok, Instagram, Facebook and Twitter/X. Set your budget, upload your creative, and we handle the rest.</p>
            <ul className={styles.serviceFeatures}>
              <li>✓ Image, video & text ads</li>
              <li>✓ Audience targeting by age, location & interests</li>
              <li>✓ Real-time performance dashboard</li>
              <li>✓ Campaigns from KES 2,000</li>
            </ul>
            <button className={styles.btnPulse} onClick={() => navigate('/register')}>Run Ads →</button>
          </div>
          <div className={`${styles.serviceCard} ${styles.serviceCardHighlight}`}>
            <div className={styles.servicePopular}>Most Popular</div>
            <div className={styles.serviceIconWrap} style={{ background: 'rgba(77,255,212,0.08)', border: '1px solid rgba(77,255,212,0.15)' }}>
              <span style={{ fontSize: '2rem' }}>🚀</span>
            </div>
            <h3>Social Media Boosting</h3>
            <p>Grow your followers, likes, views and engagement organically across TikTok, Instagram and Facebook. Real growth, not bots.</p>
            <ul className={styles.serviceFeatures}>
              <li>✓ TikTok followers, views & likes</li>
              <li>✓ Instagram followers & likes</li>
              <li>✓ Facebook page likes & reach</li>
              <li>✓ Custom packages — ask for quote</li>
            </ul>
            <a href={`${WA_LINK}?text=Hi%20Ad-Pulse%2C%20I%20want%20a%20social%20media%20boosting%20quote`} target="_blank" rel="noopener noreferrer" className={styles.btnElectricLink}>Get a Quote →</a>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className={styles.platformsSection} id="platforms">
        <div className={styles.sectionLabel}>Platforms</div>
        <h2 className={styles.sectionTitle}>Everywhere your<br/>audience lives</h2>
        <div className={styles.platformCards}>
          {[
            { name: 'TikTok', color: '#ff0050', desc: 'Viral video ads + follower growth', icon: '🎵', tag: 'Ads + Boost' },
            { name: 'Instagram', color: '#e1306c', desc: 'Stories, Reels, Feed & growth', icon: '📸', tag: 'Ads + Boost' },
            { name: 'Facebook', color: '#1877f2', desc: 'Largest reach across all ages', icon: '👥', tag: 'Ads + Boost' },
            { name: 'Twitter/X', color: '#1da1f2', desc: 'Real-time trends & conversations', icon: '🐦', tag: 'Ads' },
          ].map((p, i) => (
            <div key={i} className={styles.platformCard} style={{ '--accent': p.color } as React.CSSProperties}>
              <div className={styles.platformIcon}>{p.icon}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <span className={styles.platformTag}>{p.tag}</span>
              <div className={styles.platformGlow} />
            </div>
          ))}
        </div>
      </section>

      {/* ROI Calculator */}
      <section className={styles.calcSection} id="calculator">
        <div className={styles.sectionLabel}>Free Tool</div>
        <h2 className={styles.sectionTitle}>Calculate your<br/>estimated reach</h2>
        <ROICalculator />
      </section>

      {/* How it works */}
      <section className={styles.howSection} id="how">
        <div className={styles.sectionLabel}>Process</div>
        <h2 className={styles.sectionTitle}>From signup to results<br/>in 4 simple steps</h2>
        <div className={styles.steps}>
          {[
            { step: '01', title: 'Create Your Account', desc: 'Sign up with your email and phone. Takes under a minute.' },
            { step: '02', title: 'Choose Your Service', desc: 'Pick paid ads or social media boosting. Set your budget and targets.' },
            { step: '03', title: 'Pay Securely', desc: 'Pay via M-Pesa STK Push or crypto. Instant confirmation on your phone.' },
            { step: '04', title: 'Watch Results Roll In', desc: 'Track real-time impressions, clicks, followers and engagement on your dashboard.' },
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

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionLabel}>Client Stories</div>
        <h2 className={styles.sectionTitle}>Real results from<br/>real businesses</h2>
        <Testimonials />
      </section>

      {/* Pricing */}
      <section className={styles.pricingSection} id="pricing">
        <div className={styles.sectionLabel}>Ad Campaign Pricing</div>
        <h2 className={styles.sectionTitle}>Transparent pricing,<br/>no hidden fees</h2>
        <div className={styles.pricingCards}>
          {[
            { name: 'Starter', price: 'KES 2,000', usd: '~$15', desc: 'Test the waters with your first campaign', features: ['1 Platform', 'Up to 5K impressions', 'Image ads', 'Basic analytics', '7-day campaign'], highlight: false },
            { name: 'Growth', price: 'KES 8,000', usd: '~$60', desc: 'Scale across multiple channels', features: ['3 Platforms', 'Up to 50K impressions', 'Image & video ads', 'Real-time analytics', '30-day campaign', 'Priority support'], highlight: true },
            { name: 'Scale', price: 'KES 20,000', usd: '~$150', desc: 'Full power for serious advertisers', features: ['All 4 Platforms', 'Up to 200K impressions', 'All ad types', 'Advanced analytics', '60-day campaign', 'Dedicated manager'], highlight: false },
          ].map((p, i) => (
            <div key={i} className={`${styles.pricingCard} ${p.highlight ? styles.pricingHighlight : ''}`}>
              {p.highlight && <div className={styles.popularBadge}>Most Popular</div>}
              <h3>{p.name}</h3>
              <div className={styles.price}>
                <span className={styles.priceMain}>{p.price}</span>
                <span className={styles.priceAlt}>{p.usd}</span>
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
              <button className={p.highlight ? styles.btnPulse : styles.btnGhost} onClick={() => navigate('/register')}>Get Started</button>
            </div>
          ))}
        </div>
        <div className={styles.boostNote}>
          <span>🚀</span>
          <div>
            <strong>Social Media Boosting pricing is custom</strong>
            <p>Pricing depends on platform, quantity and delivery speed. Contact us for a quote.</p>
          </div>
          <a href={`${WA_LINK}?text=Hi%20Ad-Pulse%2C%20I%20need%20a%20social%20media%20boosting%20quote`} target="_blank" rel="noopener noreferrer" className={styles.btnElectricSm}>Get Quote</a>
        </div>
        <p className={styles.pricingNote}>* Custom ad budgets also accepted. Pay exactly what you want to spend.</p>
      </section>

      {/* Why Us */}
      <section className={styles.whySection}>
        <div className={styles.sectionLabel}>Why Ad-Pulse</div>
        <h2 className={styles.sectionTitle}>Built different,<br/>built for Africa</h2>
        <div className={styles.whyGrid}>
          {[
            { icon: '📱', title: 'M-Pesa Native', desc: 'Pay directly with M-Pesa. No card, no bank account needed. STK push straight to your phone.' },
            { icon: '₿', title: 'Crypto Accepted', desc: 'International clients pay with USDT, BTC, ETH and 50+ coins. No friction.' },
            { icon: '⚡', title: '24h Go-Live', desc: 'Your campaign is reviewed and launched within 24 hours of payment. No waiting weeks.' },
            { icon: '📊', title: 'Real-Time Dashboard', desc: 'Watch impressions, clicks and spend update live. Full transparency, always.' },
            { icon: '🇰🇪', title: 'Kenya-Based Team', desc: 'We understand the East African market. Local knowledge, global reach.' },
            { icon: '💬', title: 'WhatsApp Support', desc: 'Real human support via WhatsApp. We respond within minutes, not days.' },
          ].map((w, i) => (
            <div key={i} className={styles.whyCard}>
              <div className={styles.whyIcon}>{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pay section */}
      <section className={styles.paySection}>
        <h2 className={styles.sectionTitle}>Pay your way</h2>
        <div className={styles.payMethods}>
          <div className={styles.payCard}>
            <div className={styles.payIcon}>📱</div>
            <h3>M-Pesa</h3>
            <p>Instant STK push to your Safaricom or Airtel number. No card needed.</p>
          </div>
          <div className={styles.payDivider}>or</div>
          <div className={styles.payCard}>
            <div className={styles.payIcon}>₿</div>
            <h3>Cryptocurrency</h3>
            <p>USDT, BTC, ETH and 50+ coins via secure payment gateway. For international clients.</p>
          </div>
        </div>
      </section>

      {/* WhatsApp Support section */}
      <section className={styles.supportSection}>
        <div className={styles.supportCard}>
          <div className={styles.supportLeft}>
            <div className={styles.supportIconWrap}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div>
              <h3>Need help? Chat with us instantly</h3>
              <p>Get a quote, ask questions or get support via WhatsApp. We respond within minutes.</p>
            </div>
          </div>
          <a href={`${WA_LINK}?text=Hi%20Ad-Pulse%2C%20I%20need%20help%20with`} target="_blank" rel="noopener noreferrer" className={styles.btnWhatsapp}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection} id="faq">
        <div className={styles.sectionLabel}>FAQ</div>
        <h2 className={styles.sectionTitle}>Questions? We've got<br/>answers</h2>
        <FAQ />
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaPulse} />
          <h2>Ready to make your<br/>brand pulse?</h2>
          <p>Join businesses already growing with Ad-Pulse</p>
          <div className={styles.ctaButtons}>
            <button className={styles.btnPulseLg} onClick={() => navigate('/register')}>
              Launch Your Campaign
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <a href={`${WA_LINK}?text=Hi%20Ad-Pulse%2C%20I%20want%20to%20boost%20my%20social%20media`} target="_blank" rel="noopener noreferrer" className={styles.btnElectricLg}>
              Boost My Socials 🚀
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <span className={styles.logoDot} />Ad-Pulse
            </div>
            <p>The pulse of your advertising.<br/>Built in Nairobi, Kenya 🇰🇪</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className={styles.footerWa}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              +254 732 751 315
            </a>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h4>Services</h4>
              <a href="#services">Paid Advertising</a>
              <a href="#services">Social Boosting</a>
              <a href="#pricing">Pricing</a>
              <a href="#calculator">ROI Calculator</a>
            </div>
            <div className={styles.footerCol}>
              <h4>Account</h4>
              <a onClick={() => navigate('/register')}>Sign Up</a>
              <a onClick={() => navigate('/login')}>Sign In</a>
              <a onClick={() => navigate('/dashboard')}>Dashboard</a>
            </div>
            <div className={styles.footerCol}>
              <h4>Contact</h4>
              <a href="mailto:anthonymwangangi4@gmail.com">Email Us</a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 Ad-Pulse.pro · All rights reserved</p>
          <div className={styles.footerBottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <a href={`${WA_LINK}?text=Hi%20Ad-Pulse%2C%20I%20need%20help`} target="_blank" rel="noopener noreferrer" className={styles.whatsappFloat} aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <div className={styles.whatsappTooltip}>Chat with us on WhatsApp</div>
    </div>
  )
}
