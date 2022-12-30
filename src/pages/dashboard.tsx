import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AllAppointments } from "../components/Appointments/AllAppointments";
import { AllAppointmentsMobile } from "../components/Appointments/AllAppointmentsMobile";
import { AppointmentsLoading } from "../components/Appointments/AppointmentsLoading";
import { AppointmentsLoadingMobile } from "../components/Appointments/AppointmentsLoadingMobile";
import { AppointmentsMobile } from "../components/Appointments/AppointmentsMobile";
import { Appointments } from "../components/Appointments/Index";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { MobileMenu } from "../components/Menu/MobileMenu";
import { NavItems } from "../components/NavItems";
import {
  GetCustomersAppointmentsDocument,
  useGetCustomersAppointmentsQuery
} from "../generated/graphql";
import { useFilter } from "../hooks/useFilter";
import { client, ssrCache } from "../lib/urql";
import { GetCurrentDate } from "../utils/GetCurrentDate";

export default function Dashboard({ session }: any) {
  const {setToday, setTomorrow, setWeekly, today, tomorrow, weekly, selected, filterDate, setFilterDate, customerStatus, setCustomerStatus} = useFilter();
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);
  const [isAllAppointmentsSelected, setIsAllAppointmentsSelected] = useState(false);
  const [search, setSearch] = useState("");
  const [apiSearch, setApiSearch] = useState("");

  useEffect(() => {
    const { today, tomorrow, filterDate } = GetCurrentDate();
  
    if (selected === 1) {
      setFilterDate(filterDate)
      setCustomerStatus(false)
      setIsAllAppointmentsSelected(false)   
      setPage(1) 
      setOffset(0) 
    }
    if (selected === 2) {
      setIsAllAppointmentsSelected(false)    
      setFilterDate(tomorrow)
      setCustomerStatus(false) 
      setPage(1)    
      setOffset(0) 
    }
    if (selected === 3) {
      setIsAllAppointmentsSelected(true)    
      setPage(1) 
      setOffset(0) 
    }
    if (selected === 4) {
      setIsAllAppointmentsSelected(false)    
      setFilterDate(filterDate)
      setCustomerStatus(true)
      setPage(1) 
      setOffset(0) 
    }

    setToday(today)
    setTomorrow(tomorrow);
    setWeekly(weekly);

  }, [selected]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setOffset(0)
      setPage(1)
      setApiSearch(search.trim());
    }, 500)

    return () => clearTimeout(timer);
  }, [search])

  const [{ data }] = useGetCustomersAppointmentsQuery({
    variables: {
      email: session.user.email,
      filterDate: filterDate ? filterDate: "",
      today: today ? today : "",
      tomorrow: tomorrow ? tomorrow : "",
      limit: productsPerPage,
      offset,
      search: apiSearch,
      status: false,
      filterStatus: customerStatus
    },
  });
  

  return (
    <>
      <div className="hidden lg:block max-w-[1280px] mx-auto p-0 pb-10">
        <div className="grid grid-cols-sidebar min-h-[100vh] gap-4">
          <div className="block px-4">
            <Logo title="Hairdashboard" />
            <NavItems />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Header />
            </div>
            {!session || !data ? (
              <AppointmentsLoading />
            ) : !isAllAppointmentsSelected ? ( 
              <Appointments
                setSearch={setSearch}
                search={search}
                data={data}
                setOffset={setOffset}
                setPage={setPage}
                offset={offset}
                page={page}
                productsPerPage={productsPerPage}
                session={session}
              />
            ) : (
              <AllAppointments  
                setSearch={setSearch}
                search={search}
                data={data}
                setOffset={setOffset}
                setPage={setPage}
                offset={offset}
                page={page}
                productsPerPage={productsPerPage}
                session={session}
                isAllAppointmentsSelected={isAllAppointmentsSelected}
              />
            )
            }
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
          {!session || !data ? (
            <AppointmentsLoadingMobile />
          ) :  !isAllAppointmentsSelected ? (
            <AppointmentsMobile
              setSearch={setSearch}
              search={search}
              data={data}
              setOffset={setOffset}
              setPage={setPage}
              offset={offset}
              page={page}
              productsPerPage={productsPerPage}
              session={session}
            />
          ) : (
            <AllAppointmentsMobile  
              setSearch={setSearch}
              search={search}
              data={data}
              setOffset={setOffset}
              setPage={setPage}
              offset={offset}
              page={page}
              productsPerPage={productsPerPage}
              session={session}
              isAllAppointmentsSelected={isAllAppointmentsSelected}
            />
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const date = new Date().toISOString().toString();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await client
    .query(GetCustomersAppointmentsDocument, {
      email: session.user?.email,
      filterDate: date,
      limit: 10,
      offset: 0,
      search: "",
      status: false,
      filterStatus: false
    })
    .toPromise();

  return {
    props: {
      session,
      urqlState: ssrCache.extractData(),
    },
  };
};
