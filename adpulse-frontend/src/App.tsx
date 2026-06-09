import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NewCampaign from './pages/NewCampaign'
import CampaignDetail from './pages/CampaignDetail'
import AdminDashboard from './pages/AdminDashboard'
import Wallet from './pages/Wallet'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100vh', background:'var(--bg-primary)' }}>
      <div style={{ width:40,height:40,border:'3px solid var(--pulse-dim)',borderTopColor:'var(--pulse)',borderRadius:'50%',animation:'spin 0.8s linear infinite' }} />
    </div>
  )
  return user ? <>{children}</> : <Navigate to="/login" />
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user?.role === 'admin' ? <>{children}</> : <Navigate to="/dashboard" />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-bright)', fontFamily: 'var(--font-body)' },
            success: { iconTheme: { primary: 'var(--pulse)', secondary: 'var(--bg-card)' } },
            error: { iconTheme: { primary: 'var(--red)', secondary: 'var(--bg-card)' } }
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/campaigns/new" element={<PrivateRoute><NewCampaign /></PrivateRoute>} />
          <Route path="/campaigns/:id" element={<PrivateRoute><CampaignDetail /></PrivateRoute>} />
          <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminRoute><AdminDashboard /></AdminRoute></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
