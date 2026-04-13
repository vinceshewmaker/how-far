import { useState, useEffect } from 'react'
import { useSync } from './hooks/useSync'
import { useHealth } from './hooks/useHealth'
import HomeTab from './tabs/HomeTab'
import SyncTab from './tabs/SyncTab'
import ProgressTab from './tabs/ProgressTab'

export default function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('hf_name') || '')
  const [groupCode, setGroupCode] = useState(() => localStorage.getItem('hf_group') || '')
  const [tab, setTab] = useState('home')
  const [joined, setJoined] = useState(() =>
    !!(localStorage.getItem('hf_name') && localStorage.getItem('hf_group'))
  )

  const health = useHealth()
  const sync = useSync(joined ? groupCode : null, joined ? userName : null)

  useEffect(() => {
    if (joined) {
      health.syncSteps().then((steps) => {
        if (steps !== null) sync.pushSteps(steps)
      })
    }
  }, [joined])

  function handleJoin(e) {
    e.preventDefault()
    const name = e.target.name.value.trim()
    const code = e.target.code.value.trim().toUpperCase()
    if (!name || !code) return
    localStorage.setItem('hf_name', name)
    localStorage.setItem('hf_group', code)
    setUserName(name)
    setGroupCode(code)
    setJoined(true)
  }

  if (!joined) {
    return (
      <div className="join-screen">
        <div className="join-card">
          <div className="join-logo">
            <span className="join-steps-icon">👟</span>
          </div>
          <h1 className="join-title">How Far</h1>
          <p className="join-subtitle">Group step tracker. No accounts. No friction.</p>
          <form onSubmit={handleJoin} className="join-form">
            <label className="field-label">Your name</label>
            <input name="name" className="field-input" placeholder="e.g. Jamie" autoComplete="off" required />
            <label className="field-label">Group code</label>
            <input name="code" className="field-input" placeholder="e.g. SUNRISECREW" autoComplete="off" style={{ textTransform: 'uppercase' }} required />
            <p className="join-hint">Anyone with the same code sees the same live feed.</p>
            <button type="submit" className="btn-primary">Join group →</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="tab-content">
        {tab === 'home' && <HomeTab userName={userName} groupCode={groupCode} health={health} sync={sync} />}
        {tab === 'sync' && <SyncTab health={health} sync={sync} userName={userName} groupCode={groupCode} />}
        {tab === 'progress' && <ProgressTab sync={sync} userName={userName} />}
      </div>
      <nav className="tab-bar">
        <button className={`tab-btn ${tab === 'home' ? 'active' : ''}`} onClick={() => setTab('home')}>
          <span className="tab-icon">🏠</span>
          <span className="tab-label">Home</span>
        </button>
        <button className={`tab-btn ${tab === 'sync' ? 'active' : ''}`} onClick={() => setTab('sync')}>
          <span className="tab-icon">⟳</span>
          <span className="tab-label">Sync</span>
        </button>
        <button className={`tab-btn ${tab === 'progress' ? 'active' : ''}`} onClick={() => setTab('progress')}>
          <span className="tab-icon">📈</span>
          <span className="tab-label">Progress</span>
        </button>
      </nav>
    </div>
  )
}
