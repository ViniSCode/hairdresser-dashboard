export function LoginError () {
  return (
    <div className='text-center h-[100vh] flex flex-col items-center justify-center gap-5 text-2xl'>
      <span>Something went wrong!</span>
      <span>You must be logged in to access this page!</span>
      <a href="/" className='cursor-pointer block bg-blue-500 text-white font-bold px-4 py-2 rounded-lg'>Voltar</a>
    </div>
  )
}