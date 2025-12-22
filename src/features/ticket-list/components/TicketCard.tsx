import type { Ticket } from '@/types/ticket'
import { currencyFormat } from '@/lib/utils'
import { ImageWithSkeleton } from '@/features/common/components'

interface TicketCardProps extends Ticket {
  onClick: () => void
}
export const TicketCard = ({ onClick, ...ticket }: TicketCardProps) => {
  return (
    <button
      onClick={onClick}
      className='rounded-2xl border border-gray-300 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg'
    >
      <ImageWithSkeleton
        aspectRatio='aspect-5/3'
        src={ticket.image}
        alt={ticket.description}
      />
      <div className='p-4 text-start flex flex-col gap-1'>
        <p className='text-XL-Medium'>{ticket.title}</p>
        <p>{ticket.eventDate}</p>
        <p>{ticket.venue}</p>
        <p className='text-M-Medium'>{currencyFormat(ticket.price, '원')}</p>
      </div>
    </button>
  )
}
