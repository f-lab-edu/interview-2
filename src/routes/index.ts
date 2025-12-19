/* eslint-disable no-useless-catch */

import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from '@/features/error'
import Queue from '@/features/queue'
import ReservationComplete from '@/features/reservation-complete'
import { getReservationInfo } from '@/features/reservation-complete/api'
import SeatReservation from '@/features/seat-reservation'
import { getSeatList } from '@/features/seat-reservation/api'
import TicketInfo from '@/features/ticket-info'
import { getTicketInfo } from '@/features/ticket-info/api'
import TicketList from '@/features/ticket-list'
import { getTicketList } from '@/features/ticket-list/api'

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      Component: TicketList,
      loader: async () => {
        try {
          return await getTicketList()
        } catch (error) {
          throw error
        }
      },
      ErrorBoundary: ErrorPage
    },
    {
      path: 'ticket/:id',
      Component: TicketInfo,
      loader: async ({ params }) => {
        try {
          return await getTicketInfo(params.id!)
        } catch (error) {
          throw error
        }
      },
      ErrorBoundary: ErrorPage
    },
    {
      path: 'ticket/:id/seat',
      Component: SeatReservation,
      loader: async ({ params }) => {
        try {
          return await getSeatList(params.id!)
        } catch (error) {
          throw error
        }
      },
      ErrorBoundary: ErrorPage
    },
    {
      path: '/error',
      Component: ErrorPage
    },
    {
      path: 'ticket/:id/queue',
      Component: Queue
    },
    {
      path: 'ticket/:id/:reservationId',
      Component: ReservationComplete,
      loader: async ({ params }) => {
        try {
          return await getReservationInfo(params.reservationId!)
        } catch (error) {
          throw error
        }
      },
      ErrorBoundary: ErrorPage
    }
  ])
