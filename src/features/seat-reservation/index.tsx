import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { currencyFormat } from '@/util'
import { ConfirmButton, PreviousButton } from '@/features/common/components'

import { useToken } from '@/features/common/hooks'
import { Seat } from '@/features/seat-reservation/components'
import { useApplyReservation } from '@/features/seat-reservation/hooks'
import type { Seat as SeatType } from '@/types/ticket'
import { HttpError, type CommonResponse } from '@/lib/http'

const SeatReservation = () => {
  const { id: ticketId } = useParams()
  const { data: seatList } = useLoaderData<CommonResponse<SeatType[]>>()
  const navigate = useNavigate()
  const { token } = useToken()

  const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null)
  const { isLoading, asyncMutate } = useApplyReservation()

  useEffect(() => {
    if (token !== null) return
    if (ticketId) {
      navigate(`/ticket/${ticketId}`, { replace: true })
      return
    }
    navigate('/', { replace: true })
  }, [navigate, ticketId, token])

  const seatSections = useMemo(() => {
    const section: Record<string, SeatType[]> = {}

    seatList.forEach((seat) => {
      if (section[seat.row] === undefined) section[seat.row] = []
      section[seat.row].push(seat)
    })
    return Object.values(section)
  }, [seatList])

  const handleSelect = useCallback(
    (seat: SeatType) => setSelectedSeat(seat),
    []
  )
  return (
    <div className='max-w-4xl mx-auto md:px-6'>
      <div className='h-30 flex justify-start items-center'>
        <PreviousButton />
      </div>
      <div className='rounded-2xl border border-gray-300 overflow-hidden'>
        <div className='p-5 flex flex-col gap-3'>
          <div className='bg-neutral-200 py-4 px-4 w-full rounded-xl'>
            <p className='text-gray-500 text-center'>Stage</p>
          </div>

          <div className='w-full flex flex-col gap-3 items-center py-10 overflow-scroll '>
            {seatSections.map((seatSection) => {
              return (
                <div className='flex gap-2' key={seatSection[0].row}>
                  {seatSection.map((seat) => {
                    return (
                      <Seat
                        key={seat.id}
                        isSelected={selectedSeat?.id === seat.id}
                        onSelect={handleSelect}
                        seatInfo={seat}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>

          <div className='flex gap-3'>
            <div className='flex gap-2'>
              <div className='w-6 h-6 rounded border-2 transition-colors bg-white border-neutral-300 text-neutral-600 ' />
              <p>선택가능</p>
            </div>
            <div className='flex gap-2'>
              <div className='w-6 h-6 rounded border-2 transition-colors bg-neutral-900 border-neutral-900 text-white' />
              <p>선택</p>
            </div>
          </div>

          {selectedSeat !== null && (
            <div className='py-3'>
              <div className='bg-neutral-100 border rounded-2xl border-neutral-200 p-4'>
                <p className='text-L-Regular text-neutral-600'>선택좌석</p>
                <p>{`${selectedSeat.row} ${selectedSeat.number}`}</p>
                <p>{currencyFormat(selectedSeat.price, '원')}</p>
              </div>
            </div>
          )}

          <ConfirmButton
            disabled={selectedSeat === null || isLoading || token === null}
            onClick={async () => {
              if (selectedSeat === null || token === null) return
              try {
                await asyncMutate(selectedSeat.id, token)
                navigate('complete')
                return
              } catch (error) {
                if (error instanceof HttpError) {
                  if (error.status === 410) {
                    navigate('/expired')
                  }
                  // if (error.status === 400) {
                  //   // 토스트 메시지?
                  // }
                  return
                }
                console.error(error)
              }
            }}
            buttonText='좌석 선택'
          />
        </div>
      </div>
    </div>
  )
}

export default SeatReservation
