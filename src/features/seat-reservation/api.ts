import { http } from '@/lib/http'
import type { Seat } from '@/types/ticket'

export const getSeatList = async (ticketId: string) => {
  return await http.get<Seat[]>(`/api/tickets/${ticketId}/seats`)
}
