import type { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { ConfirmButton } from '@/features/common/components'

interface DialogProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
}
export const Dialog = ({ children, isOpen, onClose }: DialogProps) => {
  return createPortal(
    <div
      hidden={isOpen === false}
      className='absolute top-0 mx-auto w-full h-full flex flex-col justify-center items-center bg-[#000000ba]'
    >
      <div className='bg-neutral-200 border border-neutral-300 rounded-2xl shadow-2xl flex flex-col p-6'>
        {children}
        <div className='flex flex-1' />

        <ConfirmButton onClick={onClose} buttonText='확인' />
      </div>
    </div>,
    document.body
  )
}
