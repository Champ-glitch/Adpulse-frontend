import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import styles from './Auth.module.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Fill in all fields'); return }
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed')
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
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className={styles.btnSubmit} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Sign In'}
          </button>
        </form>
        <p className={styles.switchAuth}>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}
