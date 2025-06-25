"use client";

import Header from "../../component/layout/Header";
import SearchInput from "../../component/search/SearchInput";
import ProductCart from "../../component/shopping/ProductCart";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";
import CartList from "../../component/shopping/CartList";
import { useRouter } from "next/navigation";


export default function SearchHome() {
  const { user, setUser } = useUser();
  const { result } = useSearch();

  const [cart, setCart] = useState<{ [productId: string]: number }>({});

  //  페이지 최초 렌더링 될 때, setUser로 이름 설정
  useEffect(() => {
    //  학번 + 이름 형태로 작성 (ex. 2025***** 내이름 )
    setUser({
      userId: "202302522", // 예시
      age: 22,
      phoneNumber: "010-1234-5678",
    });
  }, []);


  // Remove item from cart and localStorage
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
    localStorage.removeItem(productId);
  };

  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="w-[80%]">
        <Header title={`${user.userId} 쇼핑`} />
        <SearchInput />
        <ProductCart items={result} setCart={setCart} />
        {Object.keys(cart).length > 0 && (
          <>
            <CartList
              cart={cart}
              products={result} // 검색 결과 배열
              onRemoveAction={handleRemoveFromCart}
            />
            <div className="text-right mt-4">

            </div>
          </>
        )}
      </div>
    </div>
  );
}
