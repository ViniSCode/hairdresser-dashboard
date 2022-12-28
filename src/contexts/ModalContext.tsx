import { createContext, ReactNode, useState } from "react";

interface ModalContextProviderProps {
  children: ReactNode;
}

interface ModalContextData  {
  isOpen: boolean,
  openModal: () => void,
  closeModal: () => void
}

export const ModalContext = createContext({} as ModalContextData);

export function ModalContextProvider ({children}: ModalContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Open Modal
  function openModal() {
    setIsOpen(true);
  }

  // Close Modal
  function closeModal() {
    setIsOpen(false);
  }


  return (
    <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
      {children}
    </ModalContext.Provider>
  )
}