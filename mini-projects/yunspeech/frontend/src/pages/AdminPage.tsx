import { FC, useEffect, useState } from "react";
import { AdminHeader, Calendar, SetTimeSlotModal } from "../components";
import { useOpenStore, useSchedulesStore } from "../stores";
import { getDateKey } from "../utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../configs";
import { collection, getDocs } from "firebase/firestore";

export interface TimeSlot {
  start: string;
  end: string;
}

const AdminPage: FC = () => {
  const setSchedule = useSchedulesStore((state) => state.setSchedule);
  const setIsSetTimeSlotOpen = useOpenStore(
    (state) => state.setIsSetTimeSlotModalOpen
  );
  const setSelectedDate = useSchedulesStore((state) => state.setSelectedDate);

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
    setIsSetTimeSlotOpen(true);
  };

  return (
    <div className="">
      <SetTimeSlotModal />
      <AdminHeader isLogin={isLogin} setIsLogin={setIsLogin} />
      {isLogin && (
        <main className="flex flex-col items-center justify-center w-full h-screen">
          <div className="flex justify-center p-4">
            <Calendar onClick={getSelectedDate} type="admin" />
          </div>
        </main>
      )}
    </div>
  );
};

export default AdminPage;
