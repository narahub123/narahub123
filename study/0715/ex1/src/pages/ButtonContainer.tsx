import { Button } from "../components";

export const ButtonContainer = () => {
  const btns = [
    {
      text: "홈",
      className: "text-white btn btn-primary",
    },
    {
      text: "소개",
      className: "text-white btn btn-info",
    },
    {
      text: "연락",
      className: "text-white btn btn-secondary",
    },
  ];

  return (
    <div className="flex justify-center w-full">
      <div className="flex gap-4 mt-4">
        {btns.map((btn) => (
          <Button className={btn.className}>{btn.text}</Button>
        ))}
      </div>
    </div>
  );
};
