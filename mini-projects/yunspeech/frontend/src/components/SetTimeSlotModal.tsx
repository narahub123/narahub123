import { FC } from "react";
import { Modal, ModalContent } from "../theme/daisyui";
import { useOpenStore, useSchedulesStore } from "../stores";
import { getDateKey } from "../utils";
import TimeChecker from "./TimeChecker";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../configs";

interface SetTimeSlotModalProps {}

const SetTimeSlotModal: FC<SetTimeSlotModalProps> = ({}) => {
  const schedules = useSchedulesStore((state) => state.schedules);
  const selectedDate = useSchedulesStore((state) => state.selectedDate);
  const addTimeSlot = useSchedulesStore((state) => state.addTimeSlot);
  const isSetTimeSlotModalOpen = useOpenStore(
    (state) => state.isSetTimeSlotModalOpen
  );
  const setIsSetTimeSlotOpen = useOpenStore(
    (state) => state.setIsSetTimeSlotModalOpen
  );

  const key = getDateKey(selectedDate);

  const onClose = () => {
    setIsSetTimeSlotOpen(false);
  };

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

  console.log(schedules[key]);

  return (
    <Modal open={isSetTimeSlotModalOpen}>
      <ModalContent onCloseIconClicked={onClose}>
        <div>
          <h2>{key}</h2>
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
      </ModalContent>
    </Modal>
  );
};

export default SetTimeSlotModal;
