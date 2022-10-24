
interface UserInfoProps {
  avatar: string;
  username: string;
  email: string;
}
export function UserInfo ({avatar, username, email}: UserInfoProps) {

  return (
    <div className="mt-16 flex items-center justify-center gap-3 relative">
      <img src={avatar} alt="user avatar" referrerPolicy='no-referrer' className='block mx-auto rounded-full w-20 lg:w-14 absolute lg:relative max-w-full'/>

      <div className="flex flex-col w-full max-w-[200px]">
        <span className="hidden font-medium text-[17px] lg:inline-block w-full truncate max-w-full">{username}</span>
        <span className="hidden font-medium text-gray-500 lg:inline-block w-full truncate max-w-full">{email}</span>
      </div>
    </div>
  ) 
}