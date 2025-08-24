export interface TimeSlot {
  start: string;
  end: string;
}

export interface ScheduleState {
  schedules: Record<string, TimeSlot[]>;
  setSchedule: (schedules: Record<string, TimeSlot[]>) => void;
  addTimeSlot: (date: string, index: number) => void;
  deleteTimeSlot: (date: string, index: number) => void;
  setTimeSlot: (date: string, index: number, timeslot: TimeSlot) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export interface ToastType {
  type: "error" | "success";
  message: string;
}

export type ToastStore = {
  toast?: ToastType;
  setToast: (toast: ToastType) => void;
  clearToast: () => void;
};

export type OpenState = {
  isToastOpen: boolean;
  setIsToastOpen: (isToastOpen: boolean) => void;
  isChooseTimeSlotModalOpen: boolean;
  setIsChooseTimeSlotModalOpen: (isChooseTimeSlotModalOpen: boolean) => void;
  isSetTimeSlotModalOpen: boolean;
  setIsSetTimeSlotModalOpen: (isSetTimeSlotModalOpen: boolean) => void;
};
