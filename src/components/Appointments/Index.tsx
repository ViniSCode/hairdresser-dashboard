import { GetCustomersAppointmentsQuery } from "../../generated/graphql";
import { Appointment } from "./Appointment";
import { Cards } from "./Cards";
import { TableActions } from "./TableActions";
import { TablePagination } from "./TablePagination";

interface AppointmentsProps {
  data: GetCustomersAppointmentsQuery;
}

export function Appointments({data}: AppointmentsProps) {

  return (
    <div className="w-full rounded-2xl bg-gray-900 mt-4 py-10">
      {data && <Cards card={data} />}
      
      <div className="mx-4 md:mx-10 mt-10 rounded-2xl bg-gray-800">
        <div className="bg-gray-800 shadow px-4 py-4 md:p-8 rounded-2xl w-full">
            <TableActions />
          <div>
            { data.appointments.length > 0 ? (
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
                      { data.appointments && data.appointments.map((appointment) => (
                        (
                          <Appointment 
                            key={appointment.id}
                            name={appointment.customer!.name}
                            status={appointment.customerStatus}
                            service={appointment.service}
                            number={appointment.customer!.number}
                          />
                        )
                      )) }
                    </tbody>
                  </table>
                  <TablePagination />
                </div>
              </div>
            ) : (
              <span className="mt-10 block">No appointments yet...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
