import { useEffect, useRef } from 'react'

export const useInterval = (
  callback: () => void | Promise<void>,
  delay: number | null
) => {
  const savedCallback = useRef<() => void>(null)

  // 최신 callback 유지
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // interval 설정
  useEffect(() => {
    if (delay === null) return

    const id = window.setInterval(() => {
      savedCallback.current?.()
    }, delay)

    return () => window.clearInterval(id)
  }, [delay])
}
