import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Customer } from "../components/Customer";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { MobileMenu } from "../components/Menu/MobileMenu";
import { NavItems } from "../components/NavItems";
import { Pagination } from "../components/Pagination";
import { GetOwnerCustomersDocument, useGetOwnerCustomersQuery } from "../generated/graphql";
import { client, ssrCache } from "../lib/urql";
import { GetCurrentDate } from "../utils/GetCurrentDate";

export default function Customers ({session}: any) {
  const [today, setToday] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [weekly, setWeekly] = useState("");
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const {today, tomorrow, weekly} = GetCurrentDate()
    setToday(today)
    setTomorrow(tomorrow)
    setWeekly(weekly)
  }, [])
  
  const [{data}] = useGetOwnerCustomersQuery({
    variables: {
      email: session.user.email,
      limit: productsPerPage,
      offset: offset
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
              <div className="bg-gray-900 p-10 rounded-2xl w-full flex flex-col min-h-[24rem] justify-between gap-4">
                  <div className="pb-4 mt-2 mb-4 flex items-center justify-between">
                    <span className="text-lg font-medium">Customers: {data?.customers.length}</span>
                    <button className="hidden md:inline-block bg-blue-500 text-sm px-4 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                        New Appointment
                    </button>
                  </div>
                <div className="flex flex-col gap-4 w-full">
                  { data?.customers && data.customers.length > 0 ? 
                    (
                      data.customers.map(customer => (
                        <Customer customer={customer} key={customer.id}/>
                      )) 
                    )
                      
                    : (
                      <span className="text-lg font-medium text-gray-500 text-center mt-4 mb-4">No customers yet.</span>
                    )
                  }
                </div>
                { data && <Pagination data={data} setOffset={setOffset} setPage={setPage} offset={offset} page={page} productsPerPage={productsPerPage}/> }
              </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden max-w-[1280px] px-4 pb-20 mx-auto">
        <div className="pb-20 min-h-[100vh] gap-4">
          <div className="pb-20">
            <div className="fixed w-full z-50 bg-gray-800 pb-4 pr-8">
              <div className="flex items-center justify-between">
                <Logo title="Hairdashboard" />
                <MobileMenu />
                <Header />
              </div>
              <div className="bg-gray-900 mt-6 py-6 px-4 md:px-8 rounded-2xl w-full mx-auto min-w-h-[70vh] flex flex-col justify-between items-center gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <div className="pb-4 mt-2 mb-4 flex items-center justify-between">
                    <span className="text-lg font-medium">Customers: {data?.customers.length}</span>
                    <button className="hidden md:inline-block bg-blue-500 text-sm px-4 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                        New Appointment
                    </button>
                    <button className="inline-block md:hidden bg-blue-500 text-sm px-3 py-3 rounded-full text-white font-semibold tracking-wide cursor-pointer">
                        <FiPlus size={22} className="text-white"/>
                    </button>
                  </div>
                  { data?.customers && data?.customers.length > 0 ? (data.customers.map(customer => (
                    <Customer customer={customer} key={customer.id}/>
                    )))
                    : (
                      <span className="text-lg font-medium text-gray-500 text-center mt-4 mb-4">No customers yet.</span>
                    )
                  }
                </div>
                { data && <Pagination data={data} setOffset={setOffset} setPage={setPage} offset={offset} page={page} productsPerPage={productsPerPage}/> }
              </div>
            </div>
          </div>
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
  .query(GetOwnerCustomersDocument, { email: session.user?.email, limit: 10, offset: 0})
  .toPromise();

  
  return {
    props: { 
      session,
      urqlState: ssrCache.extractData(),
    }
  }
}

