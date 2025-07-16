type LoginInfo = { name: string; carNum: string };

const ScrapForm = ({ name, carNum }: LoginInfo) => {
  return (
    <div className="p-4 bg-white border rounded shadow">
      <label htmlFor="name">이름</label>
      <input type="text" id="name" value={name} />
      <label htmlFor="carNum">차량번호</label>
      <input type="text" id="carNum" value={carNum} />
    </div>
  );
};

export default ScrapForm;
