import { useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';

export function useModal() {
  const {closeModal, isOpen, openModal} = useContext(ModalContext)
  return { isOpen, openModal, closeModal };
}

