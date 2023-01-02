import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useState } from "react";
import { BsCheck2Circle, BsCircle } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Error from "../../components/Error";
import { GetAppointmentDocument, useGetAppointmentQuery } from "../../generated/graphql";
import { client, ssrCache } from "../../lib/urql";

const dropIn = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1, 
    transition: {
      duration: 0.1,
      type: "spring", 
      damping: 100,
      stiffness: 500
    }
  },
  exit: {
    opacity: 0
  },
}

export default function Edit ({session}: any) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");  
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(false);
  const router = useRouter();
  const id = router.query.appointmentId as string;

  async function handleUpdateAppointment (event: FormEvent) {
    event.preventDefault();

    if (name.trim() === "") {
      toast.error("Name field must not be empty")
      return;
    }
    
    if ( number.length < 6 || number.length > 15) {
      toast.error("Number field must not be empty - min(6) - max(15)")
      return;
    }

    if (service.trim() === "") {
      toast.error("Service field must not be empty")
      return;
    }
    if (date.trim() === "") {
      toast.error("Date field must not be empty")
      return;
    }

    const session = await getSession();
    let email;

    if (session) {
      email = session.user?.email
    }

    await fetch('/api/mutations/createAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        number, 
        service,
        status,
        date: new Date(date).toISOString()
      }),
    })
      .then((response) => {
        if (response.ok) {
          router.push('/dashboard')
        } else {
          // Handle error
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error)
      });    
  }

  async function handleDeleteAppointment (appointmentId: string) {
    const session = await getSession();
    let email;

    if (session) {
      email = session.user?.email
    }

    await fetch('/api/mutations/deleteAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        number, 
        service,
        status,
        appointmentId: appointmentId,
        date: new Date(date)
      }),
    })
      .then((response) => {
        if (response.ok) {
          // router.push('/dashboard')
        } else {
          // Handle error
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error)
      });    

    return;
  }
  
  const [{data}] = useGetAppointmentQuery({
    variables: {
      id
    }
  });

  return data ? (
    <div className="pb-10">
      <motion.div 
        className="mx-auto mt-10 md:mt-28 px-8 py-8 lg:px-8 flex items-center justify-center rounded-xl w-[90%] md:w-[80%] h-full min-h-[740px] max-h-[1000px] max-w-[700px] md:max-h-[650px] md:max-w-[700px] bg-gray-900"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="w-full h-full mx-auto">
          <form action="" onSubmit={(e) => e.preventDefault()} className="flex w-full h-full flex-col gap-4 items-center justify-center">
            <div className="w-full lg:w-3/4 md:w-[80%]">
              <h3 className="text-lg md:text-2xl font-bold text-[#95a7da] mb-6">Edit Appointment:</h3>
              <label htmlFor="name" className="text-sm md:text-md">Name:</label>
              <input
                name="name"
                id="name"
                placeholder="Customer Name"
                type="text"
                className="mt-2 w-full mx-auto max-w-[100%] rounded-lg px-4 py-2 border border-[#47527c] bg-gray-800 placeholder:text-sm shadow-md placeholder:font-bold" 
                onChange={(e) => setName(e.target.value)}
                // value={}
              />
            </div>
            <div className="w-full lg:w-3/4 md:w-[80%]">
              <label htmlFor="service" className="text-sm md:text-md">Service:</label>
              <input value={service} onChange={(e) => setService(e.target.value)} name="service" id="service" placeholder="Haircut" type="text" className="mt-2 w-full mx-auto max-w-[100%] rounded-lg px-4 py-2 border border-[#47527c] bg-gray-800 placeholder:text-sm shadow-md placeholder:font-bold"/>
            </div>
            <div className="w-full lg:w-3/4 md:w-[80%]">
              <label htmlFor="date" className="text-sm md:text-md">Date:</label>
              <input value={date} onChange={(e) => setDate(e.target.value)} name="date" id="date" placeholder="00/00/00" type="date" className="mt-2 w-full mx-auto max-w-[100%] rounded-lg px-4 py-2 border border-[#47527c] bg-gray-800 placeholder:text-sm shadow-md placeholder:font-bold"/>
            </div>
            <div className="w-full lg:w-3/4 md:w-[80%]">
              <label htmlFor="number" className="text-sm md:text-md">Number:</label>
              <input value={number} onChange={(e) => setNumber(e.target.value)} name="number" id="number" placeholder="999999999999999" maxLength={15} minLength={6} type="text" className="mt-2 w-full mx-auto max-w-[100%] rounded-lg px-4 py-2 border border-[#47527c] bg-gray-800 placeholder:text-sm shadow-md placeholder:font-bold"/>
            </div>

            <div className="w-full lg:w-3/4 md:w-[80%]">
              <label htmlFor="number" className="text-sm md:text-md">Service status:</label>
              <div className="flex items-center justify-center gap-4 mt-4 bg-gray-800 py-2 rounded-md border border-[#47527c]">
                <button className="bg-yellow-500 w-6 h-6 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors" onClick={() => setStatus(false)}>{!status ? <BsCheck2Circle size={25} /> : <BsCircle size={25} />}</button>
                <label htmlFor="age1">Confirmed</label>
                <button className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors" onClick={() => setStatus(true)}>{status ? <BsCheck2Circle size={25} /> : <BsCircle size={25} />}</button>
                <label htmlFor="age2">Complete</label>
              </div>
            </div>

            <div className="md:hidden w-full lg:w-3/4  md:w-[80%] flex flex-col items-center gap-4 mt-4">
              <button className="bg-green-500 w-full py-3 rounded-lg hover:bg-green-400 transition-colors" type="submit" onClick={handleUpdateAppointment}>Save</button>
              <button className="bg-red-500 w-full py-3 rounded-lg hover:bg-red-400 transition-colors" type="button" onClick={() => router.push('/dashboard')}>Cancel</button>
              <button className="text-red-500 w-full py-3 rounded-lg hover:text-red-400 transition-colors flex items-center justify-center gap-2" type="submit" onClick={() => handleDeleteAppointment(id)}>Delete <RiDeleteBin2Line size={22}/></button>
            </div>
            <div className="hidden w-full lg:w-3/4  md:w-[80%] md:flex flex-col items-center justify-between gap-4 mt-8">
              <div className="flex items-center justify-between w-full gap-2">
                <button className="bg-red-500 w-full py-3 rounded-lg hover:bg-red-400 transition-colors" type="button"  onClick={() => router.push('/dashboard')}>Cancel</button>
                <button className="bg-green-500 w-full py-3 rounded-lg hover:bg-green-400 transition-colors" type="submit" onClick={handleUpdateAppointment}>Save</button>
              </div>
              <button className="text-red-500 w-full py-3 rounded-lg hover:text-red-400 transition-colors flex items-center justify-center gap-2" type="submit" onClick={() => handleDeleteAppointment(id)}>Delete <RiDeleteBin2Line size={22}/></button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  ) : (
    <Error />
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await client
    .query(GetAppointmentDocument, {
      id: ""
    })
    .toPromise();

  return {
    props: {
      session,
      urqlState: ssrCache.extractData(),
    },
  };
};
