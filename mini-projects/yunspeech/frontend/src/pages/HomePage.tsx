import { FC, useState } from "react";
import { Calendar } from "../components";
import { TimeSlot } from "./AdminPage";
import { useSchedulesStore } from "../stores";

const HomePage: FC = () => {
  const schedules = useSchedulesStore((state) => state.schedules);
  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log(schedules);

  const handleClick = (date: Date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <div>홈페이지 입니다. 사용자가 볼 수 있는 페이지</div>
      <div className="space-y-4">
        <div>
          <Calendar selectedDate={selectedDate} onClick={handleClick} />
        </div>
        <div>
          <div>{selectedDate.toLocaleDateString()}</div>
          <div>
            {(schedules[selectedDate.toLocaleDateString()] ?? []).map(
              (ts, idx) => (
                <div key={idx}>
                  {ts.start} {ts.end}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
