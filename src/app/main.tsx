import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { RouterProvider } from 'react-router-dom'
import Layout from '@/app/layout.tsx'

// MSW 설정 (개발 환경에서만)
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('../mocks/browser.ts')
    return worker.start()
  }
  return Promise.resolve()
}

enableMocking().then(async () => {
  const { createAppRouter } = await import('@/routes')
  const router = createAppRouter()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </StrictMode>
  )
})
