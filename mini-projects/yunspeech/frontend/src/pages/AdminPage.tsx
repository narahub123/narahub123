import { FC, useEffect, useState } from "react";
import { AdminHeader, Calendar, TimeChecker } from "../components";
import { useSchedulesStore } from "../stores";
import { getDateKey } from "../utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../configs";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export interface TimeSlot {
  start: string;
  end: string;
}

const AdminPage: FC = () => {
  const schedules = useSchedulesStore((state) => state.schedules);
  const setSchedule = useSchedulesStore((state) => state.setSchedule);
  const addTimeSlot = useSchedulesStore((state) => state.addTimeSlot);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLogin, setIsLogin] = useState(false);

  const key = getDateKey(selectedDate);

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

  // 선택 날짜 초기화
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

  const getSelectedDate = (date: Date) => {
    setSelectedDate(date);
  };

  console.log(schedules);

  const handleSave = async () => {
    try {
      const scheduleRef = doc(db, "schedules", key);

      await setDoc(
        scheduleRef,
        { slots: schedules[key] },
        {
          merge: true,
        }
      );
    } catch (err) {
      console.error("저장 실패", err);
    }
  };

  return (
    <div className="">
      <AdminHeader isLogin={isLogin} setIsLogin={setIsLogin} />

      {isLogin && (
        <main className="flex flex-col items-center justify-center w-full h-full">
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
              <span>{key}</span>
            </div>
            <div>
              <div className="flex flex-col items-center space-y-2">
                {schedules[key] &&
                  schedules[key].length > 0 &&
                  schedules[key].map((_, index) => (
                    <TimeChecker
                      key={index}
                      selectedDate={selectedDate}
                      index={index}
                    />
                  ))}
                {schedules[key] &&
                  schedules[key].length > 0 &&
                  schedules[key][0].start &&
                  schedules[key][0].end && (
                    <div>
                      <button className="btn btn-primary" onClick={handleSave}>
                        저장
                      </button>
                    </div>
                  )}
              </div>
              {(!schedules[key] || schedules[key].length === 0) && (
                <div className="flex justify-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => addTimeSlot(key, 0)}
                    title="시간 추가"
                  >
                    <span className="material-icons">{"add"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default AdminPage;
