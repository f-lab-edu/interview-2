import TicketList from '@/features/ticket-list'
import { getTicketList } from '@/features/ticket-list/api'
import { createBrowserRouter } from 'react-router-dom'

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      Component: TicketList,
      loader: getTicketList
    }
  ])
}
