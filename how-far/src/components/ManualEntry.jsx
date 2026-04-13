import { useState } from 'react'
const QUICK_ADD = [500, 1000, 2000]

export default function ManualEntry({ currentSteps, onAdd, onSet }) {
  const [custom, setCustom] = useState(currentSteps || 0)
  const [tapped, setTapped] = useState(null)
  const [setting, setSetting] = useState(false)
  const [setDone, setSetDone] = useState(false)

  function handleQuickAdd(n) {
    onAdd(n)
    setTapped(n)
    setTimeout(() => setTapped(null), 1200)
  }

  async function handleSet() {
    setSetting(true)
    await onSet(custom)
    setSetting(false)
    setSetDone(true)
    setTimeout(() => setSetDone(false), 1500)
  }

  return (
    <div className="card">
      <p className="card-label">Quick add</p>
      <div className="quick-add-row">
        {QUICK_ADD.map((n) => (
          <button
            key={n}
            className={`btn-quick ${tapped === n ? 'btn-quick-done' : ''}`}
            onClick={() => handleQuickAdd(n)}
          >
            {tapped === n ? `✓ +${n.toLocaleString()}` : `+${n.toLocaleString()}`}
          </button>
        ))}
      </div>
      <p className="card-label" style={{ marginTop: '1.2rem' }}>
        Set exact total — {custom.toLocaleString()} steps
      </p>
      <input
        type="range"
        min="0"
        max="30000"
        step="100"
        value={custom}
        className="goal-slider"
        onChange={(e) => setCustom(Number(e.target.value))}
      />
      <div className="slider-labels"><span>0</span><span>30,000</span></div>
      <button
        className="btn-secondary"
        style={{ marginTop: '0.8rem' }}
        onClick={handleSet}
        disabled={setting}
      >
        {setting ? 'Saving…' : setDone ? '✓ Saved!' : `Set to ${custom.toLocaleString()} steps`}
      </button>
    </div>
  )
}
