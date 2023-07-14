"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  onFinish?:() => void;
  disabledDates?: Date[];
  
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  onFinish,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      onRangeFocusChange={onFinish}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
