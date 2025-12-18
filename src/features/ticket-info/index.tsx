import { useLoaderData } from 'react-router-dom'
import type { Ticket } from '@/types/ticket'

import { currencyFormat } from '@/util'
import { PreviousButton } from '@/features/common/components'

const TicketInfo = () => {
  const ticketInfo = useLoaderData<Ticket>()

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

          <button className='bg-neutral-900 cursor-pointer w-full text-white py-3 px-6 rounded-lg hover:bg-neutral-800 transition-colors'>
            예약
          </button>
        </div>
      </div>
    </div>
  )
}

export default TicketInfo
