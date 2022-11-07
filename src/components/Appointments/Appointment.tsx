import { RiPencilLine } from "react-icons/ri";

export function Appointment () { 
  return (
    <>
      <tr>
        <td className="px-5 py-5 text-sm">
          <div className="flex items-center">
            <div className="max-w-full w-full">
              <p className="truncate w-full text-white">
                Vera Carpenter
              </p>
            </div>
          </div>
        </td>
        <td className="hidden md:block px-5 py-5 text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-green-500 opacity-50 rounded-full"
            ></span>
            <span className="relative">Activo</span>
          </span>
        </td>
        <td className="px-5 py-5 text-sm">
          <p className="text-white whitespace-no-wrap">
            Complete
          </p>
        </td>
        <td className="hidden md:inline-block px-5 py-5 text-sm">
          <p className="text-white whitespace-no-wrap">
            999999999
          </p>
        </td>
        <td className="px-5 py-5 text-sm">
          <RiPencilLine size={22} className="text-gray-500"/>
        </td>
      </tr>
    </>
  )
}