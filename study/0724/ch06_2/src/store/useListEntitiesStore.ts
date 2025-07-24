import { create } from "zustand";
import { ListEntitiesState } from "../types";

export const useListEntitiesStore = create<ListEntitiesState>((set) => ({
  listEntities: {},
  addList: (list) =>
    set((state) => ({
      ...state,
      listEntities: {
        ...state.listEntities,
        [list.uuid]: list,
      },
    })),
  removeList: (uuid) =>
    set((state) => {
      const newListEntities = { ...state.listEntities };
      delete newListEntities[uuid];

      return {
        ...state,
        listEntities: newListEntities,
      };
    }),
}));
