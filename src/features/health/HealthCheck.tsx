import { useState } from 'react'
import { ApiError } from '@/lib/api-client'
import { getHealth } from './health.api'

export function HealthCheck() {
  const [message, setMessage] = useState<string>()
  const [loading, setLoading] = useState(false)

  async function checkBackend() {
    setLoading(true)
    try {
      const result = await getHealth()
      setMessage(`Backend พร้อมใช้งาน: ${result.status}`)
    } catch (error) {
      setMessage(error instanceof ApiError ? `(${error.status})` : 'ไม่สามารถเชื่อมต่อ backend ได้')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="health-check">
      <button type="button" onClick={checkBackend} disabled={loading}>
        {loading ? 'กำลังตรวจสอบ...' : 'ตรวจสอบ backend'}
      </button>
      {message && <p role="status">{message}</p>}
    </div>
  )
}
