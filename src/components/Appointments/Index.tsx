import { GetCustomersAppointmentsQuery } from "../../generated/graphql";
import { Pagination } from "../Pagination";
import { Appointment } from "./Appointment";
import { Cards } from "./Cards";
import { TableActions } from "./TableActions";

interface AppointmentsProps {
  data: GetCustomersAppointmentsQuery;
  setOffset: any;
  setPage: any;
  offset: any;
  page: any;
  productsPerPage: any;
  setSearch: any;
  search: any;
  session: any;
}

export function Appointments({
  data,
  setOffset,
  setPage,
  offset,
  page,
  productsPerPage,
  setSearch,
  search,
  session,
}: AppointmentsProps) {


  return (
    <div className="w-full rounded-2xl bg-gray-900 mt-4 py-10">
      {data && <Cards card={data} />}

      <div className="mx-4 md:mx-10 mt-10 rounded-2xl bg-gray-800">
        <div className="bg-gray-800 shadow px-4 py-4 md:p-8 rounded-2xl w-full">
          <TableActions setSearch={setSearch} search={search}/>
          <div>
            {data.appointments.length > 0 ? (
              <div className="-mx-4 sm:-mx-8 sm:px-8 pt-4 overflow-x-auto scrollbar-thin scrollbar-track-slate-500">
                <div className="inline-block min-w-full overflow-hidden">
                  <table className="w-full min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="hidden md:block px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="hidden md:table-cell px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Number
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.appointments &&
                        data.appointments.map((appointment) => (
                          <Appointment
                            key={appointment.id}
                            name={appointment.customer!.name}
                            status={appointment.customerStatus}
                            service={appointment.service}
                            number={appointment.customer!.number}
                            id={appointment.customer!.id}
                          />
                        ))}
                    </tbody>
                  </table>
                  <Pagination
                    data={data}
                    setOffset={setOffset}
                    setPage={setPage}
                    offset={offset}
                    page={page}
                    productsPerPage={productsPerPage}
                  />
                </div>
              </div>
            ) : (
              <span className="mt-10 block text-gray-500">
                No appointments yet...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

  