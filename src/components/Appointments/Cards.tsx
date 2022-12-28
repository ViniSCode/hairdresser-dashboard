import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsCalendarCheck } from "react-icons/bs";
import { GetCustomersAppointmentsQuery } from "../../generated/graphql";
import { useFilter } from "../../hooks/useFilter";

interface CardProps {
  card?: GetCustomersAppointmentsQuery;
}

export function Cards({ card }: CardProps) {
  const {setToday, setTomorrow, today, selected, setSelected} = useFilter();

  function handleSelectCard(cardId: number) {
    setSelected(cardId);
  }
  const cards = [
    {
      id: 1,
      html: (
        <div className="w-full h-full flex flex-col items-center">
          <BsCalendarCheck size={30} className={`${selected === 1 ? "text-white" : 'text-yellow-300'}`} />
          <span className="mt-2 text-[32px] lg:text-[40px]">
            {card ? card.todayAppointments.aggregate.count : "0"}
          </span>
          <span className={`font-bold ${selected === 1 ? 'text-white' : 'text-gray-500'}`}>Today</span>
        </div>
      ),
      isSelected: selected === 1 ? true : false
    },
    {
      id: 2,
      html: (
        <div  className="w-full h-full flex flex-col items-center">
          <BsCalendarCheck size={30} className={`${selected === 2 ? "text-white" : 'text-red-600'}`}  />
          <span className="mt-2 text-[32px] lg:text-[40px]">
            {card ? card.tomorrowAppointments.aggregate.count : "0"}
          </span>
          <span className={`font-bold ${selected === 2 ? 'text-white' : 'text-gray-500'}`}>Tomorrow</span>
        </div>
      ),
      isSelected: selected === 2 ? true : false
    },
    {
      id: 3,
      html: (
        <div  className="w-full h-full flex flex-col items-center">
          <BsCalendarCheck size={30} className={`${selected === 3 ? "text-white" : 'text-purple-400'}`}  />
          <span className="mt-2 text-[32px] lg:text-[40px] text-white">
            {card ? card.all.aggregate.count : "0"}
          </span>
          <span className={`font-bold ${selected === 3 ? 'text-white' : 'text-gray-500'}`}>All</span>
        </div>
      ),
      isSelected: selected === 3 ? true : false
    },
    {
      id: 4,
      isSelected: selected === 4 ? true : false,
      html: (
        <div  className="w-full h-full flex flex-col items-center">
          <BsCalendarCheck size={30} className={`${selected === 4 ? "text-white" : 'text-green-500'}`} />
          <span className="mt-2 text-[32px] lg:text-[40px]">
            {card ? card.completed.aggregate.count : "0"}
          </span>
          <span className={`font-bold ${selected === 4 ? 'text-white' : 'text-gray-500'}`}>Completed</span>
        </div>
      ),
    },
  ];

  const carousel = useRef<HTMLDivElement | any>();
  const [carouselW, setCarouselW] = useState(0);

  useEffect(() => {
    setCarouselW(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, []);

  return (
    <motion.div
      ref={carousel}
      whileTap={{ cursor: "grabbing" }}
      className="overflow-hidden cursor-grab"
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -(carouselW + 10) }}
        className="w-full h-full flex items-center justify-between px-4 gap-5 md:px-10 lg:gap-10"
      >
        {cards.map((cardItem: any) => (
          <motion.div
            onClick={() => handleSelectCard(cardItem.id)}
            key={cardItem.id}
            className={`cursor-pointer flex shadow flex-col items-center justify-center gap-1 min-w-[180px] max-w-[180px] lg:w-full lg:max-w-[180px] bg-gray-800 px-8 py-3 rounded-2xl md:px-16 md:py-4 md:rounded-3xl ${
              cardItem?.isSelected === true && "bg-blue-500"
            }`}
          >
            {cardItem.html}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
