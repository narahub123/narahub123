import { FC, useEffect, useState } from "react";
import {
  Calendar,
  ChooseTimeSlotModal,
  HomeHeader,
  Toast,
} from "../components";
import { TimeSlot } from "./AdminPage";
import { useOpenStore, useSchedulesStore } from "../stores";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../configs";
import { onAuthStateChanged } from "firebase/auth";

const HomePage: FC = () => {
  const setSchedule = useSchedulesStore((state) => state.setSchedule);
  const setSelectedDate = useSchedulesStore((state) => state.setSelectedDate);
  const [timeslot, setTimeslot] = useState<TimeSlot>({
    start: "",
    end: "",
  });
  const setIsChooseTimeSlotModalOpen = useOpenStore(
    (state) => state.setIsChooseTimeSlotModalOpen
  );

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
    setTimeslot({
      start: "",
      end: "",
    });
    setSelectedDate(date);
    setIsChooseTimeSlotModalOpen(true);
  };

  return (
    <div className="w-full h-screen">
      <ChooseTimeSlotModal timeslot={timeslot} setTimeslot={setTimeslot} />
      {isLogin && <HomeHeader />}
      <main className="flex flex-col items-center justify-center w-full h-screen space-y-4">
        <div className="flex justify-center">
          <Calendar onClick={handleClick} type="guest" />
        </div>
      </main>
      <Toast />
    </div>
  );
};

export default HomePage;
