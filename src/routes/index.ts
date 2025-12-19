import ErrorPage from '@/features/error'
import Queue from '@/features/queue'
import SeatReservation from '@/features/seat-reservation'
import { getSeatList } from '@/features/seat-reservation/api'
import TicketInfo from '@/features/ticket-info'
import { getTicketInfo } from '@/features/ticket-info/api'
import TicketList from '@/features/ticket-list'
import { getTicketList } from '@/features/ticket-list/api'
import { createBrowserRouter } from 'react-router-dom'

export const createAppRouter = () => {
  //TODO: errorElement 설정
  return createBrowserRouter([
    {
      path: '/',
      Component: TicketList,
      loader: getTicketList
    },
    {
      path: 'ticket/:id',
      Component: TicketInfo,
      loader: async ({ params }) => await getTicketInfo(params.id!)
    },
    {
      path: 'ticket/:id/seat',
      Component: SeatReservation,
      loader: async ({ params }) => await getSeatList(params.id!)
    },
    {
      path: '/error',
      Component: ErrorPage
    },
    {
      path: 'ticket/:id/queue',
      Component: Queue
    }
  ])
}
