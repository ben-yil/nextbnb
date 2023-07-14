"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { differenceInDays, formatISO } from "date-fns";

import useSearchModal from "@/hooks/searchTrip/useSearchModal";
import useCountries from "@/hooks/useCountries";
import useDestinationModal from "@/hooks/searchTrip/useDestinationModal";
import useCalendarModal from "@/hooks/searchTrip/useCalendarModal";
import useSearchStore from "@/hooks/searchTrip/useSearchStore";
import useGuestModal from "@/hooks/searchTrip/useGuestModal";

const SearchBar = () => {
  const searchModal = useSearchModal();
  const destinationModal = useDestinationModal();
  const calenderModal = useCalendarModal();
  const guestModal = useGuestModal();

  const searchStore = useSearchStore();

  const params = useSearchParams();
  const router = useRouter();

  const { getByValue } = useCountries();

  //const locationValue = params?.get("locationValue");
  const locationValue = searchStore.destination.value;

  //const startDate = params?.get("startDate");
  const startDate = searchStore?.dateRange.startDate;
  //const endDate = params?.get("endDate");
  const endDate = searchStore.dateRange.endDate;
  const guestCount = searchStore.totalGuest;

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue);
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as Date);
      const end = new Date(endDate as Date);
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

  const calenderHandler = useCallback(() => {
    calenderModal.onOpen();
    destinationModal.onClose();
    guestModal.onClose();
  }, [destinationModal, calenderModal, guestModal]);

  const destinationHandler = useCallback(() => {
    destinationModal.onOpen();
    calenderModal.onClose();
    guestModal.onClose();
  }, [destinationModal, calenderModal, guestModal]);

  const guestHandler = useCallback(() => {
    guestModal.onOpen();
    destinationModal.onClose();
    calenderModal.onClose();
  }, [destinationModal, calenderModal, guestModal]);

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue,
      guestCount,
      startDate,
      endDate,
    };

    if (startDate) {
      updatedQuery.startDate = formatISO(startDate);
    }

    if (endDate) {
      updatedQuery.endDate = formatISO(endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
    guestModal.onClose();
  }, [searchModal, router, guestCount, params]);

  return (
    <div
      className="
        absolute
        left-[27%]
        right-[27%]
        mt-32 
        border-[1px] 
        md:w-auto 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
        mb-4 
        bg-gray-100
        
      "
    >
      <div
        className="

          flex 
          flex-row 
          items-center 
        "
      >
        <div
          className={`flex flex-grow   flex-col rounded-3xl pl-6 pr-28 py-2   ${
            destinationModal.isOpen && "scale-110 bg-white shadow-2xl "
          } `}
          onClick={destinationHandler}
        >
          <div className="text-sm">Where</div>
          <div className=" text-sm font-semibold flex-1 mr-46">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Anywhere"
              value={searchStore.searchingWord}
              onChange={(e) => searchStore.setSearchingWord(e.target.value)}
            />
          </div>
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
          onClick={calenderHandler}
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
          <div className="hidden sm:block flex-1 pr-16" onClick={guestHandler}>
            {guestLabel}
          </div>
          <div
            className="
              flex
              flex-row
              p-2
              rounded-full 
              text-white
              bg-rose-500
            "
            onClick={() => onSubmit()}
          >
            <BiSearch size={18} />
            <div>Search</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
