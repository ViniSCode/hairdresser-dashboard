import { signOut } from 'next-auth/react'
import { FiCalendar, FiLogOut, FiPieChart, FiUser, FiUsers } from 'react-icons/fi'

export function NavItems () {
  const navItems = [
    {path: '/appointments', icon: <FiCalendar size={22}/>}
  ]

  async function handleLogout () {
    await signOut()
  }

  return (
    <div className='items-start justify-start mt-[3rem] flex flex-col gap-14'>
      <a href="" className='flex items-center gap-4 transition-colors hover:text-yellow-500 cursor-pointer'>
        <FiCalendar size={22}  />
        <span className='text-md font-medium inline-block'>Appointments</span>
      </a>
      <a href="" className='flex items-center gap-4 transition-colors hover:text-yellow-500 cursor-pointer'>
        <FiUsers size={22}  />
        <span className='text-md font-medium inline-block'>Customers</span>
      </a>
      <a href="" className='flex items-center gap-4 transition-colors hover:text-yellow-500 cursor-pointer'>
        <FiPieChart size={22}  />
        <span className='text-md font-medium inline-block'>Stats</span>
      </a>
      <a href="" className='flex items-center gap-4 transition-colors hover:text-yellow-500 cursor-pointer'>
        <FiUser size={22}  />
        <span className='text-md font-medium inline-block'>Profile</span>
      </a>
      <a onClick={handleLogout}  className='flex items-center gap-4 transition-colors hover:text-yellow-500 cursor-pointer'>
        <FiLogOut size={22}  />
        <span className='text-md font-medium inline-block transition-colors hover:text-yellow-500'>Logout</span>
      </a>
    </div>
  )
}