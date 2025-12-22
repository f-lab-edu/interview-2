import { useSyncExternalStore } from 'react'
import { tokenStore } from '@/features/common/store'

export const useToken = () => {
  const token = useSyncExternalStore(
    tokenStore.subscribe,
    tokenStore.getSnapshot
  )

  const setToken = (newToken: string) => tokenStore.setToken(newToken)

  return { token, setToken }
}
