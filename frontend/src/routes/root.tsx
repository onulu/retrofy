import { Link, Outlet } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'

import ModeToggle from '@/components/mode-toggle'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import MobileDrawer from '@/components/dashboard/MobileDrawer'

export default function Root() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative grid w-full max-w-screen-xl md:mx-auto h-dvh">
        <div className="flex flex-col">
          <header className="w-full grid grid-cols-3 md:grid-cols-2 h-[57px] items-center gap-2 px-4 bg-background">
            <MobileDrawer />
            <div className="justify-self-center md:justify-self-start">
              <Link to="/" className="w-28 h-auto block">
                <p className="sr-only">Retrofy</p>
                <Logo />
              </Link>
            </div>
            <nav className="justify-self-end flex gap-2">
              <ModeToggle />
              <Button variant="primary" size="sm" className="rounded-3xl">
                <Link to="/about">about</Link>
              </Button>
            </nav>
          </header>
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
