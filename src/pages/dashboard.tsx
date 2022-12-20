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
import {
  GetCustomersAppointmentsDocument,
  useGetCustomersAppointmentsQuery
} from "../generated/graphql";
import { client, ssrCache } from "../lib/urql";
import { GetCurrentDate } from "../utils/GetCurrentDate";

export default function Dashboard({ session }: any) {
  const [today, setToday] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [weekly, setWeekly] = useState("");
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [offset, setOffset] = useState(0);

  const [search, setSearch] = useState("");
  const [apiSearch, setApiSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const { today, tomorrow, weekly } = GetCurrentDate();
    setToday(today);
    setTomorrow(tomorrow);
    setWeekly(weekly);
  }, []);

  useEffect(() => {

    let timer = setTimeout(() => {
      setOffset(0)
      setPage(1)
      setApiSearch(search);
    }, 500)
    console.log(apiSearch)

    return () => clearTimeout(timer);
  }, [search])



  const [{ data }] = useGetCustomersAppointmentsQuery({
    variables: {
      email: session.user.email,
      today: today ? today : "",
      tomorrow: tomorrow ? tomorrow : "",
      weekly: weekly ? weekly : "",
      limit: productsPerPage,
      offset,
      search: apiSearch
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
            {!data ? (
              <AppointmentsLoading />
            ) : (
              <Appointments
                setSearch={setSearch}
                search={search}
                data={data}
                setOffset={setOffset}
                setPage={setPage}
                offset={offset}
                page={page}
                productsPerPage={productsPerPage}
              />
            )}
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
          {!data ? (
            <AppointmentsLoadingMobile />
          ) : (
            <AppointmentsMobile
              data={data}
              setOffset={setOffset}
              setPage={setPage}
              offset={offset}
              page={page}
              productsPerPage={productsPerPage}
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
      today: date,
      limit: 10,
      offset: 0,
      search: ""
    })
    .toPromise();

  return {
    props: {
      session,
      urqlState: ssrCache.extractData(),
    },
  };
};
