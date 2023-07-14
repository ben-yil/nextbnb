import { create } from 'zustand';

interface DestinationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDestinationModal = create<DestinationModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useDestinationModal;
