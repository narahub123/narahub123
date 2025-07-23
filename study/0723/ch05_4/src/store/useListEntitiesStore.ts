import { create } from "zustand";
import { ListEntitiesState } from "../types";

export const useListEntitiesStore = create<ListEntitiesState>((set) => ({
  listEntities: {},
  addList: (list) =>
    set((state) => ({
      ...state.listEntities,
      [list.uuid]: list,
    })),
  removeList: (uuid) =>
    set((state) => {
      const newState = { ...state.listEntities };
      delete newState[uuid];

      return newState;
    }),
}));
