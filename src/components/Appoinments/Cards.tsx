import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BsCalendarCheck } from 'react-icons/bs';

export function Cards () {
  const cards = [
    {
      id: 1,
      html: <>
              <BsCalendarCheck size={30} className="text-yellow-300"/>
              <span className='mt-2 text-[40px]'>5</span>
              <span className='text-gray-500 font-bold'>Today</span>
            </>
    },
    {
      id: 2,
      html: <>
              <BsCalendarCheck size={30} className="text-green-500"/>
              <span className='mt-2 text-[40px]'>5</span>
              <span className='text-gray-500 font-bold'>Tomorrow</span>
            </>
    },
    {
      id: 3,
      isSelected: true,
      html: <>
              <BsCalendarCheck size={30} className="text-white"/>
              <span className='mt-2 text-[40px] text-white'>5</span>
              <span className='font-bold text-white'>Weekly</span>
            </>
    },
    {
      id: 4,
      html: <>
              <BsCalendarCheck size={30} className="text-red-500"/>
              <span className='mt-2 text-[40px]'>5</span>
              <span className='text-gray-500 font-bold'>New</span>
            </>
    },
  ]
  
  const carousel = useRef<HTMLDivElement | any>();
  const [carouselW, setCarouselW] = useState(0)
  useEffect(() => {
    setCarouselW(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
  }, [])


  return (
    <motion.div ref={carousel} whileTap={{ cursor: "grabbing" }} className="overflow-hidden cursor-grab">
      <motion.div drag="x"  dragConstraints={{right: 0, left: -carouselW}} className='w-full h-full flex items-center justify-between px-10 gap-10'>
        {
          cards.map((card: any) => (
            <motion.div key={card.id} className={`flex flex-col items-center justify-center gap-1 w-fit bg-gray-800 px-16 py-4 rounded-3xl ${card?.isSelected === true && 'bg-blue-500'}`}>
              {card.html}
            </motion.div>
          ))
        }
      </motion.div>
    </motion.div>
  )
}