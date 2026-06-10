import { useState } from 'react'
import styles from './FAQ.module.css'

const FAQS = [
  { q: 'How long does it take for my campaign to go live?', a: 'We review and launch all campaigns within 24 hours of payment confirmation. Most campaigns go live within a few hours during business hours.' },
  { q: 'What payment methods do you accept?', a: 'We accept M-Pesa (via STK push directly to your phone) and cryptocurrency (USDT, BTC, ETH and 50+ coins via NOWPayments). No card or bank account needed for M-Pesa.' },
  { q: 'What is the minimum budget for a campaign?', a: 'The minimum budget for a paid ad campaign is KES 2,000. For social media boosting packages, pricing varies — contact us on WhatsApp for a custom quote.' },
  { q: 'Can I run ads on multiple platforms at once?', a: 'Yes! You can select multiple platforms (TikTok, Instagram, Facebook, Twitter/X) in a single campaign. Your budget is spread across all selected platforms.' },
  { q: 'How is social media boosting different from paid ads?', a: 'Paid ads promote your content or product to a targeted audience. Social media boosting grows your actual follower count, likes and engagement on your profile. Many clients use both together.' },
  { q: 'Are the followers from boosting real people?', a: 'Yes. We use organic growth strategies and targeted promotion to attract real, relevant users to your profile — not bots or fake accounts.' },
  { q: 'Can I track my campaign performance in real time?', a: 'Absolutely. Your dashboard shows live impressions, clicks, CTR and spend. We also send you an email report when your campaign goes live and when it completes.' },
  { q: 'What if I\'m not happy with my campaign results?', a: 'Reach out to us on WhatsApp and we\'ll work with you to optimize or extend your campaign. We\'re committed to delivering real value for every shilling you spend.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className={styles.faq}>
      {FAQS.map((item, i) => (
        <div key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}>
          <button className={styles.question} onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <div className={`${styles.icon} ${open === i ? styles.iconOpen : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </button>
          <div className={styles.answer}>
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
