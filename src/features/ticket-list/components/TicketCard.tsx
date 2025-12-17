import type { Ticket } from '@/types/ticket'

interface TicketCardProps extends Ticket {
  onClick: () => void
}
export const TicketCard = ({ onClick, ...ticket }: TicketCardProps) => {
  return (
    <button
      onClick={onClick}
      className='rounded-2xl border border-gray-300 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg'
    >
      <div>
        <img
          className='object-cover w-full'
          src={ticket.image}
          alt={ticket.description}
        />
      </div>
      <div className='p-4 text-start flex flex-col gap-1'>
        <p className='text-XL-Medium'>{ticket.title}</p>
        <p className='text-M-Regular'>{ticket.eventDate}</p>
        <p className='text-M-Regular'>{ticket.venue}</p>
        <p className='text-M-Medium'>{currencyFormat(ticket.price, '원')}</p>
      </div>
    </button>
  )
}

const currencyFormat = (price: number, unit: string) =>
  new Intl.NumberFormat().format(price) + ` ${unit}`
