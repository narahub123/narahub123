import { UUID } from "crypto";
import { Card } from "./commonTypes";

export type CardEntities = Record<UUID, Card>;

export interface CardEntitiesState {
  cardEntities: CardEntities;
  addCard: (card: Card) => void;
  removeCard: (uuid: UUID) => void;
}
