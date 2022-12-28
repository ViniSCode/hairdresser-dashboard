import { motion } from "framer-motion";

export function Backdrop ({children, onClick}: any) {
  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      className="fixed z-[60] top-0 left-0 w-[100vw] h-[100vh] bg-[#111111a1] items-center justify-center"
    >
      {children}
    </motion.div>
  )
}