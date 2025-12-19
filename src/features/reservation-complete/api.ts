import { http, HttpError } from '@/lib/http'

export const getReservationInfo = async (reservationId: string) => {
  try {
    const { data } = await http.get(`/api/reservations/${reservationId}`)
    return data
  } catch (error) {
    if (error instanceof HttpError) {
      throw error.data
    }

    console.error(error)
  }
}
