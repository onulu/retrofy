import { Button } from '@/components/ui/button'

import { useTheme } from './theme-provider'
import { Moon, Sun } from 'lucide-react'

const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-lg"
      aria-label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun className="size-5 fill-foreground" />
      ) : (
        <Moon className="size-5 fill-foreground" />
      )}
    </Button>
  )
}

export default ModeToggle
