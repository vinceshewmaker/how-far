import WeekChart from '../components/WeekChart'

export default function ProgressTab({ sync }) {
  const myData = sync.myData || {}
  const history = myData.history || {}
  const goal = myData.goal || 10000
  const streak = myData.streak || 0

  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toDateString()
    const label = i === 0 ? 'Today' : d.toLocaleDateString([], { weekday: 'short' })
    days.push({ label, steps: history[key] || 0, key })
  }

  const weekTotal = days.reduce((sum, d) => sum + d.steps, 0)
  const weekAvg = Math.round(weekTotal / 7)
  const personalBest = Math.max(...days.map((d) => d.steps), 0)

  return (
    <div className="tab-page">
      <div className="tab-header">
        <h2 className="tab-title">Progress</h2>
      </div>
      <div className="stat-row">
        <div className="stat-box"><p className="stat-number">{streak}</p><p className="stat-label">day streak 🔥</p></div>
        <div className="stat-box"><p className="stat-number">{weekAvg.toLocaleString()}</p><p className="stat-label">avg / day</p></div>
        <div className="stat-box"><p className="stat-number">{personalBest.toLocaleString()}</p><p className="stat-label">personal best</p></div>
      </div>
      <div className="card">
        <p className="card-label">Last 7 days</p>
        <WeekChart days={days} goal={goal} />
      </div>
      <div className="card" style={{ textAlign: 'center' }}>
        <p className="card-label">This week</p>
        <p className="big-number">{weekTotal.toLocaleString()}</p>
        <p className="big-label">total steps</p>
        <p className="big-sub">{(weekTotal / 2000).toFixed(1)} miles</p>
      </div>
    </div>
  )
}
