import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '../components/Sidebar'
import { api, Campaign } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import styles from './Dashboard.module.css'

const STATUS_COLOR: Record<string, string> = {
  active: '#4dffd4', pending: '#e8ff47', paused: '#b57bff',
  completed: '#888', rejected: '#ff4d6d'
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data } = await api.get('/campaigns')
      setCampaigns(data.campaigns || [])
      // Build chart from campaigns
      const days: Record<string, { impressions: number; clicks: number }> = {}
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i)
        const key = d.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })
        days[key] = { impressions: 0, clicks: 0 }
      }
      setChartData(Object.entries(days).map(([date, vals]) => ({ date, ...vals })))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const totalImpressions = campaigns.reduce((s, c) => s + (c.impressions || 0), 0)
  const totalClicks = campaigns.reduce((s, c) => s + (c.clicks || 0), 0)
  const totalSpend = campaigns.reduce((s, c) => s + (c.spend || 0), 0)
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length

  const stats = [
    { label: 'Total Impressions', value: totalImpressions.toLocaleString(), icon: '👁️', color: 'var(--pulse)' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: '🖱️', color: 'var(--electric)' },
    { label: 'Total Spend', value: `KES ${totalSpend.toLocaleString()}`, icon: '💰', color: 'var(--violet)' },
    { label: 'Active Campaigns', value: activeCampaigns.toString(), icon: '⚡', color: 'var(--red)' },
  ]

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Welcome back, {user?.name?.split(' ')[0]} 👋</p>
          </div>
          <button className={styles.newBtn} onClick={() => navigate('/campaigns/new')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Campaign
          </button>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statIcon}>{s.icon}</div>
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className={styles.chartCard}>
          <h2 className={styles.cardTitle}>Performance (7 days)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="impressions" stroke="var(--pulse)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="clicks" stroke="var(--electric)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaigns */}
        <div className={styles.campaignsSection}>
          <h2 className={styles.cardTitle}>Your Campaigns</h2>
          {loading ? (
            <div className={styles.loader}><span className={styles.spinner} /></div>
          ) : campaigns.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🚀</div>
              <p>No campaigns yet. Launch your first one!</p>
              <button className={styles.newBtn} onClick={() => navigate('/campaigns/new')}>Create Campaign</button>
            </div>
          ) : (
            <div className={styles.campaignList}>
              {campaigns.map(c => (
                <div key={c.id} className={styles.campaignRow} onClick={() => navigate(`/campaigns/${c.id}`)}>
                  <div className={styles.campaignInfo}>
                    <div className={styles.campaignTitle}>{c.title}</div>
                    <div className={styles.campaignMeta}>
                      {c.platforms?.join(', ')} · {c.adType}
                    </div>
                  </div>
                  <div className={styles.campaignStats}>
                    <span>{(c.impressions || 0).toLocaleString()} imp</span>
                    <span>{(c.clicks || 0).toLocaleString()} clicks</span>
                  </div>
                  <div className={styles.statusBadge} style={{ '--color': STATUS_COLOR[c.status] } as React.CSSProperties}>
                    {c.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
