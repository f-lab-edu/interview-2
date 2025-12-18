import { useState } from 'react'
import { createToken } from '@/features/ticket-info/api'
import type { TokenResponse } from '@/types/ticket'
import type { CommonResponse, ErrorResponse } from '@/lib/http'

export const useCreateToken = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const asyncMutate = async (
    ticketId: string
  ): Promise<CommonResponse<TokenResponse> | ErrorResponse> => {
    setIsLoading(true)
    setIsError(false)
    setIsSuccess(false)

    try {
      const response = await createToken(ticketId)

      if (response.success === false) return response

      setIsSuccess(true)

      return response
    } catch (error) {
      const _error = error as ErrorResponse
      setIsError(true)
      return _error
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, isSuccess, isError, asyncMutate }
}
