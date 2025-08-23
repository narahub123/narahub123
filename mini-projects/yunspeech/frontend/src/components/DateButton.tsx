import { FC } from "react";

interface DateButtonProps {
  date: Date;
  onClick: (date: Date) => void;
}

const DateButton: FC<DateButtonProps> = ({ date, onClick }) => {
  return (
    <button className="btn-circle bg-blue-50" onClick={() => onClick(date)}>
      <div>{date.getDate()}</div>
    </button>
  );
};

export default DateButton;
