import { FC } from "react";
import { TimeSlot } from "../pages/AdminPage";

interface TimeCheckerProps {
  selectedDate: Date;
  setSchedules: React.Dispatch<
    React.SetStateAction<Record<string, TimeSlot[]>>
  >;
  index: number;
}

const TimeChecker: FC<TimeCheckerProps> = ({
  selectedDate,
  setSchedules,
  index,
}) => {
  const removeTime = () => {
    setSchedules((prev) => ({
      ...prev,
      [selectedDate.toLocaleDateString()]: prev[
        selectedDate.toLocaleDateString()
      ].filter((_, idx) => idx !== index),
    }));
  };

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-2 p-2 border">
        <label className="font-bold" htmlFor="start">
          시작 시간
        </label>
        <input
          type="time"
          name="start"
          id="start"
          onChange={(e) => {
            const start = e.target.value;

            setSchedules((prev) => ({
              ...prev,
              [selectedDate.toLocaleDateString()]: prev[
                selectedDate.toLocaleDateString()
              ].map((ts, idx) => {
                if (index === idx) {
                  return {
                    ...ts,
                    start,
                  };
                } else return ts;
              }),
            }));
          }}
        />
      </span>
      <span className="flex items-center gap-2 p-2 border">
        <label className="font-bold" htmlFor="end">
          종료 시간
        </label>
        <input
          type="time"
          name="end"
          id="end"
          onChange={(e) => {
            const end = e.target.value;

            setSchedules((prev) => ({
              ...prev,
              [selectedDate.toLocaleDateString()]: prev[
                selectedDate.toLocaleDateString()
              ].map((ts, idx) => {
                if (index === idx) {
                  return {
                    ...ts,
                    end,
                  };
                } else return ts;
              }),
            }));
          }}
        />
      </span>
      <span>
        <button className="material-icons btn" onClick={removeTime}>
          {"remove"}
        </button>
      </span>
      <span>
        <button className="material-icons btn" onClick={removeTime}>
          {"add"}
        </button>
      </span>
    </div>
  );
};

export default TimeChecker;
