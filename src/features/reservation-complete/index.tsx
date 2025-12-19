import { CheckCircle } from '@/assets/icons'
import type { BookingTicketInfo } from '@/types/ticket'
import { currencyFormat } from '@/lib/utils'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { PrintInfo } from '@/features/reservation-complete/components'

const ReservationComplete = () => {
  const bookedTicketInfo = useLoaderData<BookingTicketInfo>()
  const navigate = useNavigate()

  return (
    <div className='max-w-xl mx-auto md:px-6'>
      <div className='h-30' />
      <div className='bg-white border border-neutral-200 rounded-lg p-8 text-center items-center flex flex-col gap-4'>
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
          <CheckCircle />
        </div>
        <div>
          <p className='text-XL-Bold'>예약 확정</p>
          <p className='pt-2'>예약이 성공적으로 완료되었습니다.</p>
        </div>
        <div className='border-t w-full border-neutral-200' />

        <div className='w-full flex flex-col text-start gap-3'>
          <PrintInfo category='티켓명' info={bookedTicketInfo.ticket.title} />
          <PrintInfo category='시간' info={bookedTicketInfo.ticket.eventDate} />
          <PrintInfo category='장소' info={bookedTicketInfo.ticket.venue} />
          <PrintInfo
            category='예약 좌석'
            info={`${bookedTicketInfo.seat.row}열 ${bookedTicketInfo.seat.number}석`}
          />
        </div>
        <div className='border-t w-full border-neutral-200' />
        <div className='flex w-full'>
          <PrintInfo
            className='flex items-center w-full justify-between'
            category='가격'
            info={currencyFormat(bookedTicketInfo.reservation.price, '원')}
          />
        </div>
        <div className='bg-neutral-200 border border-neutral-200 p-4 rounded-2xl my-2'>
          <p className='text-neutral-700'>
            티켓 세부 정보와 이벤트 정보가 포함된 확인 이메일이 등록된 이메일
            주소로 발송되었습니다.
          </p>
        </div>
        <button
          className='bg-neutral-900 text-white py-2 px-6 rounded-lg hover:bg-neutral-600 transition-colors cursor-pointer w-full'
          onClick={() => navigate('/', { replace: true })}
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default ReservationComplete
