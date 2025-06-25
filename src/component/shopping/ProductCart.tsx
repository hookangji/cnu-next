// ProductCartPage.tsx
// no import needed from "react" here unless other hooks are added later
import ProductList from "./ProductList";
import { ProductItem } from "@/types/Product";

export default function ProductCart({
  items,
  setCart,
}: {
  items: ProductItem[];
  setCart: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>;
}) {
  //  카트에 담기
  const handleAddToCart = (item: ProductItem, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      [item.productId]: quantity,
    }));

    localStorage.setItem(item.productId, quantity + "");
  };

  return (
    <div className="p-10">
      {/* 상품 리스트 */}
      <ProductList items={items} onAddToCart={handleAddToCart} />
    </div>
  );
}
