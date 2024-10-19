// eslint-disable-next-line no-unused-vars
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row h-16 justify-between p-8 items-center sticky top-0 z-[100] bg-green-600 w-full '>
        <h2 className='text-lg font-bold'>
            
        <i className='fa-solid fa-book mx-1'></i>COCINANDO CON BELI
        </h2>
        <button>
            <i className='fa-solid fa-bars'></i>
        </button>
    </div>
  )
}

export default Navbar