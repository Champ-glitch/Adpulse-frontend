import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '../components/Sidebar'
import { api, Campaign } from '../lib/api'
import toast from 'react-hot-toast'
import styles from './CampaignDetail.module.css'

const STATUS_COLOR: Record<string, string> = {
  active: '#4dffd4', pending: '#e8ff47', paused: '#b57bff',
  completed: '#888', rejected: '#ff4d6d'
}

export default function CampaignDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaign()
    const interval = setInterval(fetchCampaign, 30000)
    return () => clearInterval(interval)
  }, [id])

  const fetchCampaign = async () => {
    try {
      const { data } = await api.get(`/campaigns/${id}`)
      setCampaign(data.campaign)
    } catch {
      toast.error('Campaign not found')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}><div className={styles.loader}><span className={styles.spinner} /></div></main>
    </div>
  )
  if (!campaign) return null

  const ctr = campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) : '0.00'
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / 86400000))

  // Mock chart data
  const chartData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    impressions: Math.floor(Math.random() * (campaign.impressions / 7 + 100)),
    clicks: Math.floor(Math.random() * (campaign.clicks / 7 + 10)),
  }))

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <div>
            <h1 className={styles.title}>{campaign.title}</h1>
            <div className={styles.meta}>
              {campaign.platforms?.join(' · ')} · {campaign.adType}
            </div>
          </div>
          <div className={styles.statusBadge} style={{ '--color': STATUS_COLOR[campaign.status] } as React.CSSProperties}>
            <span className={styles.statusDot} />
            {campaign.status}
          </div>
        </div>

        {campaign.status === 'pending' && campaign.paymentStatus === 'pending' && (
          <div className={styles.paymentAlert}>
            <span>⏳</span>
            <div>
              <strong>Payment Pending</strong>
              <p>Complete your {campaign.paymentMethod === 'mpesa' ? 'M-Pesa' : 'crypto'} payment to activate this campaign.</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className={styles.statsGrid}>
          {[
            { label: 'Impressions', value: (campaign.impressions || 0).toLocaleString(), color: 'var(--pulse)' },
            { label: 'Clicks', value: (campaign.clicks || 0).toLocaleString(), color: 'var(--electric)' },
            { label: 'CTR', value: `${ctr}%`, color: 'var(--violet)' },
            { label: 'Spend', value: `KES ${(campaign.spend || 0).toLocaleString()}`, color: 'var(--red)' },
            { label: 'Budget', value: `KES ${campaign.budget?.toLocaleString()}`, color: 'var(--text-secondary)' },
            { label: 'Days Left', value: daysLeft.toString(), color: 'var(--text-secondary)' },
          ].map((s, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className={styles.chartCard}>
          <h2 className={styles.cardTitle}>Performance Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--pulse)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="var(--pulse)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--electric)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="var(--electric)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="impressions" stroke="var(--pulse)" strokeWidth={2} fill="url(#gi)" />
              <Area type="monotone" dataKey="clicks" stroke="var(--electric)" strokeWidth={2} fill="url(#gc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Details */}
        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <h3>Campaign Info</h3>
            <div className={styles.detailRow}><span>Status</span><strong>{campaign.status}</strong></div>
            <div className={styles.detailRow}><span>Payment</span><strong>{campaign.paymentMethod}</strong></div>
            <div className={styles.detailRow}><span>Start</span><strong>{new Date(campaign.startDate).toLocaleDateString()}</strong></div>
            <div className={styles.detailRow}><span>End</span><strong>{new Date(campaign.endDate).toLocaleDateString()}</strong></div>
          </div>
          <div className={styles.detailCard}>
            <h3>Targeting</h3>
            <div className={styles.detailRow}><span>Location</span><strong>{campaign.targetLocation}</strong></div>
            <div className={styles.detailRow}><span>Age</span><strong>{campaign.targetAge}</strong></div>
            {campaign.targetAudience && <div className={styles.detailRow}><span>Interests</span><strong>{campaign.targetAudience}</strong></div>}
          </div>
        </div>
      </main>
    </div>
  )
}
