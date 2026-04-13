import StepCard from '../components/StepCard'
import GoalBar from '../components/GoalBar'
import Leaderboard from '../components/Leaderboard'

export default function HomeTab({ userName, groupCode, health, sync, onLeave }) {
  const myData = sync.myData || {}
  const steps = health.steps ?? myData.stepsToday ?? 0
  const goal = myData.goal || 10000
  const miles = (steps / 2000).toFixed(1)
  const activeMins = Math.round(steps / 100)

  return (
    <div className="tab-page">
      <div className="tab-header">
        <div>
          <p className="tab-greeting">Hey {userName} 👋</p>
          <p className="tab-group-code">Group: {groupCode}</p>
        </div>
        <button className="btn-leave" onClick={onLeave}>Leave</button>
      </div>
      <StepCard steps={steps} miles={miles} activeMins={activeMins} lastSync={health.lastSync} />
      <GoalBar steps={steps} goal={goal} />
      <div className="section-label">Group today</div>
      <Leaderboard members={sync.members} userName={userName} />
    </div>
  )
}
