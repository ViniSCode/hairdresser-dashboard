import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Appointments } from "../components/Appoinments/Appointments";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { NavItems } from "../components/NavItems";

export default function Dashboard () {

  return (
    <div className="max-w-[1280px] p-4 mx-auto lg:p-0">
      <div className="lg:grid lg:grid-cols-sidebar min-h-[100vh] gap-10">
        <div className="hidden lg:block px-8">
          <Logo title="Hairdashboard"/>
          <NavItems />
        </div>
        <div className="h-[50vh] pr-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              <Logo title="Hairdashboard"/>
            </div>
            <Header />
          </div>
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
