import { Link, Outlet } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Bot, LifeBuoy, SquareTerminal, Triangle } from 'lucide-react'

import { useTheme } from '@/components/theme-provider'
import { Moon, Sun } from 'lucide-react'

export default function Root() {
  const { theme, setTheme } = useTheme()
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="border relative grid w-full pl-[56px] max-w-screen-xl h-screen md:mx-auto">
        <aside className="inset-y fixed z-20 flex h-full flex-col border-r">
          <div className="border-b p-2">
            <Link to="/">
              <Button variant="outline" size="icon" aria-label="Home">
                <Triangle className="size-5 fill-foreground" />
              </Button>
            </Link>
          </div>
          <TooltipProvider>
            <nav className="grid gap-1 p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-lg">
                    <SquareTerminal className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Playground
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label="Models"
                  >
                    <Bot className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Models
                </TooltipContent>
              </Tooltip>
            </nav>
            <div className="mt-auto grid gap-1 p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    aria-label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    onClick={() => {
                      console.log('clicked')
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="size-5 fill-foreground" />
                    ) : (
                      <Moon className="size-5 fill-foreground" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Toggle Theme
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Help"
                  >
                    <LifeBuoy className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Help
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </aside>
        <div className="flex flex-col">
          <header className="w-full flex h-[57px] items-center gap-1 border-b px-4">
            <h1 className="text-l font-semibold">
              Enhancify: AI-Powered Image Tool
            </h1>
          </header>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  )
}
