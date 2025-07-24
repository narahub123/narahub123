import * as CT from "./commonTypes";

export type ListidCarditOrders = Record<CT.UUID, CT.UUID[]>;

export interface ListidCarditOrdersState {
  listidCardidOrders: ListidCarditOrders;
  setListidCardids: (listidCardids: CT.ListidCardidS) => void;
  removeListid: (uuid: CT.UUID) => void;
  prependCardidToListid: (listidCardid: CT.CardidListid) => void;
  appendCardidToListid: (listidCardid: CT.CardidListid) => void;
  removeCardidFromListid: (listidCardid: CT.CardidListid) => void;
}
