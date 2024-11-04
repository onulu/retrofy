import { Link, Outlet } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'

export default function Root() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative w-full max-w-screen-xl md:mx-auto h-dvh">
        <header className="w-full grid grid-cols-2 h-[57px] items-center gap-2 px-4 bg-background">
          <div className="justify-self-start">
            <Link to="/" className="w-28 h-auto block">
              <p className="sr-only">Retrofy</p>
              <Logo />
            </Link>
          </div>
          <nav className="justify-self-end">
            <Button variant="primary" size="sm" className="rounded-3xl">
              <Link to="/about">about</Link>
            </Button>
          </nav>
        </header>
        <div className="h-[calc(100dvh-57px-1rem)]">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  )
}
