import { RiPencilLine } from "react-icons/ri";

interface AppointmentProps {
  name: string;
  status: boolean;
  service: string;
  number: number;
}

export function Appointment ({ name, status, service, number}: AppointmentProps) { 
  return (
    <>
      <tr>
        <td className="px-5 py-5 text-sm">
          <div className="flex items-center">
            <div className="max-w-full md:max-w-[120px] w-full">
              <p className="truncate w-full text-white max-w-full">
                {name}
              </p>
            </div>
          </div>
        </td>
        <td className="hidden md:block px-5 py-5 text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
            <span
              aria-hidden
              className={`absolute inset-0 bg-gray-500 opacity-50 rounded-full ${status ? 'bg-green-500' : 'bg-yellow-500'}`}
            ></span>
            <span className="relative">{status ? 'complete' : 'confirmed'}</span>
          </span>
        </td>
        <td className="px-5 py-5 text-sm">
          <p className="text-white whitespace-no-wrap">
            {service}
          </p>
        </td>
        <td className="hidden md:inline-block px-5 py-5 text-sm">
          <p className="text-white whitespace-no-wrap">
            {number}
          </p>
        </td>
        <td className="px-5 py-5 text-sm">
          <RiPencilLine size={22} className="text-gray-500"/>
        </td>
      </tr>
    </>
  )
}