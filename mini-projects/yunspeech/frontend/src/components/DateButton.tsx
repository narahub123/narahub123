import { FC } from "react";
import { useSchedulesStore } from "../stores";
import { getDateKey } from "../utils";

interface DateButtonProps {
  date: Date;
  selectedDate: Date;
  onClick: (date: Date) => void;
  type: "admin" | "guest";
}

const DateButton: FC<DateButtonProps> = ({
  date,
  onClick,
  selectedDate,
  type,
}) => {
  const schedules = useSchedulesStore((state) => state.schedules);

  const key = getDateKey(date);

  const isSelected = date.getTime() === selectedDate.getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = today > date;
  const isDisabled =
    isPast ||
    !schedules[key] ||
    schedules[key].length === 0 ||
    (schedules[key].length === 1 && !schedules[key][0].start);
  const hasSchedules = schedules[key] && schedules[key].length > 0;
  return (
    <button
      className={`btn-circle ${
        type === "guest"
          ? isSelected
            ? "bg-green-500"
            : isDisabled
            ? "bg-gray-100"
            : "bg-blue-200"
          : isSelected
          ? "bg-green-500"
          : hasSchedules
          ? "bg-pink-200"
          : isPast
          ? "bg-gray-100"
          : "bg-blue-50"
      }`}
      onClick={() => onClick(date)}
      disabled={type === "guest" ? isDisabled : undefined}
    >
      <div>{date.getDate()}</div>
    </button>
  );
};

export default DateButton;
