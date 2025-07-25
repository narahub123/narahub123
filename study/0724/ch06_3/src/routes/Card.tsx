import { useCallback, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button } from "../theme/daisyui";
import { Card as CardType } from "../types";
import { useCardEntitiesStore } from "../store";
import { Avatar, Div } from "../components";

export const Card = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const goback = useCallback(() => navigate(-1), [navigate]);

  const [card, setCard] = useState<CardType | null>(null);

  const { cardid } = params;

  const cardEntities = useCardEntitiesStore((state) => state.cardEntities);

  useEffect(() => {
    if (!cardEntities || !cardid) return;

    cardEntities[
      cardid as `${string}-${string}-${string}-${string}-${string}`
    ] &&
      setCard(
        (notUsed) =>
          cardEntities[
            cardid as `${string}-${string}-${string}-${string}-${string}`
          ]
      );
  }, [cardEntities, cardid]);

  if (!card) {
    return (
      <div>
        <p>location : {JSON.stringify(location, null, 2)}</p>
        <p>params : {JSON.stringify(params, null, 2)}</p>
        <p>cardid : {params["cardid"]}</p>
        <p>
          from : {search.get("from")}, to: {search.get("to")}
        </p>
        <p></p>
        <Button onClick={goback} className="mt-4 btn-primary btn-xs">
          GO BACK
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Div
        className="w-full"
        src={card.image}
        minHeight="10rem"
        height="10rem"
      />
      <Div className="flex flex-row items-center mt-4">
        <Avatar src={card.writer.avatar} />
        <Div className="ml2">
          <p className="text-xs font-bold">{card.writer.name}</p>
          <p className="text-xs text-gray-500">{card.writer.jobTitle}</p>
        </Div>
      </Div>
      <Button onClick={goback} className="mt-4 btn-primary btn-xs">
        GO BACK
      </Button>
    </div>
  );
};
