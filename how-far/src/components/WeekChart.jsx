export default function WeekChart({ days, goal }) {
  const max = Math.max(...days.map((d) => d.steps), goal, 1)
  return (
    <div className="week-chart">
      {days.map((d) => {
        const heightPct = Math.round((d.steps / max) * 100)
        const goalLinePct = Math.round((goal / max) * 100)
        const isToday = d.label === 'Today'
        const reached = d.steps >= goal
        return (
          <div key={d.key} className="bar-col">
            <div className="bar-wrap">
              <div className="goal-line" style={{ bottom: `${goalLinePct}%` }} />
              <div className={`bar-fill ${isToday ? 'bar-today' : ''} ${reached ? 'bar-reached' : ''}`} style={{ height: `${heightPct}%` }} />
            </div>
            <span className="bar-label">{d.label}</span>
            <span className="bar-val">{d.steps > 0 ? (d.steps / 1000).toFixed(1) + 'k' : '—'}</span>
          </div>
        )
      })}
    </div>
  )
}
