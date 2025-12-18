import { useLoaderData, useNavigate, useParams } from 'react-router-dom'

import type { CommonResponse } from '@/lib/http'
import { currencyFormat } from '@/util'
import type { Ticket, TokenResponse } from '@/types/ticket'
import { PreviousButton } from '@/features/common/components'
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
          <img src={ticketInfo.image} className='w-full  h-full object-cover' />
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

          <button
            className='bg-neutral-900 cursor-pointer w-full text-white py-3 px-6 rounded-lg hover:bg-neutral-800 transition-colors'
            onClick={async () => {
              const response = await asyncMutate(ticketId!)
              if (response.success) {
                const res = response as CommonResponse<TokenResponse>
                const {
                  data: { tokenId }
                } = res
                setToken(tokenId)

                if (res.data.hasQueue) return navigate(`queue`)
                return navigate(`book`)
              }
            }}
            disabled={isLoading}
          >
            예약
          </button>
        </div>
      </div>
    </div>
  )
}

export default TicketInfo
