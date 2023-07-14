"use client";

import SearchBar from "@/components/navbar/SearchBar";
import useCalendarModal from "@/hooks/searchTrip/useCalendarModal";
import useDestinationModal from "@/hooks/searchTrip/useDestinationModal";
import useSearchStore from "@/hooks/searchTrip/useSearchStore";
import suggestedDestinations from "../../../../public/suggestedDestinations";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { GrLocation } from "react-icons/gr";
import useCountries from "@/hooks/useCountries";
import { CountrySelectValue } from "@/components/inputs/CountrySelect";
import { isNumericLiteral } from "typescript";

const DestinationModal: React.FC = ({}) => {
  const { isOpen, onOpen, onClose } = useDestinationModal();
  const { destination, setDestination, searchingWord, setSearchingWord } =
    useSearchStore();
  const calenderModal = useCalendarModal();
  const { getAll } = useCountries();

  const Map = useMemo(
    () =>
      dynamic(() => import("../../../components/Map"), {
        ssr: false,
      }),
    [destination]
  );

  const selectHandler = (destination: CountrySelectValue) => {
    setDestination(destination);
    setSearchingWord(destination.label);
    onClose();
    calenderModal.onOpen();
  };

  if (!isOpen) {
    return null;
  }

  const countries = getAll();

  let filteredResults = countries;

  filteredResults = filteredResults.filter((result) =>
    result.label.toUpperCase().startsWith(searchingWord.toUpperCase())
  );

  filteredResults = filteredResults.slice(0, 5);

  let specificDestinationsBodyContent = (
    <div
      className="
    bg-white
    h-full
    py-7 
    gap-x-3  
    gap-y-8
    w-96  
    rounded-xl
    "
    >
      {filteredResults.map((result) => (
        <div
          className="flex flex-row align-center items-center mb-2 hover:bg-neutral-200 min-w-max py-3"
          onClick={() => {
            selectHandler(result);
          }}
        >
          <GrLocation
            size={50}
            className="bg-gray-100 p-3 rounded-md ml-6     "
          />
          <div className="ml-3 text-lg">{result.label}</div>
        </div>
      ))}
    </div>
  );

  let suggestedDestinationsBodyContent = (
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
    grid
    grid-cols-3
    py-10
    px-12
    pt-28
    gap-x-3  
    gap-y-8

  
    "
    >
      <div className="absolute top-9  left-8 my-5  text-sm font-bold  ">
        Search by region
      </div>
      {suggestedDestinations.map((suggestedDestination) => (
        <div
          className="flex-col flex relative w-32 "
          onClick={() => {
            selectHandler(suggestedDestination);
          }}
        >
          <img
            className={`w-32 rounded-xl border-[1px] hover:border-black ${
              suggestedDestination.label == destination.label &&
              "border-black border-[2px]  "
            } `}
            src={suggestedDestination.imageSrc}
          />
          <div
            className={`text-sm font-light mt-2 ${
              suggestedDestination.label == destination.label &&
              "font-semibold     "
            } `}
          >
            {suggestedDestination.label}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
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
          md:left-[25%]
          "
          onClick={(e) => e.stopPropagation()}
        >
          {searchingWord.length > 0 && filteredResults.length > 0
            ? specificDestinationsBodyContent
            : filteredResults.length == 0
            ? null
            : suggestedDestinationsBodyContent}
        </div>
      </div>
    </>
  );
};

export default DestinationModal;
