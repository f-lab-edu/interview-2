import type { Seat as SeatType } from '@/types/ticket'
import { memo } from 'react'

interface SeatProps {
  isSelected: boolean
  onSelect: (seat: SeatType) => void
  seatInfo: SeatType
}
export const Seat = memo(({ onSelect, isSelected, seatInfo }: SeatProps) => {
  const base = 'w-12 h-12 rounded border-2 transition-colors text-S-Regular'

  const variants: Record<'disabled' | 'selected' | 'default', string> = {
    disabled: 'bg-gray-500 border-neutral-300 text-neutral-900',
    selected: 'bg-neutral-900 border-neutral-900 text-white',
    default:
      'bg-white border-neutral-300 text-neutral-600 hover:border-neutral-900'
  }

  const isDisabled = seatInfo.isAvailable === false
  const variant = isDisabled ? 'disabled' : isSelected ? 'selected' : 'default'
  const seatStyle = `${base} ${variants[variant]}`

  return (
    <button
      onClick={() => onSelect(seatInfo)}
      disabled={seatInfo.isAvailable === false}
      className={seatStyle}
    >
      {seatInfo.isAvailable === false
        ? ''
        : `${seatInfo.row} ${seatInfo.number}`}
    </button>
  )
})
