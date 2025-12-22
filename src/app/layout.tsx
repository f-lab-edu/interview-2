import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='w-lvw h-lvh'>
      <div className='bg-neutral-50 min-h-screen pb-12'>{children}</div>
    </div>
  )
}

export default Layout
