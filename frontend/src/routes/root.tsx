import { Analytics } from '@vercel/analytics/react'

import { Link, Outlet } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import ModeToggle from '@/components/mode-toggle'
import Logo from '@/components/Logo'

export default function Root() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative grid w-full max-w-screen-xl h-screen md:mx-auto">
        <div className="flex flex-col">
          <header className="w-full flex h-[57px] items-center gap-1 px-4">
            <Link to="/">
              <Logo />
            </Link>
            <nav className="items-center flex ml-auto">
              <Link to="/about">about</Link>
              <ModeToggle />
            </nav>
          </header>
          <Outlet />
        </div>
      </div>
      <Analytics />
    </ThemeProvider>
  )
}
