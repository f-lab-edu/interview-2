import { http } from '@/lib/http'
import type { Ticket } from '@/types/ticket'

export const getTicketList = async () => {
  const res = await http.get<Ticket[]>('/api/tickets')
  return res.data
}
