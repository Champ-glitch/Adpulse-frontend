import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Sidebar from '../components/Sidebar'
import { api } from '../lib/api'
import styles from './AdminAnalytics.module.css'

const COLORS = ['#e8ff47', '#4dffd4', '#b57bff', '#ff4d6d', '#1877f2']

const MOCK_REVENUE = [
  { day: 'Mon', revenue: 4200, campaigns: 3 },
  { day: 'Tue', revenue: 7800, campaigns: 5 },
  { day: 'Wed', revenue: 3100, campaigns: 2 },
  { day: 'Thu', revenue: 9500, campaigns: 7 },
  { day: 'Fri', revenue: 12400, campaigns: 9 },
  { day: 'Sat', revenue: 8700, campaigns: 6 },
  { day: 'Sun', revenue: 5300, campaigns: 4 },
]

const MOCK_PLATFORMS = [
  { name: 'TikTok', value: 38 },
  { name: 'Instagram', value: 29 },
  { name: 'Facebook', value: 22 },
  { name: 'Twitter/X', value: 8 },
  { name: 'YouTube', value: 3 },
]

export default function AdminAnalytics() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<any>(null)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'users' | 'services' | 'payments'>('overview')

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const [statsRes, campaignsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/campaigns'),
        api.get('/admin/users'),
      ])
      setStats(statsRes.data)
      setCampaigns(campaignsRes.data.campaigns || [])
      setUsers(usersRes.data.users || [])
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const totalRevenue = stats?.totalRevenue || 0
  const weekRevenue = MOCK_REVENUE.reduce((s: number, d: any) => s + d.revenue, 0)

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Site Analytics</h1>
            <p className={styles.subtitle}>Full overview of Ad-Pulse performance</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.liveIndicator}>
              <span className={styles.liveDot} />
              Live
            </div>
            <button className={styles.refreshBtn} onClick={fetchAll}>↻ Refresh</button>
          </div>
        </div>

        {/* Tab bar */}
        <div className={styles.tabs}>
          {(['overview', 'campaigns', 'users', 'services', 'payments'] as const).map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className={styles.tabContent}>
            {/* KPI cards */}
            <div className={styles.kpiGrid}>
              {[
                { label: 'Total Revenue', value: `KES ${totalRevenue.toLocaleString()}`, sub: 'All time', icon: '💰', color: 'var(--pulse)' },
                { label: 'This Week', value: `KES ${weekRevenue.toLocaleString()}`, sub: '7 days', icon: '📈', color: 'var(--electric)' },
                { label: 'Total Campaigns', value: stats?.totalCampaigns || 0, sub: `${stats?.activeCampaigns || 0} active`, icon: '📢', color: 'var(--violet)' },
                { label: 'Total Users', value: stats?.totalUsers || 0, sub: 'Registered', icon: '👥', color: 'var(--red)' },
                { label: 'Total Impressions', value: (stats?.totalImpressions || 0).toLocaleString(), sub: 'All campaigns', icon: '👁️', color: 'var(--pulse)' },
                { label: 'Total Clicks', value: (stats?.totalClicks || 0).toLocaleString(), sub: 'All campaigns', icon: '🖱️', color: 'var(--electric)' },
              ].map((k, i) => (
                <div key={i} className={styles.kpiCard}>
                  <div className={styles.kpiIcon}>{k.icon}</div>
                  <div className={styles.kpiValue} style={{ color: k.color }}>{k.value}</div>
                  <div className={styles.kpiLabel}>{k.label}</div>
                  <div className={styles.kpiSub}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className={styles.chartsRow}>
              {/* Revenue chart */}
              <div className={styles.chartCard}>
                <h3>Revenue This Week</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={MOCK_REVENUE}>
                    <defs>
                      <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e8ff47" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#e8ff47" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} formatter={(v: any) => [`KES ${v.toLocaleString()}`, 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="#e8ff47" strokeWidth={2} fill="url(#rg)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Platform breakdown */}
              <div className={styles.chartCard}>
                <h3>Campaigns by Platform</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={MOCK_PLATFORMS} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                      {MOCK_PLATFORMS.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} formatter={(v: any, n: any) => [`${v}%`, n]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.pieLegend}>
                  {MOCK_PLATFORMS.map((p, i) => (
                    <div key={i} className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ background: COLORS[i] }} />
                      <span>{p.name}</span>
                      <strong>{p.value}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaigns bar chart */}
            <div className={styles.chartCard}>
              <h3>Campaigns Per Day</h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={MOCK_REVENUE}>
                  <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="campaigns" fill="var(--electric)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* CAMPAIGNS TAB */}
        {activeTab === 'campaigns' && (
          <div className={styles.tabContent}>
            <div className={styles.tableCard}>
              <div className={styles.tableHeader}>
                <h3>All Campaigns ({campaigns.length})</h3>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Campaign</th><th>Platform</th><th>Budget</th><th>Status</th><th>Payment</th><th>Impressions</th><th>Clicks</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c: any) => (
                      <CampaignRow key={c.id} campaign={c} onRefresh={fetchAll} />
                    ))}
                    {campaigns.length === 0 && (
                      <tr><td colSpan={8} className={styles.emptyCell}>No campaigns yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className={styles.tabContent}>
            <div className={styles.tableCard}>
              <div className={styles.tableHeader}>
                <h3>All Users ({users.length})</h3>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Balance</th><th>Joined</th></tr>
                  </thead>
                  <tbody>
                    {users.map((u: any) => (
                      <tr key={u.id}>
                        <td><strong>{u.name}</strong></td>
                        <td className={styles.cellMuted}>{u.email}</td>
                        <td className={styles.cellMuted}>{u.phone}</td>
                        <td><span className={`${styles.roleBadge} ${u.role === 'admin' ? styles.roleAdmin : ''}`}>{u.role}</span></td>
                        <td>KES {(u.balance || 0).toLocaleString()}</td>
                        <td className={styles.cellMuted}>{new Date(u.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan={6} className={styles.emptyCell}>No users yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES TAB - pricing management */}
        {activeTab === 'services' && <ServiceManager />}

        {/* PAYMENTS TAB */}
        {activeTab === 'payments' && <PaymentsTab />}
      </main>
    </div>
  )
}

// ── Campaign row with inline actions ─────────────────────────────────────────
const STATUS_COLOR: Record<string, string> = {
  active: '#4dffd4', pending: '#e8ff47', paused: '#b57bff', completed: '#888', rejected: '#ff4d6d'
}

function CampaignRow({ campaign: c, onRefresh }: { campaign: any; onRefresh: () => void }) {
  const [editStats, setEditStats] = useState(false)
  const [imp, setImp] = useState(c.impressions || 0)
  const [clk, setClk] = useState(c.clicks || 0)

  const updateStatus = async (status: string) => {
    try { await api.patch(`/admin/campaigns/${c.id}`, { status }); onRefresh() } catch (e) {}
  }
  const saveStats = async () => {
    try { await api.patch(`/admin/campaigns/${c.id}/stats`, { impressions: imp, clicks: clk }); setEditStats(false); onRefresh() } catch (e) {}
  }

  return (
    <>
      <tr>
        <td><strong>{c.title}</strong><div className={styles.cellSub}>{c.adType}</div></td>
        <td className={styles.cellMuted}>{c.platforms?.join(', ')}</td>
        <td>KES {c.budget?.toLocaleString()}</td>
        <td><span className={styles.statusPill} style={{ '--c': STATUS_COLOR[c.status] } as any}>{c.status}</span></td>
        <td><span className={`${styles.payPill} ${c.paymentStatus === 'paid' ? styles.paid : ''}`}>{c.paymentStatus}</span></td>
        <td>{(c.impressions || 0).toLocaleString()}</td>
        <td>{(c.clicks || 0).toLocaleString()}</td>
        <td>
          <div className={styles.actionBtns}>
            {c.status === 'pending' && <button className={styles.approveBtn} onClick={() => updateStatus('active')}>Approve</button>}
            {c.status === 'pending' && <button className={styles.rejectBtn} onClick={() => updateStatus('rejected')}>Reject</button>}
            {c.status === 'active' && <button className={styles.pauseBtn} onClick={() => updateStatus('paused')}>Pause</button>}
            {c.status === 'paused' && <button className={styles.approveBtn} onClick={() => updateStatus('active')}>Resume</button>}
            {c.status === 'active' && <button className={styles.completeBtn} onClick={() => updateStatus('completed')}>Done</button>}
            <button className={styles.statsBtn} onClick={() => setEditStats(!editStats)}>Stats</button>
          </div>
        </td>
      </tr>
      {editStats && (
        <tr className={styles.statsRow}>
          <td colSpan={8}>
            <div className={styles.statsEditRow}>
              <input type="number" value={imp} onChange={e => setImp(Number(e.target.value))} placeholder="Impressions" />
              <input type="number" value={clk} onChange={e => setClk(Number(e.target.value))} placeholder="Clicks" />
              <button className={styles.approveBtn} onClick={saveStats}>Save Stats</button>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ── Service Manager ───────────────────────────────────────────────────────────
const DEFAULT_SERVICES = [
  { id: 1, platform: 'TikTok', name: 'TikTok Followers', category: 'Followers', pricePerK: 120, minOrder: 100, maxOrder: 50000, active: true },
  { id: 2, platform: 'TikTok', name: 'TikTok Views', category: 'Views', pricePerK: 25, minOrder: 1000, maxOrder: 500000, active: true },
  { id: 3, platform: 'TikTok', name: 'TikTok Likes', category: 'Likes', pricePerK: 80, minOrder: 100, maxOrder: 50000, active: true },
  { id: 4, platform: 'Instagram', name: 'Instagram Followers', category: 'Followers', pricePerK: 150, minOrder: 100, maxOrder: 50000, active: true },
  { id: 5, platform: 'Instagram', name: 'Instagram Likes', category: 'Likes', pricePerK: 60, minOrder: 100, maxOrder: 50000, active: true },
  { id: 6, platform: 'Instagram', name: 'Instagram Reel Views', category: 'Views', pricePerK: 30, minOrder: 1000, maxOrder: 500000, active: true },
  { id: 7, platform: 'Facebook', name: 'Facebook Page Likes', category: 'Likes', pricePerK: 200, minOrder: 100, maxOrder: 50000, active: true },
  { id: 8, platform: 'Facebook', name: 'Facebook Followers', category: 'Followers', pricePerK: 180, minOrder: 100, maxOrder: 20000, active: true },
  { id: 9, platform: 'YouTube', name: 'YouTube Views', category: 'Views', pricePerK: 50, minOrder: 1000, maxOrder: 500000, active: true },
  { id: 10, platform: 'YouTube', name: 'YouTube Subscribers', category: 'Followers', pricePerK: 400, minOrder: 100, maxOrder: 10000, active: true },
  { id: 11, platform: 'YouTube', name: 'YouTube Likes', category: 'Likes', pricePerK: 150, minOrder: 100, maxOrder: 10000, active: true },
  { id: 12, platform: 'YouTube', name: 'YouTube Watch Time', category: 'Watch Time', pricePerK: 800, minOrder: 100, maxOrder: 5000, active: true },
  { id: 13, platform: 'Twitter/X', name: 'Twitter Followers', category: 'Followers', pricePerK: 180, minOrder: 100, maxOrder: 20000, active: true },
  { id: 14, platform: 'Twitter/X', name: 'Twitter Likes', category: 'Likes', pricePerK: 80, minOrder: 100, maxOrder: 10000, active: true },
]

const PLATFORM_COLORS: Record<string, string> = {
  TikTok: '#ff0050', Instagram: '#e1306c', Facebook: '#1877f2', 'Twitter/X': '#1da1f2', YouTube: '#ff0000'
}

function ServiceManager() {
  const [services, setServices] = useState(DEFAULT_SERVICES)
  const [editing, setEditing] = useState<number | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newService, setNewService] = useState({ platform: 'TikTok', name: '', category: 'Followers', pricePerK: 100, minOrder: 100, maxOrder: 50000 })
  const [saved, setSaved] = useState(false)

  const updateService = (id: number, field: string, value: any) => {
    setServices(s => s.map(sv => sv.id === id ? { ...sv, [field]: value } : sv))
  }

  const toggleActive = (id: number) => {
    setServices(s => s.map(sv => sv.id === id ? { ...sv, active: !sv.active } : sv))
  }

  const deleteService = (id: number) => {
    if (confirm('Delete this service?')) setServices(s => s.filter(sv => sv.id !== id))
  }

  const addService = () => {
    if (!newService.name) return
    setServices(s => [...s, { ...newService, id: Date.now(), active: true }])
    setNewService({ platform: 'TikTok', name: '', category: 'Followers', pricePerK: 100, minOrder: 100, maxOrder: 50000 })
    setShowAdd(false)
  }

  const saveAll = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className={styles.serviceManager}>
      <div className={styles.serviceManagerHeader}>
        <h3>SMM Services & Pricing ({services.length} services)</h3>
        <div className={styles.serviceManagerActions}>
          <button className={styles.addServiceBtn} onClick={() => setShowAdd(!showAdd)}>+ Add Service</button>
          <button className={`${styles.saveAllBtn} ${saved ? styles.saved : ''}`} onClick={saveAll}>
            {saved ? '✓ Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {showAdd && (
        <div className={styles.addServiceForm}>
          <h4>New Service</h4>
          <div className={styles.addGrid}>
            <div className={styles.addField}>
              <label>Platform</label>
              <select value={newService.platform} onChange={e => setNewService(s => ({...s, platform: e.target.value}))}>
                {['TikTok','Instagram','Facebook','Twitter/X','YouTube'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className={styles.addField}>
              <label>Service Name</label>
              <input type="text" placeholder="e.g. TikTok Comments" value={newService.name} onChange={e => setNewService(s => ({...s, name: e.target.value}))} />
            </div>
            <div className={styles.addField}>
              <label>Category</label>
              <select value={newService.category} onChange={e => setNewService(s => ({...s, category: e.target.value}))}>
                {['Followers','Likes','Views','Comments','Shares','Watch Time'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className={styles.addField}>
              <label>Price per 1,000 (KES)</label>
              <input type="number" value={newService.pricePerK} onChange={e => setNewService(s => ({...s, pricePerK: Number(e.target.value)}))} />
            </div>
            <div className={styles.addField}>
              <label>Min Order</label>
              <input type="number" value={newService.minOrder} onChange={e => setNewService(s => ({...s, minOrder: Number(e.target.value)}))} />
            </div>
            <div className={styles.addField}>
              <label>Max Order</label>
              <input type="number" value={newService.maxOrder} onChange={e => setNewService(s => ({...s, maxOrder: Number(e.target.value)}))} />
            </div>
          </div>
          <div className={styles.addActions}>
            <button className={styles.addBtn} onClick={addService}>Add Service</button>
            <button className={styles.cancelBtn} onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className={styles.serviceTable}>
        <div className={styles.serviceTableHead}>
          <span>Service</span><span>Category</span><span>Price/1K</span><span>Min</span><span>Max</span><span>Status</span><span>Actions</span>
        </div>
        {services.map(sv => (
          <div key={sv.id} className={`${styles.serviceTableRow} ${!sv.active ? styles.serviceInactive : ''}`}>
            <div>
              <span className={styles.platformDot} style={{ background: PLATFORM_COLORS[sv.platform] || '#888' }} />
              {editing === sv.id
                ? <input className={styles.inlineInput} value={sv.name} onChange={e => updateService(sv.id, 'name', e.target.value)} />
                : <strong>{sv.name}</strong>
              }
              <div className={styles.platformLabel}>{sv.platform}</div>
            </div>
            <div className={styles.cellMuted}>{sv.category}</div>
            <div>
              {editing === sv.id
                ? <input type="number" className={styles.inlineInput} style={{ width: 80 }} value={sv.pricePerK} onChange={e => updateService(sv.id, 'pricePerK', Number(e.target.value))} />
                : <strong className={styles.priceHighlight}>KES {sv.pricePerK}</strong>
              }
            </div>
            <div className={styles.cellMuted}>
              {editing === sv.id
                ? <input type="number" className={styles.inlineInput} style={{ width: 80 }} value={sv.minOrder} onChange={e => updateService(sv.id, 'minOrder', Number(e.target.value))} />
                : sv.minOrder.toLocaleString()
              }
            </div>
            <div className={styles.cellMuted}>
              {editing === sv.id
                ? <input type="number" className={styles.inlineInput} style={{ width: 90 }} value={sv.maxOrder} onChange={e => updateService(sv.id, 'maxOrder', Number(e.target.value))} />
                : sv.maxOrder.toLocaleString()
              }
            </div>
            <div>
              <button className={`${styles.toggleBtn} ${sv.active ? styles.toggleActive : styles.toggleOff}`} onClick={() => toggleActive(sv.id)}>
                {sv.active ? '● Active' : '○ Off'}
              </button>
            </div>
            <div className={styles.actionBtns}>
              <button className={styles.editBtn} onClick={() => setEditing(editing === sv.id ? null : sv.id)}>
                {editing === sv.id ? 'Done' : 'Edit'}
              </button>
              <button className={styles.deleteBtn} onClick={() => deleteService(sv.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Payments Tab ──────────────────────────────────────────────────────────────
function PaymentsTab() {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/payments').then(r => { setPayments(r.data.payments || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const total = payments.filter(p => p.status === 'completed').reduce((s: number, p: any) => s + p.amount, 0)
  const pending = payments.filter(p => p.status === 'pending').length
  const mpesa = payments.filter(p => p.method === 'mpesa' && p.status === 'completed').reduce((s: number, p: any) => s + p.amount, 0)
  const crypto = payments.filter(p => p.method === 'crypto' && p.status === 'completed').reduce((s: number, p: any) => s + p.amount, 0)

  return (
    <div className={styles.tabContent}>
      <div className={styles.paymentStats}>
        {[
          { label: 'Total Collected', value: `KES ${total.toLocaleString()}`, color: 'var(--pulse)' },
          { label: 'Via M-Pesa', value: `KES ${mpesa.toLocaleString()}`, color: 'var(--electric)' },
          { label: 'Via Crypto', value: `KES ${crypto.toLocaleString()}`, color: 'var(--violet)' },
          { label: 'Pending', value: pending.toString(), color: 'var(--red)' },
        ].map((s, i) => (
          <div key={i} className={styles.kpiCard}>
            <div className={styles.kpiValue} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.kpiLabel}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}><h3>Payment History ({payments.length})</h3></div>
        {loading ? <div className={styles.emptyCell}>Loading...</div> : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Reference</th><th>Amount</th><th>Method</th><th>Type</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {payments.map((p: any) => (
                  <tr key={p.id}>
                    <td className={styles.cellMono}>{p.reference?.slice(0, 16) || p.id?.slice(0, 16)}...</td>
                    <td><strong>KES {p.amount?.toLocaleString()}</strong></td>
                    <td><span className={styles.methodBadge}>{p.method === 'mpesa' ? '📱 M-Pesa' : '₿ Crypto'}</span></td>
                    <td className={styles.cellMuted}>{p.type || 'campaign'}</td>
                    <td><span className={`${styles.statusPill} ${p.status === 'completed' ? styles.statusDone : p.status === 'failed' ? styles.statusFail : ''}`} style={{ '--c': p.status === 'completed' ? '#4dffd4' : p.status === 'failed' ? '#ff4d6d' : '#e8ff47' } as any}>{p.status}</span></td>
                    <td className={styles.cellMuted}>{new Date(p.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {payments.length === 0 && <tr><td colSpan={6} className={styles.emptyCell}>No payments yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
