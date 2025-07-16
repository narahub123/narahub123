type Product = {
  name: string;
  price: number;
};

const ProductItem = ({ name, price }: Product) => {
  return (
    <div className="p-4 bg-white border rounded shadow">
      <h2 className="font-semibold">{name}</h2>
      <p className="text-gray-600">{price.toLocaleString()}원</p>
    </div>
  );
};

export default ProductItem;
