import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import Sidebar from '../components/Sidebar'
import { api } from '../lib/api'
import styles from './NewCampaign.module.css'

const PLATFORMS = [
  { name: 'TikTok', icon: '🎵', color: '#ff0050' },
  { name: 'Instagram', icon: '📸', color: '#e1306c' },
  { name: 'Facebook', icon: '👥', color: '#1877f2' },
  { name: 'Twitter/X', icon: '🐦', color: '#1da1f2' },
  { name: 'YouTube', icon: '▶️', color: '#ff0000' },
]
const AD_TYPES = ['Image', 'Video', 'Text/Sponsored']
const STEPS = ['Details', 'Creative', 'Targeting', 'Budget & Pay']

export default function NewCampaign() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [form, setForm] = useState({
    title: '', description: '', platforms: [] as string[],
    adType: '', budget: '', dailyBudget: '',
    startDate: '', endDate: '',
    targetAudience: '', targetLocation: 'Kenya', targetAge: '18-35',
    paymentMethod: 'mpesa', phone: '',
    cryptoCurrency: 'USDT'
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const togglePlatform = (p: string) =>
    setForm(f => ({
      ...f,
      platforms: f.platforms.includes(p) ? f.platforms.filter(x => x !== p) : [...f.platforms, p]
    }))

  const onDrop = useCallback((files: File[]) => { if (files[0]) setFile(files[0]) }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [], 'video/*': [] }, maxFiles: 1
  })

  const nextStep = () => {
    if (step === 0 && (!form.title || form.platforms.length === 0 || !form.adType)) {
      toast.error('Fill in campaign details'); return
    }
    if (step === 1 && form.adType !== 'Text/Sponsored' && !file) {
      toast.error('Upload your creative'); return
    }
    setStep(s => Math.min(s + 1, STEPS.length - 1))
  }

  const submit = async () => {
    if (!form.budget || !form.startDate || !form.endDate) { toast.error('Fill in budget and dates'); return }
    if (form.paymentMethod === 'mpesa' && !form.phone) { toast.error('Enter M-Pesa phone number'); return }
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, Array.isArray(v) ? JSON.stringify(v) : v))
      if (file) fd.append('creative', file)
      const { data } = await api.post('/campaigns', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      if (form.paymentMethod === 'mpesa') {
        toast.success('STK Push sent to your phone!')
      } else {
        toast.success('Campaign created! Complete crypto payment.')
      }
      navigate(`/campaigns/${data.campaign.id}`)
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to create campaign')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <h1 className={styles.title}>New Campaign</h1>
        </div>

        {/* Progress */}
        <div className={styles.progress}>
          {STEPS.map((s, i) => (
            <div key={i} className={`${styles.progressStep} ${i === step ? styles.progressActive : ''} ${i < step ? styles.progressDone : ''}`}>
              <div className={styles.progressDot}>{i < step ? '✓' : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className={styles.formCard}>
          {/* Step 0: Details */}
          {step === 0 && (
            <div className={styles.stepContent}>
              <h2>Campaign Details</h2>
              <div className={styles.field}>
                <label>Campaign Name</label>
                <input type="text" placeholder="e.g. Nairobi Product Launch" value={form.title} onChange={set('title')} />
              </div>
              <div className={styles.field}>
                <label>Description</label>
                <textarea placeholder="What's this campaign about?" value={form.description} onChange={set('description')} rows={3} />
              </div>
              <div className={styles.field}>
                <label>Ad Type</label>
                <div className={styles.chips}>
                  {AD_TYPES.map(t => (
                    <button key={t} type="button"
                      className={`${styles.chip} ${form.adType === t ? styles.chipActive : ''}`}
                      onClick={() => setForm(f => ({ ...f, adType: t }))}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.field}>
                <label>Platforms (select all)</label>
                <div className={styles.chips}>
                  {PLATFORMS.map(p => (
                    <button key={p.name} type="button"
                      className={`${styles.chip} ${form.platforms.includes(p.name) ? styles.chipActive : ''}`}
                      style={form.platforms.includes(p.name) ? { borderColor: p.color, color: p.color, background: p.color + '15' } : {}}
                      onClick={() => togglePlatform(p.name)}>
                      {p.icon} {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Creative */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2>Upload Creative</h2>
              {form.adType === 'Text/Sponsored' ? (
                <div className={styles.field}>
                  <label>Ad Copy (text content)</label>
                  <textarea placeholder="Write your ad text here..." value={form.description} onChange={set('description')} rows={6} />
                </div>
              ) : (
                <div {...getRootProps()} className={`${styles.dropzone} ${isDragActive ? styles.dropzoneDrag : ''} ${file ? styles.dropzoneDone : ''}`}>
                  <input {...getInputProps()} />
                  {file ? (
                    <div className={styles.filePreview}>
                      {file.type.startsWith('image') ? (
                        <img src={URL.createObjectURL(file)} alt="preview" />
                      ) : (
                        <video src={URL.createObjectURL(file)} controls style={{ maxHeight: 200 }} />
                      )}
                      <p className={styles.fileName}>{file.name}</p>
                      <button type="button" className={styles.removeFile} onClick={e => { e.stopPropagation(); setFile(null) }}>Remove</button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.dropIcon}>📁</div>
                      <p>Drop your {form.adType === 'Video' ? 'video' : 'image'} here</p>
                      <span>or click to browse</span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Targeting */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h2>Target Audience</h2>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Location</label>
                  <input type="text" placeholder="e.g. Nairobi, Kenya" value={form.targetLocation} onChange={set('targetLocation')} />
                </div>
                <div className={styles.field}>
                  <label>Age Range</label>
                  <select value={form.targetAge} onChange={set('targetAge')}>
                    <option>13-17</option><option>18-24</option><option>18-35</option>
                    <option>25-34</option><option>35-44</option><option>45-54</option><option>55+</option><option>All ages</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label>Interests / Keywords</label>
                <input type="text" placeholder="e.g. fashion, tech, food, gaming" value={form.targetAudience} onChange={set('targetAudience')} />
              </div>
            </div>
          )}

          {/* Step 3: Budget & Pay */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <h2>Budget & Payment</h2>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label>Total Budget (KES)</label>
                  <input type="number" placeholder="e.g. 5000" value={form.budget} onChange={set('budget')} min="500" />
                </div>
                <div className={styles.field}>
                  <label>Daily Budget (KES)</label>
                  <input type="number" placeholder="e.g. 500" value={form.dailyBudget} onChange={set('dailyBudget')} />
                </div>
                <div className={styles.field}>
                  <label>Start Date</label>
                  <input type="date" value={form.startDate} onChange={set('startDate')} />
                </div>
                <div className={styles.field}>
                  <label>End Date</label>
                  <input type="date" value={form.endDate} onChange={set('endDate')} />
                </div>
              </div>
              <div className={styles.field}>
                <label>Payment Method</label>
                <div className={styles.chips}>
                  <button type="button" className={`${styles.chip} ${form.paymentMethod === 'mpesa' ? styles.chipActive : ''}`}
                    onClick={() => setForm(f => ({ ...f, paymentMethod: 'mpesa' }))}>📱 M-Pesa</button>
                  <button type="button" className={`${styles.chip} ${form.paymentMethod === 'crypto' ? styles.chipActive : ''}`}
                    onClick={() => setForm(f => ({ ...f, paymentMethod: 'crypto' }))}>₿ Crypto</button>
                </div>
              </div>
              {form.paymentMethod === 'mpesa' && (
                <div className={styles.field}>
                  <label>M-Pesa Phone Number</label>
                  <input type="tel" placeholder="0712345678" value={form.phone} onChange={set('phone')} />
                </div>
              )}
              {form.paymentMethod === 'crypto' && (
                <div className={styles.field}>
                  <label>Cryptocurrency</label>
                  <select value={form.cryptoCurrency} onChange={set('cryptoCurrency')}>
                    <option>USDT</option><option>BTC</option><option>ETH</option><option>USDC</option>
                  </select>
                </div>
              )}
              <div className={styles.summaryBox}>
                <div className={styles.summaryRow}><span>Campaign</span><strong>{form.title}</strong></div>
                <div className={styles.summaryRow}><span>Platforms</span><strong>{form.platforms.join(', ')}</strong></div>
                <div className={styles.summaryRow}><span>Total Budget</span><strong>KES {Number(form.budget || 0).toLocaleString()}</strong></div>
                <div className={styles.summaryRow}><span>Payment</span><strong>{form.paymentMethod === 'mpesa' ? '📱 M-Pesa' : '₿ Crypto'}</strong></div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            {step > 0 && (
              <button className={styles.backStep} onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
            {step < STEPS.length - 1 ? (
              <button className={styles.nextBtn} onClick={nextStep}>Continue →</button>
            ) : (
              <button className={styles.submitBtn} onClick={submit} disabled={loading}>
                {loading ? <span className={styles.spinner} /> : '🚀 Launch Campaign'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
