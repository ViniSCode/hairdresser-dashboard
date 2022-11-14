import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { MobileMenu } from "../components/Menu/MobileMenu";
import { NavItems } from "../components/NavItems";
import { GetProfileStatsDocument, useGetProfileStatsQuery } from "../generated/graphql";
import { client, ssrCache } from "../lib/urql";

export default function Profile ({session}: any) {
  
  const [{data}] = useGetProfileStatsQuery({
    variables: {
      email: session.user.email
    }
  })

  console.log(data)

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
            
           {
            session && (
              <div className="bg-gray-900 w-full h-[70vh] rounded-2xl">
                <div className="pt-10 flex items-center justify-center gap-4">
                  <img src={session.user.image} alt="user avatar" referrerPolicy='no-referrer' className='w-36 rounded-full'/>
                  <div className="max-w-[252px]">
                    <strong className="block text-2xl truncate">{session.user.name}</strong>
                    <strong className="block text-gray-500">{session.user.email}</strong>
                  </div>
                </div>
                  { data &&
                      <div className="mt-6 flex flex-col gap-2 w-full max-w-[400px] mx-auto">
                        <div className="bg-gray-800 rounded-lg w-full px-4 py-4 flex items-center justify-center gap-2">
                          <strong className="text-lg">{data.customers.aggregate.count}</strong>
                          <strong className="text-lg">Customers</strong>
                        </div>  
                        <div className="bg-gray-800 rounded-lg w-full px-4 py-4 flex items-center justify-center gap-2">
                          <strong className="text-lg">{data.appointments.aggregate.count}</strong>
                          <strong className="text-lg">Appointments</strong>
                        </div>  
                      </div>
                    }
              </div>
            )
           }

          </div>
        </div>
      </div>

      <div className="lg:hidden max-w-[1280px] px-4 pb-4 mx-auto">
        <div className="min-h-[100vh] gap-4">
          <div className="pb-20">
            <div className="fixed w-full z-50 bg-gray-800 pb-4 pr-8">
              <div className="flex items-center justify-between">
                <Logo title="Hairdashboard" />
                <MobileMenu />
                <Header />
              </div>
              {
                session && (
                  <div className="mt-10 w-full h-[70vh] rounded-2xl">
                    <div className="flex flex-col items-center gap-4">
                      <img src={session.user.image} alt="user avatar" referrerPolicy='no-referrer' className='w-40 rounded-full'/>
                      <div className="text-center">
                        <strong className="block text-2xl">{session.user.name}</strong>
                        <strong className="block text-gray-500">{session.user.email}</strong>
                      </div>
                    </div>
                      { data &&
                        <div className="mt-6 flex flex-col gap-2 w-full max-w-[400px] mx-auto">
                          <div className="bg-gray-900 rounded-lg w-full px-4 py-4 flex items-center justify-center gap-2">
                            <strong className="text-lg">{data.customers.aggregate.count}</strong>
                            <strong className="text-lg">Customers</strong>
                          </div>  
                          <div className="bg-gray-900 rounded-lg w-full px-4 py-4 flex items-center justify-center gap-2">
                            <strong className="text-lg">{data.appointments.aggregate.count}</strong>
                            <strong className="text-lg">Appointments</strong>
                          </div>  
                        </div>
                      }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  await client
  .query(GetProfileStatsDocument, {email: session.user?.email})
  .toPromise();
  
  return {
    props: { 
      session,
      urqlState: ssrCache.extractData(),
    }
  }
}

