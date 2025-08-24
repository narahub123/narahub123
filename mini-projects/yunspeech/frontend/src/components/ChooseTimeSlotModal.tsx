import { FC, useState } from "react";
import { useOpenStore, useSchedulesStore } from "../stores";
import { Modal, ModalContent } from "../theme/daisyui";
import { TimeSlot } from "../types";
import { getDateKey } from "../utils";
import { useToast } from "../hooks";

interface ChooseTimeSlotModalProps {
  timeslot: TimeSlot;
  setTimeslot: React.Dispatch<React.SetStateAction<TimeSlot>>;
}

const ChooseTimeSlotModal: FC<ChooseTimeSlotModalProps> = ({
  timeslot,
  setTimeslot,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const schedules = useSchedulesStore((state) => state.schedules);
  const isOpen = useOpenStore((state) => state.isChooseTimeSlotModalOpen);
  const [isDone, setIsDone] = useState(false);
  const setIsChooseTimeSlotModalOpen = useOpenStore(
    (state) => state.setIsChooseTimeSlotModalOpen
  );
  const selectedDate = useSchedulesStore((state) => state.selectedDate);

  const key = getDateKey(selectedDate);

  const toast = useToast();

  const onClose = () => {
    setIsDone(false);
    setIsChooseTimeSlotModalOpen(false);
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
    <Modal open={isOpen}>
      <ModalContent onCloseIconClicked={onClose}>
        <div className="space-y-2">
          <div className="flex justify-center">{key}</div>
          {!isDone && (
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
                        setIsDone(true);
                      }}
                    >
                      선택
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}
          {isDone && (
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
              </div>
              <div className="flex justify-between w-full">
                <button
                  className="btn btn-warning"
                  onClick={() => setIsDone(false)}
                >
                  이전으로
                </button>
                <button className="btn btn-primary">상담 폼 작성하기</button>
              </div>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ChooseTimeSlotModal;
