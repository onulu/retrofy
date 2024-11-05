import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/root'
import ErrorPage from './error-page'
import Index from './routes'
import About from './routes/about'
import useStore from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
])

function App() {
  const resetStore = useStore((state) => state.resetState)

  useEffect(() => {
    resetStore()
  }, [resetStore])

  return <RouterProvider router={router} />
}

export default App
