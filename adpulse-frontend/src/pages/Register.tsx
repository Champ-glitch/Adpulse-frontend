import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import styles from './Auth.module.css'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [loading, setLoading] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.password) { toast.error('Fill in all fields'); return }
    setLoading(true)
    try {
      await register(form)
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.orb} />
      <div className={styles.card}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoDot} />
          Ad-Pulse
        </Link>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Start running ads in minutes</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input type="text" placeholder="John Kamau" value={form.name} onChange={set('name')} />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
          </div>
          <div className={styles.field}>
            <label>Phone (M-Pesa)</label>
            <input type="tel" placeholder="0712345678" value={form.phone} onChange={set('phone')} />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />
          </div>
          <button className={styles.btnSubmit} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Create Account'}
          </button>
        </form>
        <p className={styles.switchAuth}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
