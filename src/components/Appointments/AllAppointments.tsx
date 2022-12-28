import { AnimatePresence } from "framer-motion";
import { GetCustomersAppointmentsQuery } from "../../generated/graphql";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../Modal";
import { Pagination } from "../Pagination";
import { Appointment } from "./Appointment";
import { Cards } from "./Cards";
import { TableActions } from "./TableActions";

interface AllAppointments {
  data: GetCustomersAppointmentsQuery;
  setOffset: any;
  setPage: any;
  offset: any;
  page: any;
  productsPerPage: any;
  setSearch: any;
  search: any;
  session: any;
  isAllAppointmentsSelected?: boolean;
}

export function AllAppointments({
  data,
  setOffset,
  setPage,
  offset,
  page,
  productsPerPage,
  setSearch,
  search,
  session,
  isAllAppointmentsSelected
}: AllAppointments) {
  const {closeModal, openModal, isOpen} = useModal();

//   function handleCreateAppointment() {
//   fetch('/api/mutations/appointments', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name,
//       number, 
//       service
//     }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         // Redirect the user to the protected route
//       } else {
//         // Handle error
//       }
//     })
//     .catch((error) => {
//       // Handle error
//     });
// }
  return (
    <div className="w-full rounded-2xl bg-gray-900 mt-4 py-10">
      {data && <Cards card={data} />}

      <AnimatePresence>
        {isOpen && session && <Modal modalOpen={isOpen} handleClose={closeModal} session={session} />}
      </AnimatePresence>

      <div className="mx-4 md:mx-10 mt-10 rounded-2xl bg-gray-800">
        <div className="bg-gray-800 shadow px-4 py-4 md:p-8 rounded-2xl w-full">
          <TableActions setSearch={setSearch} search={search}/>
          <div>
            {data.all.edges.length > 0 ? (
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
                      {data.all &&
                        data.all.edges.map((appointment) => (
                          <Appointment
                            key={appointment.node.id}
                            name={appointment.node.customer!.name}
                            status={appointment.node.customerStatus}
                            service={appointment.node.service}
                            number={appointment.node.customer!.number}
                            id={appointment.node.customer!.id}
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
                    isAll={isAllAppointmentsSelected}
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

  