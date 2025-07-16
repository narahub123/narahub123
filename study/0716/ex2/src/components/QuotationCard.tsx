type Quotation = {
  carName: string;
  year: number;
  price: number;
};

const QuotationCard = ({ carName, year, price }: Quotation) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/4 gap-4 p-4 bg-gray-200 border-2 rounded-md shadow-lg h-1/4">
      <h2 className="font-bold">{carName}</h2>
      <p className="">{year}</p>
      <p className="">{price}</p>
    </div>
  );
};

export default QuotationCard;
