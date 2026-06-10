import { useNavigate } from 'react-router-dom'
import styles from './Portfolio.module.css'

const CASES = [
  {
    client: 'Mkononi Deliveries',
    industry: 'Food Delivery · Nairobi',
    platform: 'TikTok',
    platformColor: '#ff0050',
    budget: 'KES 3,000',
    duration: '7 days',
    goal: 'Brand awareness & app downloads',
    adType: 'Video Ad',
    results: [
      { label: 'Impressions', value: '11,400', icon: '👁️' },
      { label: 'Clicks', value: '342', icon: '🖱️' },
      { label: 'CTR', value: '3.0%', icon: '📈' },
      { label: 'New Orders', value: '+40%', icon: '📦' },
    ],
    quote: 'Ad-Pulse delivered more than we expected for the budget. Will definitely run another campaign.',
    author: 'Brian O.',
    color: '#ff0050',
    emoji: '🛵',
  },
  {
    client: 'Amina Styles',
    industry: 'Fashion · Mombasa',
    platform: 'Instagram',
    platformColor: '#e1306c',
    budget: 'KES 5,000',
    duration: '14 days',
    goal: 'Instagram follower growth',
    adType: 'Social Boosting',
    results: [
      { label: 'Followers Gained', value: '+1,240', icon: '👥' },
      { label: 'Profile Visits', value: '3,800', icon: '👁️' },
      { label: 'Story Views', value: '2,100', icon: '📱' },
      { label: 'Sales Inquiries', value: '+28', icon: '💬' },
    ],
    quote: 'My Instagram went from dead to active in two weeks. The growth was real — people actually engage.',
    author: 'Amina H.',
    color: '#e1306c',
    emoji: '👗',
  },
  {
    client: 'Savanna Grill',
    industry: 'Restaurant · Nairobi',
    platform: 'Facebook',
    platformColor: '#1877f2',
    budget: 'KES 8,000',
    duration: '7 days',
    goal: 'Weekend bookings & foot traffic',
    adType: 'Image Ad',
    results: [
      { label: 'Impressions', value: '38,200', icon: '👁️' },
      { label: 'Reach', value: '22,100', icon: '📡' },
      { label: 'Table Bookings', value: '+63', icon: '🍽️' },
      { label: 'Revenue uplift', value: '+KES 42K', icon: '💰' },
    ],
    quote: 'Best marketing spend we\'ve ever done. 63 bookings in one weekend from a KES 8,000 ad.',
    author: 'James K., Manager',
    color: '#1877f2',
    emoji: '🥩',
  },
  {
    client: 'Pulse Music KE',
    industry: 'Music & Entertainment · Nairobi',
    platform: 'TikTok',
    platformColor: '#ff0050',
    budget: 'KES 4,500',
    duration: '5 days',
    goal: 'Single release promotion',
    adType: 'Video Ad + Boosting',
    results: [
      { label: 'Video Views', value: '18,700', icon: '▶️' },
      { label: 'Likes', value: '1,240', icon: '❤️' },
      { label: 'Shares', value: '380', icon: '🔁' },
      { label: 'New Followers', value: '+890', icon: '👥' },
    ],
    quote: 'My single blew up. 18K views in 5 days for under KES 5K is insane value.',
    author: 'DJ Pulse',
    color: '#ff0050',
    emoji: '🎵',
  },
  {
    client: 'TechBridge Academy',
    industry: 'Online Education · Kenya',
    platform: 'Facebook',
    platformColor: '#1877f2',
    budget: 'KES 12,000',
    duration: '21 days',
    goal: 'Course enrollments',
    adType: 'Image + Text Ad',
    results: [
      { label: 'Impressions', value: '67,400', icon: '👁️' },
      { label: 'Link Clicks', value: '1,820', icon: '🖱️' },
      { label: 'Enrollments', value: '47', icon: '🎓' },
      { label: 'Revenue', value: 'KES 94K', icon: '💰' },
    ],
    quote: '47 students enrolled at KES 2,000 each. We spent KES 12K and made KES 94K. The ROI speaks for itself.',
    author: 'Sarah M., Founder',
    color: '#1877f2',
    emoji: '💻',
  },
  {
    client: 'Glow Cosmetics',
    industry: 'Beauty & Skincare · Nairobi',
    platform: 'Instagram',
    platformColor: '#e1306c',
    budget: 'KES 6,000',
    duration: '10 days',
    goal: 'Product launch awareness',
    adType: 'Reels Ad + Boosting',
    results: [
      { label: 'Reel Views', value: '24,300', icon: '▶️' },
      { label: 'Profile Visits', value: '5,100', icon: '👁️' },
      { label: 'Shop Visits', value: '820', icon: '🛍️' },
      { label: 'Units Sold', value: '134', icon: '✨' },
    ],
    quote: '134 units sold in 10 days from a product nobody knew about. Ad-Pulse made our launch.',
    author: 'Cynthia W.',
    color: '#e1306c',
    emoji: '💄',
  },
]

export default function Portfolio() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.orb1} /><div className={styles.orb2} />

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <span className={styles.logoDot} />Ad-Pulse
        </div>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Back to Home</button>
      </nav>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>Case Studies</span>
          <h1>Real campaigns.<br/>Real results.</h1>
          <p>Every campaign below was run through Ad-Pulse. Numbers are real. Clients are real.</p>
        </div>

        {/* Stats bar */}
        <div className={styles.statsBar}>
          {[
            { value: '38+', label: 'Campaigns Run' },
            { value: 'KES 180K+', label: 'Client Revenue Generated' },
            { value: '96%', label: 'Client Satisfaction' },
            { value: '12K+', label: 'Total Impressions' },
          ].map((s, i) => (
            <div key={i} className={styles.statItem}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Case cards */}
        <div className={styles.grid}>
          {CASES.map((c, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop} style={{ borderColor: `${c.color}30` }}>
                <div className={styles.clientRow}>
                  <div className={styles.clientEmoji} style={{ background: `${c.color}15`, border: `1px solid ${c.color}25` }}>
                    {c.emoji}
                  </div>
                  <div>
                    <div className={styles.clientName}>{c.client}</div>
                    <div className={styles.clientIndustry}>{c.industry}</div>
                  </div>
                  <span className={styles.platformBadge} style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}25` }}>
                    {c.platform}
                  </span>
                </div>
                <div className={styles.campaignMeta}>
                  <span>💰 {c.budget}</span>
                  <span>📅 {c.duration}</span>
                  <span>🎯 {c.adType}</span>
                </div>
                <p className={styles.goal}><strong>Goal:</strong> {c.goal}</p>
              </div>

              <div className={styles.results}>
                {c.results.map((r, j) => (
                  <div key={j} className={styles.resultItem}>
                    <span className={styles.resultIcon}>{r.icon}</span>
                    <span className={styles.resultValue}>{r.value}</span>
                    <span className={styles.resultLabel}>{r.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.quote}>
                <span className={styles.quoteIcon}>"</span>
                <p>{c.quote}</p>
                <span className={styles.quoteAuthor}>— {c.author}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h2>Ready to be our next success story?</h2>
          <p>Join these businesses and start your campaign today.</p>
          <div className={styles.ctaBtns}>
            <button className={styles.btnPulse} onClick={() => navigate('/register')}>
              Start Your Campaign →
            </button>
            <a
              href="https://wa.me/254732751315?text=Hi%20Ad-Pulse%2C%20I%20saw%20your%20case%20studies%20and%20want%20to%20run%20a%20campaign"
              target="_blank" rel="noopener noreferrer"
              className={styles.btnWa}
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
