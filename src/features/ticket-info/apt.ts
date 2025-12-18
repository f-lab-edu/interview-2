import { http } from '@/lib/http'

export const getTicketInfo = async (ticketId: string) => {
  try {
    const { data } = await http.get(`/api/tickets/${ticketId}`)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
