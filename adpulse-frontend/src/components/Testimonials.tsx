import { useState, useEffect } from 'react'
import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  {
    name: 'Brian Otieno',
    role: 'Founder, Mkononi Deliveries',
    location: 'Nairobi',
    avatar: 'BO',
    color: '#e8ff47',
    text: 'I ran my first TikTok campaign with Ad-Pulse for KES 3,000 and got over 8,000 impressions in 5 days. The M-Pesa payment made it super easy. My orders went up by 40% that week.',
    platform: 'TikTok',
    result: '+40% orders',
  },
  {
    name: 'Amina Hassan',
    role: 'Fashion Designer',
    location: 'Mombasa',
    avatar: 'AH',
    color: '#4dffd4',
    text: 'The Instagram boosting service grew my page from 200 to over 1,400 followers in under 2 weeks. Real followers who actually engage. Worth every shilling.',
    platform: 'Instagram',
    result: '+1,200 followers',
  },
  {
    name: 'Kevin Mwangi',
    role: 'Digital Marketer',
    location: 'Kisumu',
    avatar: 'KM',
    color: '#b57bff',
    text: 'I manage social media for 3 local businesses. Ad-Pulse saves me hours every week. The dashboard is clean, reporting is clear, and support responds on WhatsApp instantly.',
    platform: 'Facebook',
    result: '3 clients managed',
  },
  {
    name: 'Fatuma Abdalla',
    role: 'Restaurant Owner',
    location: 'Nairobi',
    avatar: 'FA',
    color: '#ff4d6d',
    text: 'We promoted our new menu on Facebook and got 60+ table bookings in one weekend. Paid with M-Pesa, campaign went live next morning. Unbelievably smooth.',
    platform: 'Facebook',
    result: '60+ bookings',
  },
  {
    name: 'James Kariuki',
    role: 'Music Artist',
    location: 'Nairobi',
    avatar: 'JK',
    color: '#e8ff47',
    text: 'Used Ad-Pulse to promote my new single on TikTok. 15K views in the first 3 days. The targeting was spot on — reached people who actually listen to Afrobeats.',
    platform: 'TikTok',
    result: '15K views',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  const t = TESTIMONIALS[active]

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.quote}>"</div>
        <p className={styles.text}>{t.text}</p>
        <div className={styles.meta}>
          <div className={styles.avatar} style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}30` }}>
            {t.avatar}
          </div>
          <div>
            <div className={styles.name}>{t.name}</div>
            <div className={styles.role}>{t.role} · {t.location}</div>
          </div>
          <div className={styles.result} style={{ color: t.color, background: `${t.color}15`, border: `1px solid ${t.color}25` }}>
            {t.result}
          </div>
        </div>
      </div>

      <div className={styles.dots}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <div className={styles.cards}>
        {TESTIMONIALS.map((item, i) => (
          <div
            key={i}
            className={`${styles.miniCard} ${i === active ? styles.miniCardActive : ''}`}
            onClick={() => setActive(i)}
          >
            <div className={styles.miniAvatar} style={{ background: `${item.color}15`, color: item.color }}>
              {item.avatar}
            </div>
            <div className={styles.miniName}>{item.name.split(' ')[0]}</div>
            <div className={styles.miniPlatform}>{item.platform}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
