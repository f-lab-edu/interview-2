import { useLoaderData, useNavigate, useParams } from 'react-router-dom'

import { HttpError } from '@/lib/http'
import type { Ticket } from '@/types/ticket'
import { currencyFormat } from '@/lib/utils'

import {
  ConfirmButton,
  PreviousButton,
  ImageWithSkeleton
} from '@/features/common/components'
import { useToken } from '@/features/common/hooks'
import { useCreateToken } from '@/features/ticket-info/hooks'

const TicketInfo = () => {
  const { id: ticketId } = useParams()
  const ticketInfo = useLoaderData<Ticket>()
  const { setToken } = useToken()
  const navigate = useNavigate()
  const { asyncMutate, isLoading } = useCreateToken()

  return (
    <div className='max-w-4xl mx-auto md:px-6'>
      <div className='h-30 flex justify-start items-center'>
        <PreviousButton />
      </div>
      <div className='rounded-2xl border border-gray-300 overflow-hidden'>
        <div className='aspect-video bg-neutral-100'>
          <ImageWithSkeleton
            src={ticketInfo.image}
            aspectRatio='aspect-video'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='p-5 flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <p className='text-2XL-Medium'>{ticketInfo.title}</p>
            <p>{ticketInfo.eventDate}</p>
            <p>{ticketInfo.venue}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <div>
              <p className='text-XL-Regular'>About This Event</p>
              <p>{ticketInfo.description}</p>
            </div>
            <p>{`전석 ${currencyFormat(ticketInfo.price, '원')}`}</p>
          </div>

          <ConfirmButton
            disabled={isLoading}
            onClick={async () => {
              try {
                if (!ticketId) {
                  navigate(
                    { pathname: '/error', search: '?type=emptytoken' },
                    { replace: true }
                  )
                  return
                }
                const { data } = await asyncMutate(ticketId)
                const { tokenId, hasQueue } = data
                setToken(tokenId)
                if (hasQueue) return navigate(`queue`)
                return navigate(`seat`)
              } catch (error) {
                if (error instanceof HttpError) {
                  if (error.status === 404)
                    navigate(
                      { pathname: '/error', search: '?type=invalidticket' },
                      { replace: true }
                    )
                  return
                }
                navigate(
                  { pathname: '/error', search: '?type=unexpected' },
                  { replace: true }
                )
              }
            }}
            buttonText='예약'
          />
        </div>
      </div>
    </div>
  )
}

export default TicketInfo
