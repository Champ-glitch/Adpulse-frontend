import { useNavigate } from 'react-router-dom'
import styles from './Blog.module.css'

const POSTS = [
  {
    slug: 'tiktok-ads-kenya-guide',
    title: 'How to Run TikTok Ads in Kenya (2026 Complete Guide)',
    excerpt: 'Everything you need to know about running TikTok ads as a Kenyan business — budgets, targeting, creatives and what actually works.',
    category: 'Advertising',
    categoryColor: '#ff0050',
    readTime: '5 min read',
    date: 'Jan 15, 2026',
    emoji: '🎵',
    tags: ['TikTok', 'Kenya', 'Ads'],
  },
  {
    slug: 'grow-instagram-followers-kenya',
    title: 'How to Grow Your Instagram Followers in Kenya — Organic vs Paid',
    excerpt: 'The fastest way to grow your Instagram in 2026. We break down organic strategies vs paid boosting and which gives better ROI for Kenyan businesses.',
    category: 'Social Media',
    categoryColor: '#e1306c',
    readTime: '4 min read',
    date: 'Jan 22, 2026',
    emoji: '📸',
    tags: ['Instagram', 'Growth', 'Kenya'],
  },
  {
    slug: 'mpesa-advertising-payments',
    title: 'Why M-Pesa is the Best Way to Pay for Digital Advertising in Kenya',
    excerpt: 'Credit cards and bank transfers are painful. Here\'s why M-Pesa is transforming how Kenyan SMEs pay for their digital marketing.',
    category: 'Payments',
    categoryColor: '#e8ff47',
    readTime: '3 min read',
    date: 'Feb 3, 2026',
    emoji: '📱',
    tags: ['M-Pesa', 'Payments', 'Marketing'],
  },
  {
    slug: 'facebook-ads-small-business-kenya',
    title: 'Facebook Ads for Small Businesses in Kenya — Start with KES 2,000',
    excerpt: 'You don\'t need a huge budget to run Facebook ads. Here\'s a proven strategy for Kenyan SMEs starting with as little as KES 2,000.',
    category: 'Advertising',
    categoryColor: '#1877f2',
    readTime: '6 min read',
    date: 'Feb 10, 2026',
    emoji: '👥',
    tags: ['Facebook', 'SME', 'Budget Ads'],
  },
  {
    slug: 'social-media-boosting-explained',
    title: 'Social Media Boosting Explained — Is It Worth It for Your Business?',
    excerpt: 'What is social media boosting, how does it work, is it safe, and when should you use it vs paid ads? We answer all the questions Kenyan business owners ask.',
    category: 'Social Media',
    categoryColor: '#4dffd4',
    readTime: '5 min read',
    date: 'Feb 18, 2026',
    emoji: '🚀',
    tags: ['Boosting', 'Followers', 'Strategy'],
  },
  {
    slug: 'ad-campaign-roi-calculator',
    title: 'How to Calculate ROI on Your Social Media Ad Campaigns',
    excerpt: 'Impressions, clicks, CTR, conversions — what do they all mean and how do you know if your campaign is actually working? Simple breakdown.',
    category: 'Strategy',
    categoryColor: '#b57bff',
    readTime: '4 min read',
    date: 'Mar 1, 2026',
    emoji: '📊',
    tags: ['ROI', 'Analytics', 'Strategy'],
  },
]

export default function Blog() {
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
        <div className={styles.header}>
          <span className={styles.sectionLabel}>Blog & Tips</span>
          <h1>Grow smarter.<br/>Market better.</h1>
          <p>Free guides on digital advertising, social media growth and marketing strategy for Kenyan businesses.</p>
        </div>

        {/* Featured post */}
        <div className={styles.featured} onClick={() => {}}>
          <div className={styles.featuredEmoji}>{POSTS[0].emoji}</div>
          <div className={styles.featuredContent}>
            <div className={styles.featuredMeta}>
              <span className={styles.catBadge} style={{ background: `${POSTS[0].categoryColor}15`, color: POSTS[0].categoryColor, border: `1px solid ${POSTS[0].categoryColor}25` }}>
                {POSTS[0].category}
              </span>
              <span className={styles.metaText}>{POSTS[0].date}</span>
              <span className={styles.metaText}>⏱ {POSTS[0].readTime}</span>
            </div>
            <h2>{POSTS[0].title}</h2>
            <p>{POSTS[0].excerpt}</p>
            <button className={styles.readBtn} onClick={() => navigate('/register')}>
              Read Article →
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {POSTS.slice(1).map((post, i) => (
            <div key={i} className={styles.card} onClick={() => navigate('/register')}>
              <div className={styles.cardEmoji} style={{ background: `${post.categoryColor}10` }}>
                {post.emoji}
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.catBadge} style={{ background: `${post.categoryColor}15`, color: post.categoryColor, border: `1px solid ${post.categoryColor}25` }}>
                  {post.category}
                </span>
                <span className={styles.metaText}>⏱ {post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className={styles.cardFooter}>
                <span className={styles.metaText}>{post.date}</span>
                <span className={styles.readLink}>Read →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div className={styles.emailCapture}>
          <div className={styles.emailLeft}>
            <span>📧</span>
            <div>
              <h3>Get free marketing tips weekly</h3>
              <p>Join 200+ Kenyan business owners getting actionable social media tips every week.</p>
            </div>
          </div>
          <div className={styles.emailRight}>
            <input type="email" placeholder="your@email.com" className={styles.emailInput} />
            <button className={styles.emailBtn} onClick={() => navigate('/register')}>Subscribe Free</button>
          </div>
        </div>
      </div>
    </div>
  )
}
