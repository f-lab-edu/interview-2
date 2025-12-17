import { http } from '@/lib/http'
import type { Ticket } from '@/types/ticket'

export const getTicketList = async () => {
  try {
    const res = await http.get<Ticket[]>('/api/tickets')
    return res.data
  } catch (error) {
    return error
  }
}
