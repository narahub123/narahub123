import { create } from "zustand";
import { CardEntitiesState } from "../types";

export const useCardEntitiesStore = create<CardEntitiesState>((set) => ({
  cardEntities: {},
  addCard: (card) =>
    set((state) => ({
      cardEntities: {
        ...state.cardEntities,
        [card.uuid]: card,
      },
    })),

  removeCard: (uuid) =>
    set((state) => {
      const newCardEntities = { ...state.cardEntities };

      delete newCardEntities[uuid];

      return {
        ...state,
        cardEntities: newCardEntities,
      };
    }),
}));
