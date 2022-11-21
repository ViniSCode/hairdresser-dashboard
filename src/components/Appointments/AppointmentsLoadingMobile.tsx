import { Cards } from "./Cards";
import { TableActions } from "./TableActions";

export function AppointmentsLoadingMobile() {
  return (
    <div className="w-full rounded-2xl bg-gray-900 mt-4 py-10">
      <Cards />

      <div className="mx-4 md:mx-10 mt-10 rounded-2xl">
        <div className="rounded-2xl w-full">
          <TableActions />
          <div>
            <div
              role="status"
              className="mt-5 space-y-4 max-w-full rounded animate-pulse"
            >
              <div className="flex justify-between items-start bg-gray-800 py-4 px-4 rounded-lg">
                <div className="w-full max-w-[60%]">
                  <div className="h-2.5 bg-gray-500 rounded-full mb-2.5"></div>
                  <div className="w-[50%] h-2 bg-gray-500 rounded-full"></div>
                  <div className="mt-2.5 w-[30%] h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              </div>
              <div className="flex justify-between items-start bg-gray-800 py-4 px-4 rounded-lg">
                <div className="w-full max-w-[60%]">
                  <div className="h-2.5 bg-gray-500 rounded-full mb-2.5"></div>
                  <div className="w-[50%] h-2 bg-gray-500 rounded-full"></div>
                  <div className="mt-2.5 w-[30%] h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              </div>
              <div className="flex justify-between items-start bg-gray-800 py-4 px-4 rounded-lg">
                <div className="w-full max-w-[60%]">
                  <div className="h-2.5 bg-gray-500 rounded-full mb-2.5"></div>
                  <div className="w-[50%] h-2 bg-gray-500 rounded-full"></div>
                  <div className="mt-2.5 w-[30%] h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              </div>
              <div className="flex justify-between items-start bg-gray-800 py-4 px-4 rounded-lg">
                <div className="w-full max-w-[60%]">
                  <div className="h-2.5 bg-gray-500 rounded-full mb-2.5"></div>
                  <div className="w-[50%] h-2 bg-gray-500 rounded-full"></div>
                  <div className="mt-2.5 w-[30%] h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="h-2.5 bg-gray-500 rounded-full w-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
