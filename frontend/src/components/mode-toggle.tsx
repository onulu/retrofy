import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

import { Button } from '@/components/ui/button'

const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      asChild
      size="icon"
      className="rounded-lg"
      type="button"
      aria-label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div>
        {theme === 'dark' ? (
          <Sun className="size-5 fill-foreground" />
        ) : (
          <Moon className="size-5 fill-foreground" />
        )}
      </div>
    </Button>
  )
}

export default ModeToggle
