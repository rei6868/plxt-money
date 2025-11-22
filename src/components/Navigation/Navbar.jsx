import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../Common/Button'

export const Navbar = () => {
  const { user, signout } = useAuth()

  const handleSignout = async () => {
    await signout()
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Money Flow</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleSignout}
        >
          Sign Out
        </Button>
      </div>
    </nav>
  )
}