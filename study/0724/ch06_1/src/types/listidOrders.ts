import { UUID } from "./commonTypes";

export type ListidOrders = UUID[];

export interface ListidOrdersState {
  listidOrders: ListidOrders;
  setListidOrders: (listidOrders: ListidOrders) => void;
  addListidToOrders: (uuid: UUID) => void;
  removeListidFromOrders: (uuid: UUID) => void;
}
