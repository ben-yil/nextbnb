"use client";

import Counter from "@/components/inputs/Counter";
import useGuestModal from "@/hooks/searchTrip/useGuestModal";
import useSearchStore from "@/hooks/searchTrip/useSearchStore";

const GuestModal: React.FC = ({}) => {
  const { isOpen, onOpen, onClose } = useGuestModal();
  const {
    adults,
    setAdults,
    children,
    setChildren,
    infants,
    setInfants,
    pets,
    setPets,
  } = useSearchStore();


  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
  absolute
  top-2  
  overflow-x-hidden
  overflow-y-auto
  mt-32 
  inset-0
  z-50
  bg-neutral-800/20
"
      onClick={onClose}
    >
      <div
        className="
  w-auto
  h-auto
  mx-auto
  lg:h-auto
  md:h-auto
  absolute
  md:right-[20%]
  "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="
      h-full
      translate
      lg:h-auto
      md:h-auto
      border-0
      rounded-3xl
      shadow-lg
      mt-0 
      top-0
      bg-white
      outline-none
      focus:outline-none
      px-12
      pt-7
      flex
      flex-col
      "
        >
          <Counter
            onChange={(adults) => setAdults(adults)}
            value={adults}
            title="Adults"
            subtitle="Ages 13 or above"
          />
          <Counter
            onChange={(children) => setChildren(children)}
            value={children}
            title="Children"
            subtitle="Ages 2-12"
          />
          <Counter
            onChange={(infants) => setInfants(infants)}
            value={infants}
            title="Infants"
            subtitle="Under 2"
          />
          <Counter
            onChange={(pets) => setPets(pets)}
            value={pets}
            title="Pets"
            subtitle=""
          />
        </div>
      </div>
    </div>
  );
};

export default GuestModal;
