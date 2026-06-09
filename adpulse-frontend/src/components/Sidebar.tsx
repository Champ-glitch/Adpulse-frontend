import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Sidebar.module.css'

const navItems = [
  { to: '/dashboard', icon: '⚡', label: 'Dashboard' },
  { to: '/campaigns/new', icon: '➕', label: 'New Campaign' },
  { to: '/wallet', icon: '💳', label: 'Wallet' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoDot} />
        Ad-Pulse
      </div>

      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            end={item.to === '/dashboard'}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.navIcon}>🛡️</span>
            <span>Admin</span>
          </NavLink>
        )}
      </nav>

      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div className={styles.userName}>{user?.name}</div>
            <div className={styles.userRole}>{user?.role}</div>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/') }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
        </button>
      </div>
    </aside>
  )
}
