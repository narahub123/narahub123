import { create } from "zustand";
import { ListidOrdersState } from "../types/listidOrders";

export const useListidOrdersStore = create<ListidOrdersState>((set) => ({
  listidOrders: [],
  setListidOrders: (listidOrders) =>
    set((state) => ({
      ...state,
      listidOrders,
    })),
  addListidToOrders: (uuid) =>
    set((state) => ({
      ...state,
      listidOrders: [...state.listidOrders, uuid],
    })),
  removeListidFromOrders: (uuid) =>
    set((state) => ({
      ...state,
      listidOrders: state.listidOrders.filter((id) => id !== uuid),
    })),
}));
