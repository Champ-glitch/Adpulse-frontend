import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SMM.module.css'

const CATEGORIES = ['All', 'TikTok', 'Instagram', 'Facebook', 'Twitter/X', 'YouTube']

const SERVICES = [
  // TikTok
  { id: 1, platform: 'TikTok', category: 'Followers', name: 'TikTok Followers', description: 'Real-looking followers, fast delivery, no password needed', pricePerK: 120, minOrder: 100, maxOrder: 50000, deliveryTime: '1-6 hours', quality: 'High Quality', icon: '🎵', popular: true },
  { id: 2, platform: 'TikTok', category: 'Views', name: 'TikTok Video Views', description: 'Boost your video views instantly, works on all videos', pricePerK: 25, minOrder: 1000, maxOrder: 500000, deliveryTime: '0-30 mins', quality: 'Instant', icon: '▶️', popular: true },
  { id: 3, platform: 'TikTok', category: 'Likes', name: 'TikTok Likes', description: 'High retention likes for your TikTok videos', pricePerK: 80, minOrder: 100, maxOrder: 50000, deliveryTime: '1-3 hours', quality: 'High Quality', icon: '❤️' },
  { id: 4, platform: 'TikTok', category: 'Comments', name: 'TikTok Comments', description: 'Custom positive comments on your videos', pricePerK: 500, minOrder: 10, maxOrder: 500, deliveryTime: '1-12 hours', quality: 'Custom', icon: '💬' },
  { id: 5, platform: 'TikTok', category: 'Shares', name: 'TikTok Shares', description: 'Increase shares and reach for your videos', pricePerK: 150, minOrder: 100, maxOrder: 10000, deliveryTime: '1-6 hours', quality: 'Real', icon: '🔁' },

  // Instagram
  { id: 6, platform: 'Instagram', category: 'Followers', name: 'Instagram Followers', description: 'Real looking followers, guaranteed delivery', pricePerK: 150, minOrder: 100, maxOrder: 50000, deliveryTime: '1-12 hours', quality: 'High Quality', icon: '📸', popular: true },
  { id: 7, platform: 'Instagram', category: 'Likes', name: 'Instagram Likes', description: 'Auto or manual likes for your posts', pricePerK: 60, minOrder: 100, maxOrder: 50000, deliveryTime: '0-1 hour', quality: 'Instant', icon: '❤️' },
  { id: 8, platform: 'Instagram', category: 'Views', name: 'Instagram Reel Views', description: 'Boost your Reels reach and discovery', pricePerK: 30, minOrder: 1000, maxOrder: 500000, deliveryTime: '0-30 mins', quality: 'Instant', icon: '▶️', popular: true },
  { id: 9, platform: 'Instagram', category: 'Comments', name: 'Instagram Comments', description: 'Random positive comments on your posts', pricePerK: 600, minOrder: 10, maxOrder: 1000, deliveryTime: '1-24 hours', quality: 'Custom', icon: '💬' },
  { id: 10, platform: 'Instagram', category: 'Story Views', name: 'Instagram Story Views', description: 'Real views on your Instagram stories', pricePerK: 20, minOrder: 1000, maxOrder: 100000, deliveryTime: '0-1 hour', quality: 'Fast', icon: '⭕' },

  // Facebook
  { id: 11, platform: 'Facebook', category: 'Page Likes', name: 'Facebook Page Likes', description: 'Grow your Facebook page with real-looking likes', pricePerK: 200, minOrder: 100, maxOrder: 50000, deliveryTime: '1-24 hours', quality: 'High Quality', icon: '👍', popular: true },
  { id: 12, platform: 'Facebook', category: 'Post Likes', name: 'Facebook Post Likes', description: 'Boost engagement on your Facebook posts', pricePerK: 80, minOrder: 100, maxOrder: 10000, deliveryTime: '1-6 hours', quality: 'Real', icon: '❤️' },
  { id: 13, platform: 'Facebook', category: 'Followers', name: 'Facebook Profile Follows', description: 'Increase your personal profile followers', pricePerK: 180, minOrder: 100, maxOrder: 20000, deliveryTime: '1-12 hours', quality: 'High Quality', icon: '👥' },
  { id: 14, platform: 'Facebook', category: 'Views', name: 'Facebook Video Views', description: 'Boost video views and reach on Facebook', pricePerK: 30, minOrder: 1000, maxOrder: 500000, deliveryTime: '0-30 mins', quality: 'Instant', icon: '▶️' },

  // Twitter/X
  { id: 15, platform: 'Twitter/X', category: 'Followers', name: 'Twitter/X Followers', description: 'Grow your Twitter following fast', pricePerK: 180, minOrder: 100, maxOrder: 20000, deliveryTime: '1-12 hours', quality: 'High Quality', icon: '🐦', popular: true },
  { id: 16, platform: 'Twitter/X', category: 'Likes', name: 'Twitter/X Likes', description: 'Boost likes on your tweets', pricePerK: 80, minOrder: 100, maxOrder: 10000, deliveryTime: '0-1 hour', quality: 'Fast', icon: '❤️' },
  { id: 17, platform: 'Twitter/X', category: 'Retweets', name: 'Twitter/X Retweets', description: 'Increase retweets and reach', pricePerK: 200, minOrder: 50, maxOrder: 5000, deliveryTime: '1-6 hours', quality: 'Real', icon: '🔁' },

  // YouTube
  { id: 18, platform: 'YouTube', category: 'Views', name: 'YouTube Views', description: 'Real retention views, safe for monetization', pricePerK: 50, minOrder: 1000, maxOrder: 500000, deliveryTime: '0-1 hour', quality: 'High Retention', icon: '▶️', popular: true },
  { id: 19, platform: 'YouTube', category: 'Subscribers', name: 'YouTube Subscribers', description: 'Grow your subscriber count safely', pricePerK: 400, minOrder: 100, maxOrder: 10000, deliveryTime: '1-24 hours', quality: 'Real', icon: '🔔' },
  { id: 20, platform: 'YouTube', category: 'Likes', name: 'YouTube Likes', description: 'Boost likes on your YouTube videos', pricePerK: 150, minOrder: 100, maxOrder: 10000, deliveryTime: '1-6 hours', quality: 'Real', icon: '👍' },
]

