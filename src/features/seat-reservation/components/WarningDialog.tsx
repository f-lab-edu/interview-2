import { ErrorIcon } from '@/assets/icons'
import { Dialog } from '@/features/common/components'

interface WarningDialogProps {
  errorMsg: string
  onClose: () => void
}
export const WarningDialog = ({ errorMsg, onClose }: WarningDialogProps) => {
  return (
    <Dialog onClose={onClose} isOpen={errorMsg !== ''}>
      <div className='w-full h-full pb-4 items-center flex flex-col gap-4 px-10'>
        <div className='p-3 bg-red-200 rounded-full w-12 h-12'>
          <ErrorIcon />
        </div>
        <p className='text-L-Medium'>{errorMsg}</p>
      </div>
    </Dialog>
  )
}
