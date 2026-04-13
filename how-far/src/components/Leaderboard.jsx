export default function Leaderboard({ members, userName }) {
  if (!members.length) {
    return <div className="card leaderboard-empty"><p>No one in the group yet — share your group code to invite friends.</p></div>
  }
  return (
    <div className="leaderboard">
      {members.map((m, i) => {
        const isMe = m.name === userName
        const pct = Math.min(100, Math.round((m.stepsToday || 0) / (m.goal || 10000) * 100))
        return (
          <div key={m.name} className={`leaderboard-row ${isMe ? 'leaderboard-me' : ''}`}>
            <span className="lb-rank">{i + 1}</span>
            <div className="lb-info">
              <div className="lb-top">
                <span className="lb-name">{m.name}{isMe ? ' (you)' : ''}</span>
                <span className="lb-steps">{(m.stepsToday || 0).toLocaleString()}</span>
              </div>
              <div className="lb-bar-track"><div className="lb-bar-fill" style={{ width: `${pct}%` }} /></div>
              <div className="lb-bottom">
                <span className="lb-streak">{m.streak || 0} day streak</span>
                <span className="lb-pct">{pct}%</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
