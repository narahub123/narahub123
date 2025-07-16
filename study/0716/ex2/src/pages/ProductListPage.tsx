import { ProductItem } from "../components";
import { products } from "../data";

const ProductListPage = () => {
  return (
    <main className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((item) => (
        <ProductItem key={item.id} name={item.name} price={item.price} />
      ))}
    </main>
  );
};

export default ProductListPage;
