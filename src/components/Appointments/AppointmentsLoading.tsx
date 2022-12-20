import { Cards } from "./Cards";
import { TableActions } from "./TableActions";

export function AppointmentsLoading() {
  return (
    <div className="w-full rounded-2xl bg-gray-900 mt-4 py-10">
      <Cards />

      <div className="mx-4 md:mx-10 mt-10 rounded-2xl bg-gray-800">
        <div className="bg-gray-800 shadow px-4 py-4 md:p-8 rounded-2xl w-full">
          <TableActions/>
          <div>
            <div className="mt-5 flex animate-pulse items-center justify-between max-w-[92%] mx-auto">
              <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
            </div>

            <div
              role="status"
              className="mt-5 p-4 space-y-4 max-w-full rounded animate-pulse md:p-6"
            >
              <div className="flex justify-between items-center">
                <div className="w-full max-w-[60%]">
                  <div className="h-2.5 bg-gray-500 rounded-full mb-2.5"></div>
                  <div className="w-[50%] h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="w-full max-w-[65%]">
                  <div className="h-2.5 bg-gray-500 rounded-full mb-2.5"></div>
                  <div className="w-[50%] h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="w-full max-w-[55%]">
                  <div className="h-2.5 bg-gray-500 rounded-full mb-2.5"></div>
                  <div className="w-[50%] h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="w-full max-w-[65%]">
                  <div className="h-2.5 bg-gray-500 rounded-full mb-2.5"></div>
                  <div className="w-[50%] h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="w-full max-w-[47%]">
                  <div className="h-2.5 bg-gray-500 rounded-full mb-2.5"></div>
                  <div className="w-[50%] h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
