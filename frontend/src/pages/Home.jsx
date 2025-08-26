import React from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <div className="flex justify-center items-center mt-12">
        <h1 className="font-extrabold text-3xl text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl px-8 py-4 shadow-lg tracking-wide">
          🚀 Todo | Docker App
        </h1>
      </div>

      {/* Dashboard */}
     
          <Dashboard />
      

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t mt-10">
        © {new Date().getFullYear()} Todo | Docker App. All rights reserved.
      </footer>
    </div>
  )
}

export default Home
