import { BsCalendarCheck } from 'react-icons/bs'

export function Appointments () {
  return (
    <>
      <div className='mt-20 flex items-center justify-between'>
        <div className='flex flex-col items-center justify-center gap-1 w-fit bg-gray-700 px-16 py-4 rounded-3xl'>
          <BsCalendarCheck size={30} className="text-yellow-300"/>
          <span className='mt-2 text-[40px]'>5</span>
          <span className='text-gray-500 font-bold'>Today</span>
        </div>

        <div className='flex flex-col items-center justify-center gap-1 w-fit bg-gray-700 px-16 py-4 rounded-3xl'>
          <BsCalendarCheck size={30} className="text-yellow-300"/>
          <span className='mt-2 text-[40px]'>5</span>
          <span className='text-gray-500 font-bold'>Today</span>
        </div>

        <div className='flex flex-col items-center justify-center gap-1 w-fit bg-gray-700 px-16 py-4 rounded-3xl'>
          <BsCalendarCheck size={30} className="text-yellow-300"/>
          <span className='mt-2 text-[40px]'>5</span>
          <span className='text-gray-500 font-bold'>Today</span>
        </div>
        
        <div className='flex flex-col items-center justify-center gap-1 w-fit bg-gray-700 px-16 py-4 rounded-3xl'>
          <BsCalendarCheck size={30} className="text-yellow-300"/>
          <span className='mt-2 text-[40px]'>5</span>
          <span className='text-gray-500 font-bold'>Today</span>
        </div>
      </div>
    </>
  )
}