import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { Appointments } from "../components/Appointments";
import { Logo } from "../components/Logo";
import { NavItems } from "../components/NavItems";
import { UserInfo } from "../components/UserInfo";

export default function Dashboard () {
  const {data: session} = useSession();

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="grid grid-cols-sidebar min-h-[100vh] gap-10">
        <div className="bg-gray-700 px-8">
          <Logo title="Hairdashboard"/>
          {session && <UserInfo avatar={session.user!.image!} email={session.user!.email!} username={session.user!.name!}/>}
          <NavItems />
        </div>
        <div>
          <Appointments />
        </div>
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
