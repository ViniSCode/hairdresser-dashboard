import { signOut } from 'next-auth/react'
import { BsPeople, BsPersonCircle } from 'react-icons/bs'
import { FiCalendar } from 'react-icons/fi'
import { ImStatsBars } from 'react-icons/im'
import { RiLogoutBoxLine } from 'react-icons/ri'

export function NavItems () {
  const navItems = [
    {path: '/appointments', icon: <FiCalendar size={22}/>}
  ]

  async function handleLogout () {
    await signOut()
  }

  return (
    <div className='mt-[5.5rem] flex flex-col gap-16'>
      <div className='flex items-start gap-4 cursor-pointer'>
        <FiCalendar size={24} className="text-yellow-500" />
        <a href="" className='text-[17px] font-bold'>Appointments</a>
      </div>
      <div className='flex items-start gap-4'>
        <BsPeople size={24} className="text-yellow-500" />
        <a href="" className='text-[17px] font-bold'>Customers</a>
      </div>
      <div className='flex items-start gap-4'>
        <ImStatsBars size={24} className="text-yellow-500" />
        <a href="" className='text-[17px] font-bold'>Stats</a>
      </div>
      <div className='flex items-start gap-4'>
        <BsPersonCircle size={24} className="text-yellow-500" />
        <a href="" className='text-[17px] font-bold'>Profile</a>
      </div>
      <div className='flex items-start gap-4'>
        <RiLogoutBoxLine size={24} className="text-yellow-500" />
        <a onClick={handleLogout} className='text-[17px] font-bold'>Logout</a>
      </div>
    </div>
  )
}