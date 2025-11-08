import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ElectricWaves from '../components/layout/ElectricWaves'

type Props = {
  children: ReactNode
}

const AppProviders = ({ children }: Props) => {
  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
    [],
  )

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        {/* Global animated background mounted once for persistence across routes */}
        <ElectricWaves />

        {/* app-content ensures UI renders above the animated background */}
        <div className="app-content">{children}</div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default AppProviders
