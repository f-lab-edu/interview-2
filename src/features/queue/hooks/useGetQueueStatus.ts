import { useEffect, useRef, useState } from 'react'
import { http, HttpError } from '@/lib/http'
import type { TokenQueueStatus } from '@/types/ticket'
import { useInterval } from '@/features/common/hooks'

interface GetQueueStatusProps {
  tokenId: string | null
  failedCallback: () => void
  successCallback: () => void
  errorCallback: () => void
}

export const useGetQueueStatus = ({
  tokenId,
  failedCallback,
  successCallback,
  errorCallback
}: GetQueueStatusProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [queueInfo, setQueueInfo] = useState<TokenQueueStatus | null>(null)

  const firedRef = useRef(false)
  const callbackRef = useRef({
    successCallback,
    failedCallback
  })

  useInterval(
    async () => {
      await getQueueStatus()
    },
    isError === false &&
      (queueInfo === null || queueInfo?.token.status === 'waiting')
      ? 800
      : null
  )

  useEffect(() => {
    callbackRef.current.successCallback = successCallback
    callbackRef.current.failedCallback = failedCallback
  }, [successCallback, failedCallback])

  useEffect(() => {
    if (
      queueInfo === null ||
      queueInfo.token.status === 'waiting' ||
      firedRef.current
    )
      return

    firedRef.current = true
    if (queueInfo.token.status === 'expired') {
      callbackRef.current.failedCallback()
    } else {
      callbackRef.current.successCallback()
    }
  }, [queueInfo])

  const getQueueStatus = async () => {
    setIsLoading(true)
    setIsSuccess(false)
    setIsError(false)
    try {
      const response = await http.get<TokenQueueStatus>(`/api/queue/${tokenId}`)
      setIsSuccess(true)
      setQueueInfo(response.data)
      return response.data
    } catch (error) {
      setIsError(true)
      if (error instanceof HttpError) {
        if (error.status === 404) errorCallback()
        throw error.data
      }
      console.error(error)
    }
  }

  return { isLoading, isSuccess, data: queueInfo }
}
