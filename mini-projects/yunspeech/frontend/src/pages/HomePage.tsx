import { FC, useEffect, useState } from "react";
import { Calendar } from "../components";
import { TimeSlot } from "./AdminPage";
import { useSchedulesStore } from "../stores";
import { useNavigate } from "react-router-dom";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const schedules = useSchedulesStore((state) => state.schedules);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timeslot, setTimeslot] = useState<TimeSlot>({
    start: "",
    end: "",
  });

  useEffect(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    setSelectedDate(today);
  }, []);

  const handleClick = (date: Date) => {
    setIsOpen(false);
    setTimeslot({
      start: "",
      end: "",
    });
    setSelectedDate(date);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    const startTime =
      schedules[selectedDate.toLocaleDateString()][selectedIndex].start;

    const endTime =
      schedules[selectedDate.toLocaleDateString()][selectedIndex].end;

    if (value < startTime) {
      console.error(`상담 시간은 ${startTime}이후여야 합니다.`);
      return;
    }

    if (value > endTime) {
      console.error(`상담 시간은 ${endTime}이전여야 합니다.`);
      return;
    }

    if (id === "start" && value > timeslot.end) {
      console.error(`시작 시간은 종료시간 이전여야 합니다.`);
      return;
    }

    if (id === "end" && value < timeslot.start) {
      console.error(`종료 시간은 시작 시간 이후여야 합니다.`);
      return;
    }

    setTimeslot((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <div>
      <div>홈페이지 입니다. 사용자가 볼 수 있는 페이지</div>
      <div>
        <button onClick={() => navigate("/admin")}>관리자로</button>
      </div>
      <div className="space-y-4">
        <div>
          <Calendar
            selectedDate={selectedDate}
            onClick={handleClick}
            type="guest"
          />
        </div>
        <div className="space-y-2">
          <div>{selectedDate.toLocaleDateString()}</div>
          {!isOpen && (
            <div className="space-y-2">
              {(schedules[selectedDate.toLocaleDateString()] ?? []).map(
                (ts, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span>
                      <span>시작 시간</span>
                      <span>{ts.start}</span>
                    </span>
                    <span>
                      <span>종료 시간</span>
                      <span>{ts.end}</span>
                    </span>
                    <span>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setTimeslot({
                            start: ts.start,
                            end: ts.end,
                          });

                          setSelectedIndex(idx);

                          setIsOpen(true);
                        }}
                      >
                        선택
                      </button>
                    </span>
                  </div>
                )
              )}
            </div>
          )}
          {isOpen && (
            <div className="space-y-2">
              <div>
                <span>
                  <label htmlFor="start">시작 시간</label>
                  <input
                    type="time"
                    name="start"
                    id="start"
                    min={
                      schedules[selectedDate.toLocaleDateString()][
                        selectedIndex
                      ].start
                    }
                    onChange={handleChange}
                    value={timeslot.start}
                  />
                </span>
                <span>
                  <label htmlFor="end">종료 시간</label>
                  <input
                    type="time"
                    name="end"
                    id="end"
                    onChange={handleChange}
                    max={
                      schedules[selectedDate.toLocaleDateString()][
                        selectedIndex
                      ].end
                    }
                    value={timeslot.end}
                  />
                </span>
              </div>
              <div>
                <button className="btn btn-primary">상담 폼 작성하기</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
