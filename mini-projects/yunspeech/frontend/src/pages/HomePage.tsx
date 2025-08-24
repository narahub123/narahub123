import { FC, useEffect, useState } from "react";
import { Calendar, Toast } from "../components";
import { TimeSlot } from "./AdminPage";
import { useSchedulesStore } from "../stores";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks";
import { getDateKey } from "../utils";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../configs";
import { onAuthStateChanged } from "firebase/auth";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const schedules = useSchedulesStore((state) => state.schedules);
  const setSchedule = useSchedulesStore((state) => state.setSchedule);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timeslot, setTimeslot] = useState<TimeSlot>({
    start: "",
    end: "",
  });

  const [isLogin, setIsLogin] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const result = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    return () => result();
  }, []);

  const key = getDateKey(selectedDate);

  const toast = useToast();

  useEffect(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    setSelectedDate(today);
  }, []);

  // 스케줄 불러오기
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const schedulesCollection = collection(db, "schedules");

        const snapshot = await getDocs(schedulesCollection);

        if (snapshot.empty) {
          console.log("데이터 없음");
          return;
        }

        snapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          setSchedule({ [doc.id]: doc.data().slots });
        });
      } catch (err) {
        console.error("데이터 가져오기 실패", err);
      }
    };

    getSchedules();
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

    const startTime = schedules[key][selectedIndex].start;

    const endTime = schedules[key][selectedIndex].end;

    if (value < startTime) {
      console.error(`상담 시간은 ${startTime}이후여야 합니다.`);
      toast({
        type: "error",
        message: `상담 시간은 ${startTime}이후여야 합니다.`,
      });
      return;
    }

    if (value > endTime) {
      console.error(`상담 시간은 ${endTime}이전여야 합니다.`);
      toast({
        type: "error",
        message: `상담 시간은 ${endTime}이전이어야 합니다.`,
      });
      return;
    }

    if (id === "start" && value >= timeslot.end) {
      console.error(`시작 시간은 종료시간 이전여야 합니다.`);
      toast({
        type: "error",
        message: `시작 시간은 종료시간 이전이어야 합니다.`,
      });
      return;
    }

    if (id === "end" && value <= timeslot.start) {
      console.error(`종료 시간은 시작 시간 이후여야 합니다.`);
      toast({
        type: "error",
        message: `종료 시간은 시작 시간 이후여야 합니다.`,
      });
      return;
    }

    setTimeslot((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      {isLogin && (
        <div>
          <button onClick={() => navigate("/admin")}>관리자로</button>
        </div>
      )}
      <div className="space-y-4">
        <div className="flex justify-center">
          <Calendar
            selectedDate={selectedDate}
            onClick={handleClick}
            type="guest"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-center">{key}</div>
          {!isOpen && (
            <div className="flex flex-col items-center space-y-2">
              {(schedules[key] ?? []).map((ts, idx) => (
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
              ))}
            </div>
          )}
          {isOpen && (
            <div className="flex flex-col items-center space-y-2">
              <div>상담 시간 설정</div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 p-2 border">
                  <label htmlFor="start">시작 시간</label>
                  <input
                    type="time"
                    name="start"
                    id="start"
                    min={schedules[key][selectedIndex].start}
                    onChange={handleChange}
                    value={timeslot.start}
                  />
                </span>
                <span className="flex items-center gap-2 p-2 border">
                  <label htmlFor="end">종료 시간</label>
                  <input
                    type="time"
                    name="end"
                    id="end"
                    onChange={handleChange}
                    max={schedules[key][selectedIndex].end}
                    value={timeslot.end}
                  />
                </span>
                <button className="btn btn-primary">상담 폼 작성하기</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default HomePage;
