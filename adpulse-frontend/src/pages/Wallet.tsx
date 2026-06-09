import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import { api } from '../lib/api'
import toast from 'react-hot-toast'
import styles from './Wallet.module.css'

export default function Wallet() {
  const { user } = useAuth()
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('mpesa')
  const [phone, setPhone] = useState(user?.phone || '')
  const [loading, setLoading] = useState(false)

  const topUp = async () => {
    if (!amount || Number(amount) < 100) { toast.error('Minimum top-up is KES 100'); return }
    if (method === 'mpesa' && !phone) { toast.error('Enter phone number'); return }
    setLoading(true)
    try {
      await api.post('/payments/topup', { amount: Number(amount), method, phone })
      if (method === 'mpesa') toast.success('STK Push sent! Check your phone.')
      else toast.success('Crypto invoice created!')
      setAmount('')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Top-up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <h1 className={styles.title}>Wallet</h1>

        <div className={styles.balanceCard}>
          <div className={styles.balanceLabel}>Ad Credit Balance</div>
          <div className={styles.balanceValue}>KES {(user?.balance || 0).toLocaleString()}</div>
          <div className={styles.balanceNote}>Used automatically when campaigns are paid</div>
        </div>

        <div className={styles.topUpCard}>
          <h2>Top Up Balance</h2>
          <div className={styles.field}>
            <label>Amount (KES)</label>
            <input type="number" placeholder="e.g. 1000" value={amount} onChange={e => setAmount(e.target.value)} min="100" />
          </div>
          <div className={styles.field}>
            <label>Payment Method</label>
            <div className={styles.chips}>
              <button type="button" className={`${styles.chip} ${method === 'mpesa' ? styles.chipActive : ''}`}
                onClick={() => setMethod('mpesa')}>📱 M-Pesa</button>
              <button type="button" className={`${styles.chip} ${method === 'crypto' ? styles.chipActive : ''}`}
                onClick={() => setMethod('crypto')}>₿ Crypto</button>
            </div>
          </div>
          {method === 'mpesa' && (
            <div className={styles.field}>
              <label>Phone Number</label>
              <input type="tel" placeholder="0712345678" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          )}
          <button className={styles.topUpBtn} onClick={topUp} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : `Top Up KES ${amount || '0'}`}
          </button>
        </div>
      </main>
    </div>
  )
}
