"use client";

import { createContext, useContext, useMemo, useState } from "react";

export interface ModalManagementContextProps {
  openModals: string[];
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  isModalOpen: (id: string) => boolean;
  closeAllModals: () => void;
  getModalIndex: (id: string) => number;
}

const throwFn = () => {
  throw new Error("ModalContext used outside of ModalProvider");
};

export const ModalManagementContext = createContext<ModalManagementContextProps>({
  openModals: [],
  openModal: throwFn,
  closeModal: throwFn,
  isModalOpen: () => false,
  closeAllModals: throwFn,
  getModalIndex: () => -1,
});

export interface ModalContextProps {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalIndex: number;
}

export const useModalContext = (id: string): ModalContextProps => {
  const { openModals, openModal, closeModal, isModalOpen, getModalIndex } =
    useContext(ModalManagementContext);

  const isOpen = isModalOpen(id);
  const index = getModalIndex(id);

  return useMemo(
    () => ({
      openModal: () => openModal(id),
      closeModal: () => closeModal(id),
      isModalOpen: isOpen,
      modalIndex: index,
    }),
    [id, isOpen, index]
  );
};

export const useModalManagementContext = (): ModalManagementContextProps => {
  return useContext(ModalManagementContext);
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModals, setOpenModals] = useState<string[]>([]);

  const modalManagementContext: ModalManagementContextProps = useMemo(
    () => ({
      openModals,
      openModal: (id: string) => {
        setOpenModals((prev) => (prev.includes(id) ? prev : [...prev, id]));
      },
      closeModal: (id: string) => {
        setOpenModals((prev) => prev.filter((modalId) => modalId !== id));
      },
      isModalOpen: (id: string) => openModals.includes(id),
      closeAllModals: () => {
        setOpenModals([]);
      },
      getModalIndex: (id: string) => openModals.indexOf(id),
    }),
    [openModals]
  );

  return (
    <ModalManagementContext.Provider value={modalManagementContext}>
      {children}
    </ModalManagementContext.Provider>
  );
};

ModalProvider.displayName = "ModalProvider";
