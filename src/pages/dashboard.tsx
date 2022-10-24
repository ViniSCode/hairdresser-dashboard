import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Logo } from "../components/Logo";
import { NavItems } from "../components/NavItems";
import { UserInfo } from "../components/UserInfo";

export default function Dashboard () {
  const {data: session} = useSession();

  return (
    <div className="grid grid-cols-sidebar max-w-[1120px] mx-auto px-8">
      <div className=" bg-green-50">
        <Logo />
        {session && <UserInfo avatar={session.user!.image!} email={session.user!.email!} username={session.user!.name!}/>}
        <NavItems />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}
