export default function GoalBar({ steps, goal }) {
  const pct = Math.min(100, Math.round((steps / goal) * 100))
  const reached = pct >= 100
  return (
    <div className="goal-bar-wrap">
      <div className="goal-bar-labels">
        <span>{reached ? '🎉 Goal reached!' : `${pct}% of goal`}</span>
        <span>{goal.toLocaleString()} steps</span>
      </div>
      <div className="goal-bar-track">
        <div className={`goal-bar-fill ${reached ? 'goal-reached' : ''}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
