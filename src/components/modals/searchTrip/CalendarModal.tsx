"use client";

import { useState } from "react";
import { Range } from "react-date-range";
import Calendar from "@/components/inputs/Calendar";
import useCalendarModal from "@/hooks/searchTrip/useCalendarModal";
import useSearchStore from "@/hooks/searchTrip/useSearchStore";
import GuestModal from "@/components/modals/searchTrip/GuestModal";
import useGuestModal from "@/hooks/searchTrip/useGuestModal";

const CalendarModal: React.FC = ({}) => {
  const { isOpen, onOpen, onClose } = useCalendarModal();
  const guestModal = useGuestModal();
  //   const [dateRange, setDateRange] = useState<Range>({
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   });

  const { dateRange, setDateRange } = useSearchStore();
  const [count, setCount] = useState(1);

  const selectHandler = (date: Range) => {
    setCount(count + 1);
    setDateRange(date);
    if (count % 2 == 0) {
      onClose();
      guestModal.onOpen();
    }
  };
  const handler = () => {};

  if (!isOpen) {
    return null;
  }
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
          h-auto
          mx-auto
          lg:h-auto
          md:h-auto
          absolute
          md:left-[35%]
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
              py-5 
              px-12

              "
          >
            <div className="relative flex ">
              <Calendar
                onFinish={handler}
                onChange={(value) => selectHandler(value.selection)}
                value={dateRange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CalendarModal;
