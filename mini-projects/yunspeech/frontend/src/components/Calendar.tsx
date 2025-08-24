import { FC, useEffect, useState } from "react";
import DateButton from "./DateButton";
import { useSchedulesStore } from "../stores";

interface CalendarProps {
  onClick: (date: Date) => void;
  type: "admin" | "guest";
}

const Calendar: FC<CalendarProps> = ({ onClick, type }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const selectedDate = useSchedulesStore((state) => state.selectedDate);

  useEffect(() => {
    const prevDate = new Date(currentMonth);

    prevDate.setDate(1);
    const firstDayOfMonth = prevDate.getDay();

    prevDate.setDate(0);
    const lastDateOfPrevMonth = prevDate.getDate();

    const prevMonthDates = Array.from({ length: firstDayOfMonth })
      .map((_, index) => lastDateOfPrevMonth - index)
      .reverse()
      .map((date) => {
        const dated = new Date(prevDate.setDate(date));

        dated.setHours(0, 0, 0, 0);

        return dated;
      });

    const targetDate = new Date(currentMonth);

    const curMonth = targetDate.getMonth();

    targetDate.setMonth(targetDate.getMonth() + 1);

    if (curMonth + 2 === targetDate.getMonth()) {
      targetDate.setMonth(targetDate.getMonth() - 1);
    }
    targetDate.setDate(0);

    const lastDateOfMonth = targetDate.getDate();

    const curMonthDates = Array.from({ length: lastDateOfMonth }).map(
      (_, index) => {
        const date = new Date(targetDate.setDate(index + 1));

        date.setHours(0, 0, 0, 0);

        return date;
      }
    );

    const nextDate = new Date(currentMonth);

    const nextMonth = nextDate.getMonth();
    nextDate.setMonth(nextDate.getMonth() + 1);

    if (nextMonth + 2 === nextDate.getMonth()) {
      nextDate.setMonth(nextDate.getMonth() - 1);
    }
    nextDate.setDate(0);

    const lastDayOfMonth = nextDate.getDay();

    const nextMonthDates = Array.from({ length: 6 - lastDayOfMonth }).map(
      (_) => {
        const date = new Date(nextDate.setDate(nextDate.getDate() + 1));

        date.setHours(0, 0, 0, 0);

        return date;
      }
    );

    const dates = [...prevMonthDates, ...curMonthDates, ...nextMonthDates];

    setDates(dates);
  }, [currentMonth]);

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="items-center max-w-[500px] space-y-2 border p-2">
      <div className="flex items-center justify-around p-2">
        <div className="w-full">
          <button className="w-full" onClick={prevMonth}>
            <span className="text-2xl material-icons">{"chevron_left"}</span>
          </button>
        </div>
        <div className="flex justify-center w-full font-bold">
          <p>{`${currentMonth.getFullYear()}년 ${
            currentMonth.getMonth() + 1
          }월`}</p>
        </div>
        <div className="w-full">
          <button className="w-full" onClick={nextMonth}>
            <span className="text-2xl material-icons">{"chevron_right"}</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center">
        {days.map((day) => (
          <p key={day} className="flex justify-center">
            {day}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {dates.map((date) => (
          <div key={date.toDateString()} className="flex justify-center p-2">
            <DateButton
              date={date}
              onClick={onClick}
              selectedDate={selectedDate}
              type={type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
