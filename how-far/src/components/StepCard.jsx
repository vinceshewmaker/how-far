export default function StepCard({ steps, miles, activeMins, lastSync }) {
  function timeSince(ts) {
    if (!ts) return null
    const mins = Math.round((Date.now() - ts.getTime()) / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    return `${Math.round(mins / 60)}h ago`
  }
  return (
    <div className="step-card">
      <p className="step-card-question">How far today?</p>
      <p className="step-card-number">{(steps || 0).toLocaleString()}</p>
      <p className="step-card-unit">steps</p>
      <div className="step-card-stats">
        <div className="step-stat">
          <span className="step-stat-val">{miles}</span>
          <span className="step-stat-label">miles</span>
        </div>
        <div className="step-stat-divider" />
        <div className="step-stat">
          <span className="step-stat-val">{activeMins}</span>
          <span className="step-stat-label">active min</span>
        </div>
        {lastSync && (<><div className="step-stat-divider" /><div className="step-stat"><span className="step-stat-val">{timeSince(lastSync)}</span><span className="step-stat-label">last sync</span></div></>)}
      </div>
    </div>
  )
}
