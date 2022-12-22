import { createContext, ReactNode, useState } from "react";

interface FilterContextProviderProps {
  children: ReactNode;
}

export const FilterContext = createContext({
  today: "",
  setToday: (today: string) => {},
  tomorrow: "",
  setTomorrow: (tomorrow: string) => {},
  weekly: "",
  setWeekly: (weekly: string) => {},
  filterDate: "",
  setFilterDate: (weekly: string) => {},
  selected: 1,
  setSelected: (selected: number) => {},
  customerStatus: false,
  setCustomerStatus: (customerStatus: boolean) => {},
});

export function FilterContextProvider ({children}: FilterContextProviderProps) {
  const [today, setToday] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [weekly, setWeekly] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selected, setSelected] = useState(1);
  const [customerStatus, setCustomerStatus] = useState(false);

  return (
    <FilterContext.Provider value={{selected, setToday, setTomorrow, setSelected, setWeekly, today, tomorrow, weekly, filterDate, setFilterDate, setCustomerStatus, customerStatus}}>
      {children}
    </FilterContext.Provider>
  )
}