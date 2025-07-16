import { SummaryTable } from "../components";
import { completedData } from "../data";

const ScrapCompletePage = () => {
  return (
    <div className="space-y-4">
      {completedData.map((datum) => (
        <SummaryTable
          key={datum.user}
          user={datum.user}
          car={datum.car}
          date={datum.date}
        />
      ))}
    </div>
  );
};

export default ScrapCompletePage;
