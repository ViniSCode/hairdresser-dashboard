import type { NextPage } from 'next';
import { signIn, useSession } from "next-auth/react";
import { RiGoogleFill } from 'react-icons/ri';
import { PageTitle } from '../components/PageTitle';

const Home: NextPage = () => {
  const {data: session} = useSession()

  return (
    <div className='max-w-[1120px] mx-auto px-4'>
      <PageTitle title='HairDashboard'/>

      <div className='flex items-center justify-center h-[75vh]'>
        <div className='flex flex-col items-center justify-center gap-8 bg-gray-800 px-8 py-10 rounded-md'>
          { 
            !session ? (
            <>
            <span className='text-2xl font-bold text-center'>You need to be logged in</span>
            <button className='flex items-center bg-blue-500 gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-blue-800'>
              <RiGoogleFill size={24} />
              <span className='text-[18px] font-bold' onClick={() => signIn('google')}>Login with Google</span>
            </button>
            </>
            ) : session.user?.image && (
              <>
                <img src={session.user!.image!} alt="user avatar" referrerPolicy='no-referrer' className='rounded-full w-20'/>
                <span className='text-2xl font-bold text-center'>{session.user?.name}</span>
                <a href="/dashboard" className='text-[18px] font-bold bg-blue-500 cursor-pointer transition-colors px-4 py-2 rounded-lg hover:bg-blue-800'>Go to dashboard</a>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home
