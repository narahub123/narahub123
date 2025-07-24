import { FC, useCallback, useMemo } from "react";
import { List } from "../../types";
import { Div, Icon } from "../../components";
import { useCards } from "../../store";
import ListCard from "../ListCard";
import { useNavigate } from "react-router-dom";

export type BoardListProps = {
  list: List;
  onRemoveList?: () => void;
};

const BoardList: FC<BoardListProps> = ({ list, onRemoveList, ...props }) => {
  const { cards, onPrependCard, onAppendCard, onRemoveCard } = useCards(
    list.uuid
  );

  const navigate = useNavigate();

  const cardClicked = useCallback(
    (cardid: string) => () => {
      navigate(`/board/card/${cardid}`);
    },
    [navigate]
  );

  const children = useMemo(
    () =>
      cards.map((card, index) => (
        <ListCard
          key={card.uuid}
          card={card}
          onRemove={() => onRemoveCard(card.uuid)}
          onClick={cardClicked(card.uuid)}
        />
      )),
    [cards, onRemoveCard]
  );

  return (
    <Div
      {...props}
      className="p-2 m-2 border border-gray-300 rounded-lg"
      minWidth="13rem"
    >
      <div className="mb-2 ">
        <p className="w-32 text-sm font-bold underline line-clamp-1">
          {list.title}
        </p>

        <div className="flex justify-between ml-2">
          <Icon
            name="remove"
            className="btn-error btn-xs"
            onClick={onRemoveList}
          />
          <div className="flex">
            <Icon
              name="post_add"
              className="btn-success btn-xs"
              onClick={onPrependCard}
            />
            <Icon
              name="playlist_add"
              className="ml-2 btn-success btn-xs"
              onClick={onAppendCard}
            />
          </div>
        </div>
        <div className="flex flex-col p-2">{children}</div>
      </div>
    </Div>
  );
};

export default BoardList;
