import { Clock } from '@/assets/icons'
import { useNavigate } from 'react-router-dom'

const ExpiredToken = () => {
  const navigate = useNavigate()
  return (
    <div className='max-w-xl mx-auto md:px-6'>
      <div className='h-30' />
      <div className='bg-white border border-neutral-200 rounded-lg p-8 text-center items-center flex flex-col gap-4'>
        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
          <Clock />
        </div>
        <div>
          <p className=''>토큰이 만료되었습니다.</p>
          <p className='pt-1'>다시 시도해주세요.</p>
        </div>
        <button
          className='bg-neutral-900 text-white py-2 px-6 rounded-lg hover:bg-neutral-600 transition-colors cursor-pointer'
          onClick={() => navigate('/')}
        >
          티켓 리스트로 이동
        </button>
      </div>
    </div>
  )
}

export default ExpiredToken
