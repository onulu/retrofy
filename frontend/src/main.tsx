import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Root from './routes/root'
import ErrorPage from './error-page.tsx'
import About from './routes/about.tsx'
import Index from './routes/index.tsx'

import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Shader from './routes/shader.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    path: '/shader',
    element: <Shader />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* root layout 으로 사용된다. */}
    <RouterProvider router={router} />
  </StrictMode>
)
