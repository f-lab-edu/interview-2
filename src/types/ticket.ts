export interface Ticket {
  id: string
  title: string
  description: string
  image: string
  price: number
  totalSeats: number
  availableSeats: number
  eventDate: string
  venue: string
}

export interface Seat {
  id: string
  row: string
  number: number
  price: number
  isAvailable: boolean
  isSelected?: boolean
}

export interface QueueToken {
  id: string
  ticketId: string
  status: 'waiting' | 'ready' | 'expired'
  position: number
  totalInQueue: number
  expiresAt: number
  createdAt: number
}

export interface Reservation {
  id: string
  ticketId: string
  seatId: string
  price: number
  status: 'pending' | 'completed' | 'expired'
  expiresAt: number
  createdAt: number
}

export interface QueueStatus {
  position: number
  totalInQueue: number
  progress: number
  estimatedWaitTime: number
}

export interface TokenResponse extends Pick<QueueToken, 'expiresAt'> {
  tokenId: string
  hasQueue: boolean
}

export interface TokenQueueStatus {
  token: QueueToken
  queueStatus: QueueStatus
}

export interface BookingTicketInfo {
  reservation: Reservation
  seat: Seat
  ticket: Ticket
}
