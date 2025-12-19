import type { ErrorType } from '@/features/error/type'

export const buildErrorSearch = (type: ErrorType, message?: string) => {
  const params = new URLSearchParams({ type })
  if (message) params.set('message', message)
  return `?${params.toString()}`
}
