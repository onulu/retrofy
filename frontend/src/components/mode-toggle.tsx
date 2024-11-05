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
      type="button"
      aria-label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div>{theme === 'dark' ? <Sun /> : <Moon />}</div>
    </Button>
  )
}

export default ModeToggle
