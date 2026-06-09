import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adpulse_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adpulse_token')
      localStorage.removeItem('adpulse_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'advertiser' | 'admin'
  balance: number
  createdAt: string
}

export interface Campaign {
  id: string
  userId: string
  title: string
  description: string
  platforms: string[]
  adType: string
  budget: number
  dailyBudget: number
  startDate: string
  endDate: string
  targetAudience: string
  targetLocation: string
  targetAge: string
  creativeUrl: string
  creativeType: 'image' | 'video' | 'text'
  status: 'pending' | 'active' | 'paused' | 'completed' | 'rejected'
  paymentStatus: 'pending' | 'paid'
  paymentMethod: 'mpesa' | 'crypto'
  impressions: number
  clicks: number
  spend: number
  ctr: number
  createdAt: string
}

export interface Payment {
  id: string
  userId: string
  campaignId: string
  amount: number
  method: 'mpesa' | 'crypto'
  status: 'pending' | 'completed' | 'failed'
  reference: string
  createdAt: string
}
