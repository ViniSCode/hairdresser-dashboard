import { motion } from "framer-motion";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Backdrop } from "./Backdrop";

const dropIn = {
  hidden: {
    y: "-20vh",
    opacity: 0
  },
  visible: {
    y: "0",
    opacity: 1, 
    transition: {
      duration: 0.1,
      type: "spring", 
      damping: 100,
      stiffness: 500
    }
  },
  exit: {
    y: "20vh",
    opacity: 0
  },
}

export function Modal ({handleClose, session}: any) {
  const [searchCustomer, setSearchCustomer] = useState("");
  const [apiSearchCustomer, setApiSearchCustomer] = useState("");
  
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");  
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  
  return (
   <Backdrop onClick={handleClose}>
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        className="m-auto absolute top-40 left-0 right-0 lg:left-[13.5rem] lg:right-0 z-[70] px-8 lg:px-8 py- rounded-xl flex flex-col items-center w-[80%] h-full max-w-[800px] max-h-[660px] md:max-h-[650px] md:max-w-[600px] bg-gray-900"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <RiCloseLine size={30} className="cursor-pointer text-gra-400 absolute right-5 top-5" onClick={handleClose}/>
        <div className="w-full h-full mx-auto">
          <form action="" className="flex w-full h-full flex-col gap-4 items-center justify-center">
            <div className="w-full lg:w-3/4 md:w-[80%]">
              <h3 className="text-lg md:text-2xl font-bold text-[#95a7da] mb-6 mt-8">Create Appointment:</h3>
              <label htmlFor="name" className="text-sm md:text-md">Name:</label>
              <input
                name="name"
                id="name"
                placeholder="Customer Name"
                type="text"
                className="mt-2 w-full mx-auto max-w-[100%] rounded-lg px-4 py-2 border border-[#47527c] bg-gray-800 placeholder:text-sm shadow-md placeholder:font-bold" 
                onChange={(e) => setName(e.target.value)}
                value={name}
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
              <input value={number} onChange={(e) => setNumber(e.target.value)} name="number" id="number" placeholder="999999999" type="text" className="mt-2 w-full mx-auto max-w-[100%] rounded-lg px-4 py-2 border border-[#47527c] bg-gray-800 placeholder:text-sm shadow-md placeholder:font-bold"/>
            </div>
            <div className="md:hidden w-full lg:w-3/4  md:w-[80%] flex flex-col items-center gap-4 mt-4">
              <button className="bg-red-500 w-full py-3 rounded-lg hover:bg-red-400 transition-colors">Cancel</button>
              <button className="bg-green-500 w-full py-3 rounded-lg hover:bg-green-400 transition-colors">Create</button>
            </div>
            <div className="hidden w-full lg:w-3/4  md:w-[80%] md:flex items-center justify-between gap-4 mt-8">
              <button className="bg-red-500 w-full py-3 rounded-lg hover:bg-red-400 transition-colors">Cancel</button>
              <button className="bg-green-500 w-full py-3 rounded-lg hover:bg-green-400 transition-colors">Create</button>
            </div>
          </form>
        </div>
      </motion.div>
   </Backdrop> 
  )
}