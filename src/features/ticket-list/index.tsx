import { useLoaderData, useNavigate } from 'react-router-dom'
import type { Ticket } from '@/types/ticket'
import { TicketCard } from '@/features/ticket-list/components'

const TicketList = () => {
  const ticketList = useLoaderData<Ticket[]>()
  const navigate = useNavigate()
  return (
    <div className='max-w-6xl mx-auto md:px-6'>
      <div className='h-30 flex flex-col justify-center gap-2'>
        <p className='text-3XL-Bold'>Available Events</p>
        <p>Browse and select an event to book tickets</p>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
        {ticketList.map((ticketInfo) => {
          return (
            <TicketCard
              key={ticketInfo.id}
              onClick={() => navigate(`ticket/${ticketInfo.id}`)}
              {...ticketInfo}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TicketList
