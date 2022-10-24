
interface UserInfoProps {
  avatar: string;
  username: string;
  email: string;
}
export function UserInfo ({avatar, username, email}: UserInfoProps) {

  return (
    <div className="mt-16 flex items-center gap-3">
      <img src={avatar} alt="user avatar" referrerPolicy='no-referrer' className='rounded-full w-20'/>

      <div className="flex flex-col max-w-[30px] w-full truncate">
        <span className="font-bold text-[17px] inline-block">{username}</span>
        <span className="font-bold text-gray-500 inline-block">{email}</span>
      </div>
    </div>
  ) 
}