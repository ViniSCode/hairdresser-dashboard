import { useSession } from "next-auth/react";
import { UserInfo } from "./UserInfo";

export function Header () {
  const {data: session} = useSession()

  return (
    <div className="bg-gray-800 pt-5 pb-5 ml-auto hidden md:block lg:block">
      {session && <UserInfo avatar={session!.user!.image!} email={session!.user!.email!} username={session!.user!.name!}/>}
    </div>
  )
}