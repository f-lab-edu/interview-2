import type { ButtonHTMLAttributes } from 'react'

interface ConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void | Promise<void>
  buttonText: string
}
export const ConfirmButton = ({
  onClick,
  buttonText,
  ...props
}: ConfirmButtonProps) => {
  return (
    <button
      className='bg-neutral-900 cursor-pointer w-full text-white py-3 px-6 rounded-lg hover:bg-neutral-800 transition-colors disabled:bg-gray-300 disabled:cursor-default'
      onClick={onClick}
      {...props}
    >
      {buttonText}
    </button>
  )
}
