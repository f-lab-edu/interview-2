import { useState } from 'react'
import { http } from '@/lib/http'
import type { Reservation } from '@/types/ticket'

export const useApplyReservation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const asyncMutate = async (seatId: string, tokenId: string) => {
    setIsLoading(true)
    setIsError(false)
    setIsSuccess(false)
    try {
      const response = await http.post<
        { seatId: string; tokenId: string },
        Reservation
      >('/api/reservations', { seatId, tokenId })
      setIsSuccess(true)

      return response.data
    } catch (error) {
      setIsError(true)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { isError, isSuccess, isLoading, asyncMutate }
}
