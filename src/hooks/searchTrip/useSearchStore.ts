import { create } from "zustand";
import { Range } from "react-date-range";
import { CountrySelectValue } from "@/components/inputs/CountrySelect";

interface SearchModalStore {
  step?: number;
  setStep: (step: number) => void;
  onClose: () => void;
  destination: CountrySelectValue;
  setDestination: (destination: CountrySelectValue) => void;
  dateRange: Range;
  setDateRange: (dateRange: any) => void;
  adults: number;
  setAdults: (adults: number) => void;
  children: number;
  setChildren: (children: number) => void;
  infants: number;
  setInfants: (infants: number) => void;
  pets: number;
  setPets: (pets: number) => void;
  totalGuest: number;
  setTotalGuest: () => void;
  searchingWord: string;
  setSearchingWord: (input: string) => void;
}

const useSearchStore = create<SearchModalStore>((set) => ({
  step: 0,
  setStep: (step: number) => set({ step: step }),
  onClose: () => set({ step: 0 }),
  destination: {
    flag: "",
    label: "",
    latlng: [],
    region: "",
    value: "",
  },
  setDestination: (destination: CountrySelectValue) =>
    set({ destination: destination }),
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
  setDateRange: (dateRange: Range) => set({ dateRange: dateRange }),
  adults: 0,
  setAdults: (adults: number) => {
    set({ adults: adults });
    var { setTotalGuest } = useSearchStore.getState();
    setTotalGuest();
  },
  children: 0,
  setChildren: (children: number) => {
    set({ children: children });
    var { setTotalGuest } = useSearchStore.getState();
    setTotalGuest();
  },
  infants: 0,
  setInfants: (infants: number) => {
    set({ infants: infants });
    var { setTotalGuest } = useSearchStore.getState();
    setTotalGuest();
  },
  pets: 0,
  setPets: (pets: number) => {
    set({ pets: pets });
    var { setTotalGuest } = useSearchStore.getState();
    setTotalGuest();
  },
  totalGuest: 0,
  setTotalGuest: () => {
    const { adults, children, infants, pets } = useSearchStore.getState();
    const newTotalGuest = adults + children + infants + pets;
    set({ totalGuest: newTotalGuest });
  },
  searchingWord: "",
  setSearchingWord: (searchingWord) => {
    set({ searchingWord: searchingWord });
  },
}));

export default useSearchStore;
