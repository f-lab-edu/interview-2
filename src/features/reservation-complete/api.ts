import { http } from '@/lib/http'

export const getReservationInfo = async (reservationId: string) => {
  const { data } = await http.get(`/api/reservations/${reservationId}`)
  return data
}
