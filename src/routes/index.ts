import TicketInfo from '@/features/ticket-info'
import { getTicketInfo } from '@/features/ticket-info/apt'
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
    }
  ])
}
