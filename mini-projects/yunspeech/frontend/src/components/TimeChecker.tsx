import { FC } from "react";
import { TimeSlot } from "../pages/AdminPage";
import { useSchedulesStore } from "../stores";
import { getDateKey } from "../utils";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../configs";

interface TimeCheckerProps {
  selectedDate: Date;
  index: number;
}

const TimeChecker: FC<TimeCheckerProps> = ({ selectedDate, index }) => {
  const schedules = useSchedulesStore((state) => state.schedules);
  const addTimeSlot = useSchedulesStore((state) => state.addTimeSlot);
  const setTimeSlot = useSchedulesStore((state) => state.setTimeSlot);
  const removeTimeSlot = useSchedulesStore((state) => state.deleteTimeSlot);

  const key = getDateKey(selectedDate);

  const removeTimeslotAtIndex = async (key: string, index: number) => {
    try {
      const docRef = doc(db, "schedules", key);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("해당 날짜의 스케줄 문서가 존재하지 않습니다.");
        return;
      }

      const data = docSnap.data();
      const slots = (data.slots || []) as TimeSlot[];

      if (index < 0 || index >= slots.length) {
        console.error("삭제할 인덱스가 유효하지 않습니다.");
        return;
      }

      // 해당 인덱스 제거
      const newSlots = [...slots];
      newSlots.splice(index, 1);

      // Firestore에 업데이트
      await updateDoc(docRef, { slots: newSlots });

      removeTimeSlot(key, index);
    } catch (err) {
      console.error(err);
    }
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
            const id = e.target.id;
            const value = e.target.value;

            console.log(id, value);

            const timeslot: TimeSlot = {
              ...schedules[key][index],
              [id]: value,
            };

            console.log(timeslot);

            setTimeSlot(key, index, timeslot);
          }}
          value={schedules[key][index].start}
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
              ...schedules[key][index],
              [id]: value,
            };

            setTimeSlot(key, index, timeslot);
          }}
          value={schedules[key][index].end}
        />
      </span>
      <span>
        <button
          className="material-icons btn btn-primary"
          onClick={() => addTimeSlot(key, index + 1)}
        >
          {"add"}
        </button>
      </span>
      <span>
        <button
          className="text-white material-icons btn btn-error"
          onClick={() => removeTimeslotAtIndex(key, index)}
        >
          {"remove"}
        </button>
      </span>
    </div>
  );
};

export default TimeChecker;
