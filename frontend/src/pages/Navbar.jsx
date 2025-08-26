 import { Button } from '@/components/ui/button'
import React from 'react'
 
 function Navbar() {
   return (
     <div className='flex justify-between items-center p-5 shadow m-5 rounded-2xl'>
       <div >
        <h1 className='flex font-serif font-bold text-2xl'>Todo App </h1>
       </div>
       <div>
        <Button className="bg-red-500 text-xl text-white rounded-4xl">Logout</Button>
       </div>
         
     </div>
   )
 }
 
 export default Navbar