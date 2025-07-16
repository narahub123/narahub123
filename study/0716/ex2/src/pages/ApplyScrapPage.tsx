import { ScrapForm } from "../components";
import { cars } from "../data";

const ApplyScrapPage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <h1 className="mb-4 text-xl font-bold">폐차 신청</h1>
      {cars.map((car) => (
        <ScrapForm name={car.name} carNum={car.carNum} />
      ))}
    </main>
  );
};

export default ApplyScrapPage;
