import { QuotationCard } from "../components";
import { quotationMock } from "../data";

const QuotationPage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full space-y-4">
      {quotationMock.map((item) => (
        <QuotationCard
          key={item.carName}
          carName={item.carName}
          year={item.year}
          price={item.price}
        />
      ))}
    </main>
  );
};

export default QuotationPage;
