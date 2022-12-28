import { AnimatePresence } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";
import { GetCustomersAppointmentsQuery } from "../../generated/graphql";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../Modal";
import { Pagination } from "../Pagination";
import { Cards } from "./Cards";
import { TableActions } from "./TableActions";

interface AppointmentsMobileProps {
  data: GetCustomersAppointmentsQuery;
  setOffset: any;
  setPage: any;
  offset: any;
  page: any;
  productsPerPage: any;
  session: any;
  isAllAppointmentsSelected?: boolean;
  setSearch: any;
  search: any;
}

export function AllAppointmentsMobile({
  data,
  setOffset,
  setPage,
  offset,
  page,
  productsPerPage,
  session,
  setSearch,
  search,
  isAllAppointmentsSelected
}: AppointmentsMobileProps) {
  const {closeModal, openModal, isOpen} = useModal();
  return (
    <div className="w-full rounded-2xl bg-gray-900 mt-4 py-10">
      {data && <Cards card={data} />}

      <AnimatePresence>
        {isOpen && session && <Modal modalOpen={isOpen} handleClose={closeModal} />}
      </AnimatePresence>

      <div className="mx-4 md:mx-10 mt-10 rounded-2xl">
        <div className="py-4 rounded-2xl w-full">
          <TableActions setSearch={setSearch} search={search}/>
          <div>
            {data.all.edges.length > 0 ? (
              <div className="flex flex-wrap gap-2 items-center">
                {data.all.edges.map((appointment) => (
                  <div
                    key={appointment.node.id}
                    className="shadow flex items-start flex-col w-full bg-gray-800 rounded-lg p-4 max-w-full"
                  >
                    <div className="flex items-start w-full">
                      <p className="truncate flex-1">
                        {appointment.node.customer!.name}
                      </p>
                      <span
                        className={`w-fit max-w-fit flex-1 text-sm bg-gray-500 rounded-full px-2 text-white font-medium ${
                          appointment.node.customerStatus
                            ? "bg-green-500"
                            : "bg-yellow-700"
                        }`}
                      >
                        {appointment.node.customerStatus ? "complete" : "confirmed"}
                      </span>
                    </div>

                    <div className="flex items-start w-full">
                      <p className="truncate flex-1 text-sm mt-1 text-gray-400 font-medium">
                        {appointment.node.service}
                      </p>
                    </div>

                    <div className="flex items-start w-full">
                      <p className="truncate flex-1 text-sm mt-1 text-gray-400 font-medium">
                        {appointment.node.customer!.number}
                      </p>
                      <div className="w-fit max-w-fit flex-1 cursor-pointer flex items-center gap-1">
                        <p className="truncate flex-1 text-sm text-gray-500 font-medium cursor-pointer">
                          Edit
                        </p>
                        <AiOutlineEdit size={18} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className="mt-10 text-center mb-8 block text-gray-500">
                No appointments yet...
              </span>
            )}
          </div>
          <Pagination
            data={data}
            setOffset={setOffset}
            setPage={setPage}
            offset={offset}
            page={page}
            productsPerPage={productsPerPage}
            isAll
          />
        </div>
      </div>
    </div>
  );
}
