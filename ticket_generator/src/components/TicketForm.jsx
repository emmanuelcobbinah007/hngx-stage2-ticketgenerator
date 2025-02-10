import React from 'react'

const TicketForm = () => {
  return (
    <div className='my-6'>
        <div className='p-4 rounded-2xl border border-[#0E464F] bg-[#041E23] max-w-[500px] mx-auto mb-10'>
            <div className='p-4 rounded-2xl border border-[#0E464F] bg-[#08252B]'>
            <h1 className='px-2 py-3 text-lg text-center'>Register For A Ticket</h1>
            <hr className="w-full mx-auto mt-4 bg-[#0E464F] h-px border-t-0  bg-gradient-to-r from-transparent via-[#0E464F] to-transparent opacity-25 dark:opacity-100"/>
            <form className='p-2 mt-3' action="submit">
                <label className='text-md' htmlFor="fullName" name="fullName">Enter your full name</label>
                <input className='text-sm mt-2 mb-5 block w-full p-1 rounded-lg border border-[#07373F]' type="text" name="fullName" id="fullName" />

                <label className='text-md' htmlFor="email" name="email">Enter your email *</label>
                <input className='text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F]' type="email" name="email" id="email" placeholder='hello@hng.com' />
            
                <label className='text-md' htmlFor="avatar" name="avatar">Enter the link to you avatar *</label>
                <input className='text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F]' type="url" name="avatar" id="avatar" placeholder='https://www.example.com/image' />

                <label className='text-md' htmlFor="event" name="event">Enter the event name *</label>
                <input className='text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F]' type="text" name="event" id="event" placeholder='HNG Internship 12.0' />

                <input className='text-md font-bold mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] hover:cursor-pointer hover:scale-105 hover:bg-[#07373F] duration-300 ease-in-out' type="submit" />
            
            </form>
            </div>
        </div>
    </div>
  )
}

export default TicketForm