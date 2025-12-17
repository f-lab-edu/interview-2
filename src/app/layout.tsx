import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return <div className='w-lvw h-lvh'>{children}</div>
}

export default Layout
