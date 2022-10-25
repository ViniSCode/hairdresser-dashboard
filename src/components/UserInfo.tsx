
interface UserInfoProps {
  avatar: string;
  username: string;
  email: string;
}
export function UserInfo ({avatar, username, email}: UserInfoProps) {

  return (
    <div className="flex items-center justify-center max-w-fit ml-auto">
      <div className="flex items-center flex-col w-full max-w-[180px]">
        <span className="w-full truncate font-bold">{username}</span>
        <span className="w-full truncate text-sm text-gray-500">{email}</span>
      </div>

      <div className="max-w-[50px] w-full ml-4">
        <img src={avatar} alt="user avatar" referrerPolicy='no-referrer' className='mx-auto max-w-full rounded-full'/>
      </div>
    </div>
  ) 
}