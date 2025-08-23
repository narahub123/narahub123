import { FC, useEffect, useState } from "react";
import { Calendar, TimeChecker } from "../components";
import { useSchedulesStore } from "../stores";
import { useNavigate } from "react-router-dom";

export interface TimeSlot {
  start: string;
  end: string;
}

const AdminPage: FC = () => {
  const navigate = useNavigate();
  const schedules = useSchedulesStore((state) => state.schedules);
  const addTimeSlot = useSchedulesStore((state) => state.addTimeSlot);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    setSelectedDate(today);
  }, []);

  console.log(selectedDate);

  const getSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  console.log(schedules);

  return (
    <div className="">
      <div>
        <p>관리자 페이지입니다.</p>
      </div>
      <div>
        <button onClick={() => navigate("/")}>홈으로</button>
      </div>
      <div className="flex justify-center p-4">
        <Calendar
          selectedDate={selectedDate}
          onClick={getSelectedDate}
          type="admin"
        />
      </div>
      <div className="flex flex-col justify-center p-2 space-y-4">
        <div className="flex justify-center gap-4 ">
          <span>선택한 날짜</span>
          <span>{selectedDate.toLocaleDateString()}</span>
        </div>
        <div>
          <div className="flex flex-col items-center space-y-2">
            {(schedules[selectedDate.toLocaleDateString()] ?? []).map(
              (_, index) => (
                <TimeChecker
                  key={index}
                  selectedDate={selectedDate}
                  index={index}
                />
              )
            )}
          </div>
          {(!schedules[selectedDate.toLocaleDateString()] ||
            schedules[selectedDate.toLocaleDateString()].length === 0) && (
            <div className="flex justify-center">
              <button
                className="btn btn-primary"
                onClick={() =>
                  addTimeSlot(selectedDate.toLocaleDateString(), 0)
                }
                title="시간 추가"
              >
                <span className="material-icons">{"add"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
