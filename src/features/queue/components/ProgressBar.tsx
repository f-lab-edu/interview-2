import type { QueueStatus } from '@/types/ticket'

export const ProgressBar = ({ progress }: Pick<QueueStatus, 'progress'>) => {
  const gaugeWidth = Math.min(100, Math.max(0, progress))

  return (
    <div className='w-full py-4 flex flex-col gap-3'>
      <div className='w-full h-4 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={`h-full bg-neutral-600 transition-all duration-500 ease-out`}
          style={{
            width: `${gaugeWidth}%`
          }}
        />
      </div>

      <div className='w-full'>
        <p>{gaugeWidth}%</p>
      </div>
    </div>
  )
}
