import { create } from "zustand";
import { ScheduleState, TimeSlot } from "../types";

export const useSchedulesStore = create<ScheduleState>((set) => ({
  schedules: {},
  setSchedule: (schedule: Record<string, TimeSlot[]>) =>
    set((state) => ({
      schedules: {
        ...state.schedules,
        ...schedule,
      },
    })),
  addTimeSlot: (date: string, index: number) =>
    set((state) => {
      const copy = [...(state.schedules[date] || [])];

      copy.splice(index, 0, { start: "", end: "" });
      return {
        schedules: {
          ...state.schedules,
          [date]: copy,
        },
      };
    }),
  deleteTimeSlot: (date: string, index: number) =>
    set((state) => ({
      schedules: {
        ...state.schedules,
        [date]: (state.schedules[date] || []).filter(
          (st, idx) => idx !== index
        ),
      },
    })),
  setTimeSlot: (date: string, index: number, timeslot: TimeSlot) =>
    set((state) => {
      const update = [...(state.schedules[date] || [])].map((st, idx) => {
        if (idx === index) {
          return timeslot;
        } else return st;
      });

      console.log(update);

      return {
        schedules: {
          ...state.schedules,
          [date]: update,
        },
      };
    }),
}));
