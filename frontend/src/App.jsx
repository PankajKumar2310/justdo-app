import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-center items-center  mt-10'>
      <h1 className='font-bold text-xl  text-blue-500 bg-black rounded-2xl p-5'>Todo | Docker app</h1>
    </div>
    </>
  )
}

export default App
