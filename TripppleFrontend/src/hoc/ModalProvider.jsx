import { createContext, ReactNode, useState } from "react";

export const ModalContext = createContext({});
export const ModalProvider = ({ children }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };
  const closeModal = () => {
    setModalOpened(false);
  };
  const value = { modalOpened, openModal, closeModal };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
