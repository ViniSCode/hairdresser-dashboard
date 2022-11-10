import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AppointmentsLoading } from "../components/Appointments/AppointmentsLoading";
import { AppointmentsLoadingMobile } from "../components/Appointments/AppointmentsLoadingMobile";
import { AppointmentsMobile } from "../components/Appointments/AppointmentsMobile";
import { Appointments } from "../components/Appointments/Index";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { MobileMenu } from "../components/Menu/MobileMenu";
import { NavItems } from "../components/NavItems";
import { GetOwnerCustomersDocument, useGetCustomersAppointmentsQuery } from "../generated/graphql";
import { client, ssrCache } from "../lib/urql";
import { GetCurrentDate } from "../utils/GetCurrentDate";

export default function Dashboard ({session}: any) {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(GetCurrentDate())
  }, [])
  
  const [{data}] = useGetCustomersAppointmentsQuery({
    variables: {
      email: session.user.email,
      date: date ? date : ''
    }
  })

  return (
    <>
      <div className="hidden lg:block max-w-[1280px] mx-auto p-0 pb-10">
        <div className="grid grid-cols-sidebar min-h-[100vh] gap-4">
          <div className="block px-4">
            <Logo title="Hairdashboard"/>
            <NavItems />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Header />
            </div>
            {!data ? <AppointmentsLoading/> : <Appointments appointments={data.appointments}/>}
          </div>
        </div>
      </div>

      <div className="lg:hidden max-w-[1280px] px-4 pb-4 mx-auto">
        <div className="min-h-[100vh] gap-4">
          <div className="pb-20">
            <div className="fixed w-full z-50 bg-gray-800 pb-4 pr-16">
              <div className="flex items-center justify-between">
                <Logo title="Hairdashboard" />
                <MobileMenu />
                <Header />
              </div>
            </div>
          </div>
          {!data ? <AppointmentsLoadingMobile/> : <AppointmentsMobile appointments={data.appointments}/>}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const date = new Date().toISOString().toString();

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  await client
  .query(GetOwnerCustomersDocument, { email: session.user?.email, date })
  .toPromise();

  
  return {
    props: { 
      session,
      urqlState: ssrCache.extractData(),
    }
  }
}

