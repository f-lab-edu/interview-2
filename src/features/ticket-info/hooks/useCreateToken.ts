import { useState } from 'react'
import { createToken } from '@/features/ticket-info/api'

export const useCreateToken = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const asyncMutate = async (ticketId: string) => {
    setIsLoading(true)
    setIsError(false)
    setIsSuccess(false)

    try {
      const response = await createToken(ticketId)
      setIsSuccess(true)
      return response
    } catch (error) {
      setIsError(true)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, isSuccess, isError, asyncMutate }
}
