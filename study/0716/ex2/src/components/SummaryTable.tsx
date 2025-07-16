type Complete = {
  user: string;
  car: string;
  date: string;
};

const SummaryTable = ({ user, car, date }: Complete) => {
  return (
    <div className="p-4 border-2 rounded-md shadow-md">
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <th className="border-2">사용자 이름</th>
            <td className="text-center border-2">{user}</td>
          </tr>
          <tr>
            <th className="border-2">차량 정보</th>
            <td className="text-center border-2">{car}</td>
          </tr>
          <tr>
            <th className="border-2">날짜</th>
            <td className="text-center border-2">{date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