const PLATFORM_COLORS: Record<string, string> = {
  TikTok: '#ff0050', Instagram: '#e1306c', Facebook: '#1877f2', 'Twitter/X': '#1da1f2', YouTube: '#ff0000'
}

export default function SMM() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null)
  const [quantity, setQuantity] = useState(1000)
  const [link, setLink] = useState('')

  const filtered = activeCategory === 'All' ? SERVICES : SERVICES.filter(s => s.platform === activeCategory)
  const price = selectedService ? Math.max(1, Math.round((quantity / 1000) * selectedService.pricePerK)) : 0

  return (
    <div className={styles.page}>
      <div className={styles.orb1} /><div className={styles.orb2} />

      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <span className={styles.logoDot} />Ad-Pulse
        </div>
        <div className={styles.navCenter}>
          <span className={styles.navBadge}>⚡ SMM Panel</span>
        </div>
        <div className={styles.navRight}>
          <button className={styles.btnGhost} onClick={() => navigate('/login')}>Sign In</button>
          <button className={styles.btnPulse} onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <div className={styles.hero}>
        <span className={styles.sectionLabel}>Social Media Services</span>
        <h1>Grow your social media.<br/>Fast, safe, affordable.</h1>
        <p>TikTok, Instagram, Facebook, Twitter/X & YouTube. Followers, likes, views and more. Pay with M-Pesa.</p>
        <div className={styles.heroStats}>
          {[
            { v: '20+', l: 'Services' },
            { v: 'KES 20', l: 'Starting Price' },
            { v: '24/7', l: 'Support' },
            { v: 'Instant', l: 'Most Orders' },
          ].map((s, i) => (
            <div key={i} className={styles.heroStat}>
              <strong>{s.v}</strong><span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Category filter */}
        <div className={styles.categoryBar}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >{cat}</button>
          ))}
        </div>

        <div className={styles.layout}>
          {/* Services list */}
          <div className={styles.servicesList}>
            {filtered.map(service => (
              <div
                key={service.id}
                className={`${styles.serviceCard} ${selectedService?.id === service.id ? styles.serviceCardSelected : ''}`}
                onClick={() => { setSelectedService(service); setQuantity(service.minOrder) }}
              >
                <div className={styles.serviceLeft}>
                  <div className={styles.serviceIcon} style={{ background: `${PLATFORM_COLORS[service.platform]}15` }}>
                    {service.icon}
                  </div>
                  <div>
                    <div className={styles.serviceNameRow}>
                      <span className={styles.serviceName}>{service.name}</span>
                      {service.popular && <span className={styles.popularTag}>🔥 Popular</span>}
                    </div>
                    <div className={styles.serviceMeta}>
                      <span className={styles.platformTag} style={{ color: PLATFORM_COLORS[service.platform], background: `${PLATFORM_COLORS[service.platform]}12` }}>
                        {service.platform}
                      </span>
                      <span className={styles.metaItem}>⏱ {service.deliveryTime}</span>
                      <span className={styles.metaItem}>✨ {service.quality}</span>
                    </div>
                    <p className={styles.serviceDesc}>{service.description}</p>
                  </div>
                </div>
                <div className={styles.serviceRight}>
                  <div className={styles.servicePrice}>KES {service.pricePerK}</div>
                  <div className={styles.servicePriceLabel}>per 1,000</div>
                </div>
              </div>
            ))}
          </div>

          {/* Order panel */}
          <div className={styles.orderPanel}>
            {selectedService ? (
              <div className={styles.orderCard}>
                <h3>Place Order</h3>
                <div className={styles.orderService}>
                  <span className={styles.orderIcon}>{selectedService.icon}</span>
                  <div>
                    <div className={styles.orderName}>{selectedService.name}</div>
                    <div className={styles.orderQuality}>{selectedService.quality} · {selectedService.deliveryTime}</div>
                  </div>
                </div>
                <div className={styles.orderField}>
                  <label>Your {selectedService.platform} Link</label>
                  <input
                    type="url"
                    placeholder={`https://${selectedService.platform.toLowerCase().replace('/x','')}.com/...`}
                    value={link}
                    onChange={e => setLink(e.target.value)}
                  />
                </div>
                <div className={styles.orderField}>
                  <label>Quantity ({selectedService.minOrder.toLocaleString()} – {selectedService.maxOrder.toLocaleString()})</label>
                  <input
                    type="number"
                    value={quantity}
                    min={selectedService.minOrder}
                    max={selectedService.maxOrder}
                    step={100}
                    onChange={e => setQuantity(Number(e.target.value))}
                  />
                  <input
                    type="range"
                    min={selectedService.minOrder}
                    max={Math.min(selectedService.maxOrder, 10000)}
                    step={100}
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className={styles.slider}
                  />
                </div>
                <div className={styles.orderSummary}>
                  <div className={styles.summaryRow}><span>Service</span><strong>{selectedService.name}</strong></div>
                  <div className={styles.summaryRow}><span>Quantity</span><strong>{quantity.toLocaleString()}</strong></div>
                  <div className={styles.summaryRow}><span>Rate</span><strong>KES {selectedService.pricePerK}/1K</strong></div>
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <span>Total</span>
                    <strong className={styles.totalPrice}>KES {price.toLocaleString()}</strong>
                  </div>
                </div>
                <button className={styles.orderBtn} onClick={() => navigate('/register')}>
                  Pay KES {price.toLocaleString()} & Order →
                </button>
                <p className={styles.orderNote}>💳 Pay with M-Pesa · 🔒 Secure · ⚡ Fast delivery</p>
              </div>
            ) : (
              <div className={styles.orderEmpty}>
                <div className={styles.emptyIcon}>👆</div>
                <p>Select a service from the list to place an order</p>
              </div>
            )}

            {/* Trust badges */}
            <div className={styles.trustBadges}>
              {['🔒 Secure', '⚡ Fast Delivery', '💬 24/7 Support', '💰 M-Pesa'].map((b, i) => (
                <span key={i} className={styles.trustBadge}>{b}</span>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/254732751315?text=Hi%20Ad-Pulse%2C%20I%20want%20to%20order%20SMM%20services"
              target="_blank" rel="noopener noreferrer"
              className={styles.waBtn}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Need help? Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
