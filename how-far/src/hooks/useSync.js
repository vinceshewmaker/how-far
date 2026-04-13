import { useEffect, useState, useCallback } from 'react'
import { ref, onValue, set, get } from 'firebase/database'
import { db } from '../firebase'

export function useSync(groupCode, userName) {
  const [members, setMembers] = useState([])
  const [myData, setMyData] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (!groupCode || !userName) return
    const groupRef = ref(db, `groups/${groupCode}/members`)
    const unsub = onValue(groupRef, (snap) => {
      const data = snap.val() || {}
      const list = Object.entries(data).map(([name, vals]) => ({ name, ...vals }))
      list.sort((a, b) => (b.stepsToday || 0) - (a.stepsToday || 0))
      setMembers(list)
      const me = data[userName]
      if (me) setMyData(me)
      setConnected(true)
    })
    return () => unsub()
  }, [groupCode, userName])

  const pushSteps = useCallback(async (steps) => {
    if (!groupCode || !userName) return
    const memberRef = ref(db, `groups/${groupCode}/members/${userName}`)
    const snap = await get(memberRef)
    const existing = snap.val() || {}
    const today = new Date().toDateString()
    const history = existing.history || {}
    history[today] = steps
    let streak = 0
    const goal = existing.goal || 10000
    for (let i = 0; i < 30; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toDateString()
      if ((history[key] || 0) >= goal) streak++
      else if (i > 0) break
    }
    await set(memberRef, {
      ...existing,
      stepsToday: steps,
      lastSync: Date.now(),
      history,
      streak,
      goal: existing.goal || 10000
    })
  }, [groupCode, userName])

  const setGoal = useCallback(async (goal) => {
    if (!groupCode || !userName) return
    const memberRef = ref(db, `groups/${groupCode}/members/${userName}`)
    const snap = await get(memberRef)
    const existing = snap.val() || {}
    await set(memberRef, { ...existing, goal })
  }, [groupCode, userName])

  return { members, myData, connected, pushSteps, setGoal }
}
