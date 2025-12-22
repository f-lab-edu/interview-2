import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from '@/assets/icons'

export const PreviousButton = () => {
  const navigate = useNavigate()
  return (
    <button className='cursor-pointer flex gap-2' onClick={() => navigate(-1)}>
      <ArrowLeft />
      <p>Back to Events</p>
    </button>
  )
}
