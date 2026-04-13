import ManualEntry from '../components/ManualEntry'

export default function SyncTab({ health, sync }) {
  const myData = sync.myData || {}
  const currentSteps = health.steps ?? myData.stepsToday ?? 0

  async function handleSync() {
    const steps = await health.syncSteps()
    if (steps !== null) await sync.pushSteps(steps)
  }

  function formatTime(ts) {
    if (!ts) return 'Never'
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="tab-page">
      <div className="tab-header">
        <h2 className="tab-title">Sync</h2>
      </div>
      <div className="card">
        <div className="sync-status-row">
          <div className={`sync-dot ${health.supported === true ? 'dot-green' : health.supported === false ? 'dot-amber' : 'dot-gray'}`} />
          <span className="sync-status-label">
            {health.supported === true ? 'Apple Health connected' : health.supported === false ? 'Manual mode' : 'Checking Health access…'}
          </span>
        </div>
        {health.lastSync && <p className="sync-last">Last sync: {formatTime(health.lastSync.getTime())}</p>}
        {health.error && <p className="sync-error">{health.error}</p>}
        <button className="btn-secondary" onClick={handleSync} disabled={health.syncing}>
          {health.syncing ? 'Syncing…' : '⟳ Sync now'}
        </button>
        {health.supported === false && (
          <p className="sync-note">Apple Health sync works in Safari on iPhone when installed as a PWA. Use the buttons below to log steps manually on other devices.</p>
        )}
      </div>
      <div className="card">
        <p className="card-label">Daily step goal</p>
        <p className="goal-display">{(myData.goal || 10000).toLocaleString()} steps</p>
        <input type="range" min="1000" max="25000" step="500" value={myData.goal || 10000} className="goal-slider" onChange={(e) => sync.setGoal(Number(e.target.value))} />
        <div className="slider-labels"><span>1,000</span><span>25,000</span></div>
      </div>
      <div className="section-label">Log steps manually</div>
      <ManualEntry
        currentSteps={currentSteps}
        onAdd={(steps) => { const n = currentSteps + steps; health.setManualSteps(n); sync.pushSteps(n) }}
        onSet={(steps) => { health.setManualSteps(steps); sync.pushSteps(steps) }}
      />
    </div>
  )
}
