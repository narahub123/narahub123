import { FC, useState } from "react";
import { Calendar, TimeChecker } from "../components";

export interface TimeSlot {
  start: string;
  end: string;
}

const AdminPage: FC = () => {
  const [schedules, setSchedules] = useState<Record<string, TimeSlot[]>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  const addTimeSlot = () => {
    setSchedules((prev) => ({
      ...prev,
      [selectedDate.toLocaleDateString()]: [
        {
          start: "",
          end: "",
        },
      ],
    }));
  };

  console.log(schedules);

  return (
    <div className="space-y-4">
      <div>
        <p>관리자 페이지입니다.</p>
      </div>
      <div>
        <p>달력</p>
        <Calendar selectedDate={selectedDate} onClick={getSelectedDate} />
      </div>
      <div>
        <div className="flex justify-center gap-4">
          <span>선택한 날짜</span>
          <span>{selectedDate.toLocaleDateString()}</span>
        </div>
        <div>
          <div>시간 설정하기</div>
          <div className="space-y-2">
            {(schedules[selectedDate.toLocaleDateString()] ?? []).map(
              (_, index) => (
                <TimeChecker
                  key={index}
                  selectedDate={selectedDate}
                  index={index}
                  setSchedules={setSchedules}
                />
              )
            )}
          </div>
          <button onClick={addTimeSlot}>시간 추가</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
