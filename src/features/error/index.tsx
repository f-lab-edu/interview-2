import { Clock } from '@/assets/icons'
import { HttpError, type ErrorResponse } from '@/lib/http'
import { useNavigate, useRouteError, useSearchParams } from 'react-router-dom'

type ErrorType = 'token' | 'notfound' | 'unexpected' | 'badrequest'

const normalizeErrorType = (type: string | null): ErrorType | null => {
  if (type === 'token') return 'token'
  if (type === 'notfound') return 'notfound'
  if (type === 'badrequest') return 'badrequest'
  if (type === 'unexpected') return 'unexpected'
  return null
}

const getTypeFromStatus = (status: number | undefined): ErrorType | null => {
  if (status === 410) return 'token'
  if (status === 404) return 'notfound'
  if (status === 400) return 'badrequest'
  return null
}

const getDefaultMessage = (type: ErrorType) => {
  switch (type) {
    case 'token':
      return '토큰이 만료되었습니다.'
    case 'notfound':
      return '요청하신 정보를 찾을 수 없습니다.'
    case 'badrequest':
      return '요청을 처리할 수 없습니다.'
    case 'unexpected':
      return '예상치 못한 오류가 발생했습니다.'
  }
}

const ErrorPage = () => {
  const navigate = useNavigate()
  const routeError = useRouteError()
  const [searchParams] = useSearchParams()
  const typeFromQuery = normalizeErrorType(searchParams.get('type'))
  const messageFromQuery = searchParams.get('message') || undefined

  const typeFromRouteError =
    routeError instanceof HttpError
      ? getTypeFromStatus(routeError.status)
      : getTypeFromStatus(
          (routeError as { status?: number } | undefined)?.status
        )

  const type: ErrorType =
    typeFromQuery ?? typeFromRouteError ?? ('token' satisfies ErrorType)

  const messageFromRouteError =
    routeError instanceof HttpError
      ? (routeError.data as Partial<ErrorResponse> | undefined)?.message ??
        routeError.message
      : (routeError as Partial<ErrorResponse> | undefined)?.message

  const message =
    messageFromQuery ?? messageFromRouteError ?? getDefaultMessage(type)

  return (
    <div className='max-w-xl mx-auto md:px-6'>
      <div className='h-30' />
      <div className='bg-white border border-neutral-200 rounded-lg p-8 text-center items-center flex flex-col gap-4'>
        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
          <Clock />
        </div>
        <div>
          <p className='text-L-Regular text-red-400'>{message}</p>
        </div>
        <button
          className='bg-neutral-900 text-white py-2 px-6 rounded-lg hover:bg-neutral-600 transition-colors cursor-pointer'
          onClick={() => navigate('/', { replace: true })}
        >
          티켓 리스트로 이동
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
