import { useState, useCallback } from 'react'

export function useHealth() {
  const [steps, setSteps] = useState(null)
  const [supported, setSupported] = useState(null)
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)
  const [error, setError] = useState(null)

  const syncSteps = useCallback(async () => {
    setSyncing(true)
    setError(null)
    if (typeof window.webkit?.messageHandlers?.health === 'undefined' &&
        typeof window.__WEB_HEALTHKIT__ === 'undefined') {
      setSupported(false)
      setSyncing(false)
      return null
    }
    try {
      setSupported(true)
      const startOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)
      const result = await new Promise((resolve, reject) => {
        const requestId = `steps_${Date.now()}`
        window.__HEALTH_CALLBACKS__ = window.__HEALTH_CALLBACKS__ || {}
        window.__HEALTH_CALLBACKS__[requestId] = (data) => {
          if (data.error) reject(new Error(data.error))
          else resolve(data)
        }
        const msg = {
          type: 'querySteps',
          requestId,
          startDate: startOfDay.toISOString(),
          endDate: new Date().toISOString()
        }
        if (window.webkit?.messageHandlers?.health) {
          window.webkit.messageHandlers.health.postMessage(msg)
        } else if (window.__WEB_HEALTHKIT__) {
          window.__WEB_HEALTHKIT__.query(msg)
        }
        setTimeout(() => reject(new Error('Health query timed out')), 5000)
      })
      const stepCount = Math.round(result.value || 0)
      setSteps(stepCount)
      setLastSync(new Date())
      setSyncing(false)
      return stepCount
    } catch (err) {
      setError(err.message)
      setSyncing(false)
      return null
    }
  }, [])

  const setManualSteps = useCallback((count) => {
    setSteps(count)
    setLastSync(new Date())
    setSupported(false)
  }, [])

  return { steps, supported, syncing, lastSync, error, syncSteps, setManualSteps }
}
