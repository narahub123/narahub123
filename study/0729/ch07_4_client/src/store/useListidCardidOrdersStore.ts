import { create } from "zustand";
import { ListidCarditOrdersState } from "../types";

export const useListidCardidOrdersStore = create<ListidCarditOrdersState>(
  (set) => ({
    listidCardidOrders: {},
    setListidCardids: (listidCardids) =>
      set((state) => ({
        ...state,
        listidCardidOrders: {
          ...state.listidCardidOrders,
          [listidCardids.listid]: listidCardids.cardids,
        },
      })),
    removeListid: (uuid) =>
      set((state) => {
        const newListidCardids = { ...state.listidCardidOrders };

        delete newListidCardids[uuid];

        return {
          ...state,
          listidCardidOrders: newListidCardids,
        };
      }),
    prependCardidToListid: (listidCardids) =>
      set((state) => ({
        ...state,
        listidCardidOrders: {
          ...state.listidCardidOrders,
          [listidCardids.listid]: [
            listidCardids.cardid,
            ...(state.listidCardidOrders[listidCardids.listid] ?? []),
          ],
        },
      })),
    appendCardidToListid: (listidCardids) =>
      set((state) => ({
        ...state,
        listidCardidOrders: {
          ...state.listidCardidOrders,
          [listidCardids.listid]: [
            ...(state.listidCardidOrders[listidCardids.listid] ?? []),
            listidCardids.cardid,
          ],
        },
      })),
    removeCardidFromListid: (listidCardids) =>
      set((state) => ({
        ...state,
        listidCardidOrders: {
          ...state.listidCardidOrders,
          [listidCardids.listid]:
            state.listidCardidOrders[listidCardids.listid]?.filter(
              (id) => id !== listidCardids.cardid
            ) ?? [],
        },
      })),
  })
);
