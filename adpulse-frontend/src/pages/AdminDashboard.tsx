import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { api, Campaign } from '../lib/api'
import toast from 'react-hot-toast'
import styles from './AdminDashboard.module.css'

const STATUS_COLOR: Record<string, string> = {
  active: '#4dffd4', pending: '#e8ff47', paused: '#b57bff',
  completed: '#888', rejected: '#ff4d6d'
}

export default function AdminDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const { data } = await api.get('/admin/campaigns')
      setCampaigns(data.campaigns || [])
    } catch { toast.error('Failed to load campaigns') }
    finally { setLoading(false) }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/admin/campaigns/${id}`, { status })
      toast.success(`Campaign ${status}`)
      fetchAll()
    } catch { toast.error('Update failed') }
  }

  const updateStats = async (id: string, impressions: number, clicks: number) => {
    try {
      await api.patch(`/admin/campaigns/${id}/stats`, { impressions, clicks })
      toast.success('Stats updated')
      fetchAll()
    } catch { toast.error('Update failed') }
  }

  const filtered = filter === 'all' ? campaigns : campaigns.filter(c => c.status === filter)

  const totalRevenue = campaigns.filter(c => c.paymentStatus === 'paid').reduce((s, c) => s + c.budget, 0)
  const pendingApproval = campaigns.filter(c => c.status === 'pending').length

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <h1 className={styles.title}>Admin Dashboard 🛡️</h1>

        <div className={styles.adminStats}>
          {[
            { label: 'Total Revenue', value: `KES ${totalRevenue.toLocaleString()}`, color: 'var(--pulse)' },
            { label: 'Total Campaigns', value: campaigns.length.toString(), color: 'var(--electric)' },
            { label: 'Pending Approval', value: pendingApproval.toString(), color: 'var(--red)' },
            { label: 'Active', value: campaigns.filter(c => c.status === 'active').length.toString(), color: 'var(--violet)' },
          ].map((s, i) => (
            <div key={i} className={styles.adminStat}>
              <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.filterRow}>
          {['all', 'pending', 'active', 'paused', 'completed', 'rejected'].map(f => (
            <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        {loading ? (
          <div className={styles.loader}><span className={styles.spinner} /></div>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Campaign</span><span>Advertiser</span><span>Budget</span><span>Payment</span><span>Status</span><span>Actions</span>
            </div>
            {filtered.map(c => (
              <AdminCampaignRow key={c.id} campaign={c} onStatusChange={updateStatus} onStatsUpdate={updateStats} />
            ))}
            {filtered.length === 0 && <div className={styles.empty}>No campaigns for this filter</div>}
          </div>
        )}
      </main>
    </div>
  )
}

function AdminCampaignRow({ campaign: c, onStatusChange, onStatsUpdate }: {
  campaign: Campaign
  onStatusChange: (id: string, status: string) => void
  onStatsUpdate: (id: string, impressions: number, clicks: number) => void
}) {
  const [editingStats, setEditingStats] = useState(false)
  const [imp, setImp] = useState(c.impressions || 0)
  const [clk, setClk] = useState(c.clicks || 0)

  return (
    <div className={styles.tableRow}>
      <div>
        <div className={styles.campaignName}>{c.title}</div>
        <div className={styles.campaignSub}>{c.platforms?.join(', ')}</div>
      </div>
      <div className={styles.cell}><span className={styles.cellText}>{c.userId?.slice(0, 8)}...</span></div>
      <div className={styles.cell}>KES {c.budget?.toLocaleString()}</div>
      <div className={styles.cell}>
        <span className={`${styles.payBadge} ${c.paymentStatus === 'paid' ? styles.paid : ''}`}>
          {c.paymentStatus}
        </span>
      </div>
      <div className={styles.cell}>
        <span className={styles.statusBadge} style={{ '--color': (STATUS_COLOR as any)[c.status] } as React.CSSProperties}>
          {c.status}
        </span>
      </div>
      <div className={styles.actions}>
        {c.status === 'pending' && (
          <>
            <button className={styles.approveBtn} onClick={() => onStatusChange(c.id, 'active')}>Approve</button>
            <button className={styles.rejectBtn} onClick={() => onStatusChange(c.id, 'rejected')}>Reject</button>
          </>
        )}
        {c.status === 'active' && (
          <button className={styles.pauseBtn} onClick={() => onStatusChange(c.id, 'paused')}>Pause</button>
        )}
        {c.status === 'paused' && (
          <button className={styles.approveBtn} onClick={() => onStatusChange(c.id, 'active')}>Resume</button>
        )}
        <button className={styles.statsBtn} onClick={() => setEditingStats(!editingStats)}>Stats</button>
      </div>
      {editingStats && (
        <div className={styles.statsEdit}>
          <input type="number" value={imp} onChange={e => setImp(Number(e.target.value))} placeholder="Impressions" />
          <input type="number" value={clk} onChange={e => setClk(Number(e.target.value))} placeholder="Clicks" />
          <button className={styles.approveBtn} onClick={() => { onStatsUpdate(c.id, imp, clk); setEditingStats(false) }}>Save</button>
        </div>
      )}
    </div>
  )
}
