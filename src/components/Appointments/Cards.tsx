import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BsCalendarCheck } from 'react-icons/bs';
import { GetCustomersAppointmentsQuery } from '../../generated/graphql';

interface CardProps {
  card?: GetCustomersAppointmentsQuery;
}

export function Cards ({card}: CardProps) {
  const cards = [
    {
      id: 1,
      html: 
        <>
          <BsCalendarCheck size={30} className="text-yellow-300"/>
          <span className='mt-2 text-[32px] lg:text-[40px]'>{card ? card.todayAppointments.aggregate.count : '0'}</span>
          <span className='text-gray-500 font-bold'>Today</span>
        </>
    },
    {
      id: 2,
      html: 
        <>
          <BsCalendarCheck size={30} className="text-red-600"/>
          <span className='mt-2 text-[32px] lg:text-[40px]'>{card ? card.tomorrowAppointments.aggregate.count : '0'}</span>
          <span className='text-gray-500 font-bold'>Tomorrow</span>
        </>
    },
    {
      id: 3,
      isSelected: true,
      html: 
        <>
          <BsCalendarCheck size={30} className="text-white"/>
          <span className='mt-2 text-[32px] lg:text-[40px] text-white'>{card ? card.weekly.aggregate.count : '0'}</span>
          <span className='font-bold text-white'>Weekly</span>
        </>
    },
    {
      id: 4,
      html: 
        <>
          <BsCalendarCheck size={30} className="text-green-500"/>
          <span className='mt-2 text-[32px] lg:text-[40px]'>{card ? card.completed.aggregate.count : '0'}</span>
          <span className='text-gray-500 font-bold'>Completed</span>
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
      <motion.div drag="x"  dragConstraints={{right: 0, left: -(carouselW + 10)}} className='w-full h-full flex items-center justify-between px-4 gap-5 md:px-10 lg:gap-10'>
        {
          cards.map((cardItem: any) => (
            <motion.div key={cardItem.id} className={`flex shadow flex-col items-center justify-center gap-1 min-w-[180px] max-w-[180px] lg:w-full lg:max-w-[180px] bg-gray-800 px-8 py-3 rounded-2xl md:px-16 md:py-4 md:rounded-3xl ${cardItem?.isSelected === true && 'bg-blue-500'}`}>
              {cardItem.html}
            </motion.div>
          ))
        }
      </motion.div>
    </motion.div>
  )
}