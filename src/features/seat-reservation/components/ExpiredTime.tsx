import { memo, useEffect, useRef, useState } from 'react'
import { Timer } from '@/assets/icons'
import { useInterval } from '@/features/common/hooks'

interface ExpiredTimeProps {
  onTime: () => void
}
export const ExpiredTime = memo(({ onTime }: ExpiredTimeProps) => {
  const [ms, setMs] = useState(60_000)
  const firedRef = useRef(false)
  const onTimeRef = useRef(onTime)
  useEffect(() => {
    onTimeRef.current = onTime
  }, [onTime])

  useInterval(
    () => {
      setMs((prev) => Math.max(0, prev - 1000))
    },
    ms <= 0 ? null : 1000
  )

  useEffect(() => {
    if (ms !== 0 || firedRef.current) return
    firedRef.current = true
    onTimeRef.current()
  }, [ms])
  return (
    <div className='flex gap-1 bg-neutral-200 rounded-xl py-2 px-2'>
      <Timer />
      <div className='w-8 text-center'>
        <p>{ms / 1000}</p>
      </div>
    </div>
  )
})
