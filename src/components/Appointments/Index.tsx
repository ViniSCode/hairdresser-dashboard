import { Appointment } from "./Appointment";
import { Cards } from "./Cards";
import { TableActions } from "./TableActions";
import { TablePagination } from "./TablePagination";

export function Appointments() {
  return (
    <div className="w-full rounded-2xl bg-gray-900 mt-4 py-10">
      <Cards />
      
      <div className="mx-4 md:mx-10 mt-10 rounded-2xl bg-gray-800">
        <div className="bg-gray-800 px-4 py-4 md:p-8 rounded-2xl w-full">
            <TableActions />
          <div>
            <div className="-mx-4 sm:-mx-8 sm:px-8 pt-4 overflow-x-auto">
              <div className="inline-block min-w-full overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="hidden md:inline-block px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="hidden md:block px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Number
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <Appointment />
                    <Appointment />
                    <Appointment />
                    <Appointment />
                  </tbody>
                </table>
                <TablePagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
