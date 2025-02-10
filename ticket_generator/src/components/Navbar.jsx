import React from 'react'

const Navbar = () => {
  return (
        <div className='bg-[#05252C] flex justify-between items-center p-4 rounded-2xl border border-[#197686]'>
            <p className='text-xl'>Ticker</p>
            <div className='text-lg'>
                <a className='mx-3 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300' href="#">Events</a>
                <a className='mx-3 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300' href="#">My Tickets</a>
                <a className='mx-3 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300' href="#">About Projects</a>
            </div>
            <button className='font-extrabold bg-white text-[#0A0C11] px-5 py-2 rounded-lg hover:cursor-pointer hover:scale-105 duration-300'>MY TICKETS</button>
        </div>
  )
}

export default Navbar