export function UserInfo ({avatar, username, email}) {
  return (
    <div className="mt-16 flex items-center gap-3">
      <img src={avatar} alt="user avatar" referrerPolicy='no-referrer' className='rounded-full w-20'/>

      <div className="flex flex-col">
        <span className="font-bold text-[17px]">{username}</span>
        <span className="font-bold text-gray-500">{email}</span>
      </div>
    </div>
  ) 
}