import { FC } from "react";
import { TimeSlot } from "../pages/AdminPage";
import { useSchedulesStore } from "../stores";

interface TimeCheckerProps {
  selectedDate: Date;
  index: number;
}

const TimeChecker: FC<TimeCheckerProps> = ({ selectedDate, index }) => {
  const schedules = useSchedulesStore((state) => state.schedules);
  const addTimeSlot = useSchedulesStore((state) => state.addTimeSlot);
  const setTimeSlot = useSchedulesStore((state) => state.setTimeSlot);
  const removeTimeSlot = useSchedulesStore((state) => state.deleteTimeSlot);

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
            const id = e.target.id;
            const value = e.target.value;

            console.log(id, value);

            const timeslot: TimeSlot = {
              ...schedules[selectedDate.toLocaleDateString()][index],
              [id]: value,
            };

            console.log(timeslot);

            setTimeSlot(selectedDate.toLocaleDateString(), index, timeslot);
          }}
          value={schedules[selectedDate.toLocaleDateString()][index].start}
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
            const id = e.target.id;
            const value = e.target.value;

            const timeslot: TimeSlot = {
              ...schedules[selectedDate.toLocaleDateString()][index],
              [id]: value,
            };

            setTimeSlot(selectedDate.toLocaleDateString(), index, timeslot);
          }}
          value={schedules[selectedDate.toLocaleDateString()][index].end}
        />
      </span>
      <span>
        <button
          className="material-icons btn btn-primary"
          onClick={() =>
            addTimeSlot(selectedDate.toLocaleDateString(), index + 1)
          }
        >
          {"add"}
        </button>
      </span>
      <span>
        <button
          className="text-white material-icons btn btn-error"
          onClick={() =>
            removeTimeSlot(selectedDate.toLocaleDateString(), index)
          }
        >
          {"remove"}
        </button>
      </span>
    </div>
  );
};

export default TimeChecker;
