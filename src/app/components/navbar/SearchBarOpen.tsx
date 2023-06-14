"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";

import useCountries from "@/app/hooks/useCountries";


const SearchBarOpen = () => {
 
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      className="
        border-[1px] 
        absolute
        w-full 
        md:w-auto 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
        left-[32%]
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          className="
            text-sm 
            font-semibold 
            px-6
            py-4
            rounded-full
            
            "
        >
          {locationLabel}
        </div>
        <div
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel}
        </div>
        <div
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
           
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarOpen;