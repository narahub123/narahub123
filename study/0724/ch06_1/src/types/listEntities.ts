import { List, UUID } from "./commonTypes";

export type ListEntities = Record<string, List>;

export interface ListEntitiesState {
  listEntities: ListEntities;
  addList: (list: List) => void;
  removeList: (uuid: string) => void;
}
