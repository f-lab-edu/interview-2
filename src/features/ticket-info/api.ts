import { http } from '@/lib/http'
import type { Ticket, TokenResponse } from '@/types/ticket'

export const getTicketInfo = async (ticketId: string) => {
  try {
    const { data } = await http.get<Ticket>(`/api/tickets/${ticketId}`)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createToken = async (ticketId: string) => {
  try {
    const response = await http.post<{ id: string }, TokenResponse>(
      `/api/tickets/${ticketId}/enter`,
      { id: ticketId }
    )
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
