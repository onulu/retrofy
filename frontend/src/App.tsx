import { useEffect } from 'react'
import { inject } from '@vercel/analytics'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/root'
import ErrorPage from './error-page'
import Index from './routes'
import About from './routes/about'
import useStore from './store'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        ),
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
])

inject()
function App() {
  const resetStore = useStore((state) => state.resetState)

  useEffect(() => {
    resetStore()
  }, [resetStore])

  return <RouterProvider router={router} />
}

export default App
