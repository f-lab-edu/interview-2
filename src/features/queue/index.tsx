import { useLocation, useNavigate } from 'react-router-dom'
import { Clock } from '@/assets/icons'
import { useToken } from '@/features/common/hooks'
import { useGetQueueStatus } from '@/features/queue/hooks'
import { msToMin, buildErrorSearch } from '@/lib/utils'
import { ProgressBar } from '@/features/queue/components'

const Queue = () => {
  const { token } = useToken()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { data } = useGetQueueStatus({
    tokenId: token,
    successCallback: () =>
      navigate(pathname.replace('queue', 'seat'), { replace: true }),
    failedCallback: () =>
      navigate(
        { pathname: '/error', search: buildErrorSearch('token') },
        { replace: true }
      ),
    errorCallback: () =>
      navigate(
        { pathname: '/error', search: buildErrorSearch('unexpected') },
        { replace: true }
      )
  })
  const { minutes, seconds } = msToMin(data?.queueStatus.estimatedWaitTime || 0)
  return (
    <div className='max-w-xl mx-auto md:px-6'>
      <div className='h-30' />
      <div className='bg-white border border-neutral-200 rounded-lg p-8 text-center items-center flex flex-col gap-4'>
        <div className='w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center'>
          <Clock textColor='text-neutral-500' />
        </div>
        <div>
          <p className='text-XL-Regular'>접속 대기 중입니다.</p>
          <p className='pt-1'>순서가 오면 다음 단계로 넘어 갑니다.</p>
        </div>

        <ProgressBar progress={data?.queueStatus.progress || 0} />

        <div className='bg-neutral-100 rounded-lg border border-neutral-200 w-full py-3 flex gap-2 justify-center'>
          <p className='w-1/2 text-right text-M-Light text-neutral-600'>
            예상 대기 시간:
          </p>
          <div className='w-1/2 text-start'>
            <p className=' text-M-Bold'>{`${minutes}분 ${seconds}초`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Queue
