import { RiPencilLine } from "react-icons/ri";

interface AppointmentProps {
  name: string;
  status: boolean;
  service: string;
  number: number;
}

export function Appointment({
  name,
  status,
  service,
  number,
}: AppointmentProps) {
  return (
    <>
      <tr className="whitespace-nowrap">
        <td className="px-5 py-5 text-sm overflow-hidden">
          <div className="flex w-full overflow-hidden">
            <p className="flex-1 text-white truncate max-w-[160px]">{name}</p>
          </div>
        </td>
        <td className="hidden md:block px-5 py-5 text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
            <span
              aria-hidden
              className={`absolute inset-0 bg-gray-500 opacity-50 rounded-full ${
                status ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></span>
            <span className="relative">
              {status ? "complete" : "confirmed"}
            </span>
          </span>
        </td>
        <td className="px-5 py-5 text-sm">
          <p className="text-white whitespace-no-wrap  max-w-[80px] truncate">
            {service}
          </p>
        </td>
        <td className="hidden md:inline-block px-5 py-5 text-sm">
          <p className="text-white whitespace-no-wrap max-w-[80px] truncate">
            {number}
          </p>
        </td>
        <td className="px-5 py-5 text-sm">
          <RiPencilLine size={22} className="text-gray-500" />
        </td>
      </tr>
    </>
  );
}
