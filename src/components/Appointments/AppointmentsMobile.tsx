import { AiOutlineEdit } from 'react-icons/ai';
import { Appointment } from "./Appointment";
import { Cards } from "./Cards";
import { TableActions } from "./TableActions";
type Appointment = {
  __typename?: 'Appointment', 
  service: string, 
  customerStatus: boolean, 
  customer?: { 
    __typename?: 'Customer', 
    name: string, 
    number: number, 
    id: string 
  } | null
}

interface AppointmentsProps {
  appointments: Appointment[]
}

export function AppointmentsMobile({appointments}: AppointmentsProps) {

  return (
    <div className="w-full rounded-2xl bg-gray-900 mt-4 py-10">
      <Cards />
      
      <div className="mx-4 md:mx-10 mt-10 rounded-2xl">
        <div className="py-4 rounded-2xl w-full">
            <TableActions />
          <div>
            { appointments.length > 0 ? (
              <div className="flex flex-wrap gap-2 items-center">
                {appointments.map(appointment => (
                  <div key={appointment.customer!.id} className="shadow flex items-start flex-col w-full bg-gray-800 rounded-lg p-4 max-w-full">
                    <div className="flex items-start w-full">
                      <p className="truncate flex-1">{appointment.customer!.name}</p>
                      <span className={`w-fit max-w-fit flex-1 text-sm bg-gray-500 rounded-full px-2 text-white font-medium ${appointment.customerStatus ? 'bg-green-500' : 'bg-yellow-700'}`}>{appointment.customerStatus ? 'complete' : 'confirmed'}</span>
                    </div>
                    
                    <div className="flex items-start w-full">
                      <p className="truncate flex-1 text-sm mt-1 text-gray-400 font-medium">{appointment.service}</p>
                    </div>
                    
                    <div className="flex items-start w-full">
                      <p className="truncate flex-1 text-sm mt-1 text-gray-400 font-medium">{appointment.customer!.number}</p>
                      <div className="w-fit max-w-fit flex-1 cursor-pointer flex items-center gap-1">
                        <p className="truncate flex-1 text-sm text-gray-500 font-medium">Edit</p>
                        <AiOutlineEdit size={18} className="text-gray-500" />
                      </div>
                    </div>
                </div>
                ))}
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
