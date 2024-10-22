import { Analytics } from '@vercel/analytics/react'

import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import ModeToggle from '@/components/mode-toggle'
import MobileDrawer from '@/components/dashboard/MobileDrawer'

export default function Root() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative grid w-full max-w-screen-xl h-screen md:mx-auto">
        <div className="flex flex-col">
          <header className="w-full flex h-[57px] items-center gap-1 px-4">
            <nav className="flex">
              <ModeToggle />
              <MobileDrawer />
            </nav>
            <h1 className="text-l font-semibold">
              Retrofy: Make retro style image with AI
            </h1>
          </header>
          <Outlet />
        </div>
      </div>
      <Analytics />
    </ThemeProvider>
  )
}
