import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RiGoogleFill } from 'react-icons/ri';
import { auth } from '../utils/firebase';
export function LogIn () {
  const [user, loading] = useAuthState(auth)
  
  async function handleGoogleLogin () {
    const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider)
        console.log(result.user)
      } catch (err) {
        console.log(err)
      } 
  }

  return (
    <>
      <div className='px-4'>
        <main className="max-w-[1120px] mx-auto w-full relative main-container">
          <div className="max-w-[25rem] w-full absolute left-[50%] top-[40%] -translate-x-1/2">
            <h1 className='text-[32px] font-bold text-center mb-10'>Hairdashboard<span className='text-blue-500'>.</span></h1>
            <div className="flex items-center flex-col gap-10 bg-gray-800 px-8 py-6 md:px-14 md:py-10 rounded-lg">
              {!user && (
                <>
                  <h2 className='font-bold text-2xl text-center'>You need to be logged in</h2>
                  <button 
                    onClick={handleGoogleLogin}
                    className='w-full max-w-fit flex gap-2 items-center justify-between bg-blue-500 py-2 px-4 rounded-lg transition-colors hover:bg-blue-700'
                  >
                    <RiGoogleFill size={22} />
                    <span className='block font-bold text-[18px]'>Login with Google</span>
                  </button>
                </>
                )
              }
              {
                user && (
                  <>
                    <img src={user.photoURL} alt="user avatar" referrerPolicy='no-referrer' className='rounded-full w-20'/>
                    <span className='text-[18px] font-bold'>{user.displayName}</span>
                    <a href="/dashboard" className='w-full max-w-fit font-bold flex gap-2 items-center justify-between bg-blue-500 py-2 px-4 rounded-lg transition-colors hover:bg-blue-700'>Go to dashboard</a>
                  </>
                )
              }
            </div>
          </div>
        </main>
      </div>
    </>
  )
}