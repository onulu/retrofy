import { useEffect, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

const DASHBOARD_PASSWORD =
  import.meta.env.VITE_ACCESS_PASSWORD || process.env.NEXT_ACCESS_PASSWORD

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    const auth = localStorage.getItem('dashboard_auth')
    if (auth) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === DASHBOARD_PASSWORD) {
      // localStorage.setItem('dashboard_auth', 'true')
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="grid items-center justify-center w-full h-full grid-rows-[1fr_auto]">
        <div className="w-64 min-w-full p-6 bg-secondary rounded-lg shadow-lg self-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Label>Retrofy Access</Label>
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
            />
            <Button type="submit" className="w-full">
              Access Retrofy
            </Button>
          </form>
        </div>
        <p className="text-xs text-muted-foreground my-4">
          This project is still work in progress and is protected by a password.
        </p>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
