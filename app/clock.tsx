'use client'

import { useEffect, useState } from 'react'

export default function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }))
      const h = String(d.getHours()).padStart(2, '0')
      const m = String(d.getMinutes()).padStart(2, '0')
      return `${h}.${m}`
    }
    setTime(tick())
    const id = setInterval(() => setTime(tick()), 1000)
    return () => clearInterval(id)
  }, [])

  return <p className="text-[14px] text-white" style={{ opacity: 0.65 }}>{time}</p>
}
