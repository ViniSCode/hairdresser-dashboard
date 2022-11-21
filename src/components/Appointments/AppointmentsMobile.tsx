import { AiOutlineEdit } from "react-icons/ai";
import { GetCustomersAppointmentsQuery } from "../../generated/graphql";
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
}

export function AppointmentsMobile({
  data,
  setOffset,
  setPage,
  offset,
  page,
  productsPerPage,
}: AppointmentsMobileProps) {
  return (
    <div className="w-full rounded-2xl bg-gray-900 mt-4 py-10">
      {data && <Cards card={data} />}

      <div className="mx-4 md:mx-10 mt-10 rounded-2xl">
        <div className="py-4 rounded-2xl w-full">
          <TableActions />
          <div>
            {data.appointments.length > 0 ? (
              <div className="flex flex-wrap gap-2 items-center">
                {data.appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="shadow flex items-start flex-col w-full bg-gray-800 rounded-lg p-4 max-w-full"
                  >
                    <div className="flex items-start w-full">
                      <p className="truncate flex-1">
                        {appointment.customer!.name}
                      </p>
                      <span
                        className={`w-fit max-w-fit flex-1 text-sm bg-gray-500 rounded-full px-2 text-white font-medium ${
                          appointment.customerStatus
                            ? "bg-green-500"
                            : "bg-yellow-700"
                        }`}
                      >
                        {appointment.customerStatus ? "complete" : "confirmed"}
                      </span>
                    </div>

                    <div className="flex items-start w-full">
                      <p className="truncate flex-1 text-sm mt-1 text-gray-400 font-medium">
                        {appointment.service}
                      </p>
                    </div>

                    <div className="flex items-start w-full">
                      <p className="truncate flex-1 text-sm mt-1 text-gray-400 font-medium">
                        {appointment.customer!.number}
                      </p>
                      <div className="w-fit max-w-fit flex-1 cursor-pointer flex items-center gap-1">
                        <p className="truncate flex-1 text-sm text-gray-500 font-medium">
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
          />
        </div>
      </div>
    </div>
  );
}
