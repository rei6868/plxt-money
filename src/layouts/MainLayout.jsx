import React from 'react'
import { Navbar } from '../components/Navigation/Navbar'
import { Sidebar } from '../components/Navigation/Sidebar'

export const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}