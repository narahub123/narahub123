export const CardContainer = () => {
  const list = [
    { img: "🪴", text: "식물 가꾸기", description: "매일 물을 주세요" },
    { img: "📅", text: "캘린더", description: "일정을 기록해요" },
    { img: "🎨", text: "커뮤니티", description: "자유롭게 이야기 나눠요" },
  ];
  return (
    <div className="flex w-full gap-4 px-2 mt-4 justify-evenly">
      {list.map((item) => (
        <button className="flex flex-col w-full gap-2 px-10 py-4 border-2 border-black rounded-md">
          <div className={`material-icon text-4xl`}>{item.img}</div>
          <div>
            <p className="font-bold">{item.text}</p>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
