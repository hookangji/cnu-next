"use client";
// CheckoutPage
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductItem } from "@/types/Product";

interface CheckoutItem extends ProductItem {
  quantity: number;
}
//  과제 3
export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const router = useRouter();

    useEffect(() => {
        const storedItems = localStorage.getItem("checkoutItems");
        if (storedItems) {
            setItems(JSON.parse(storedItems));
            localStorage.removeItem("checkoutItems");
        }
    }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">✅ 결제가 완료되었습니다!</h1>
      {/* 3.1. 결제하기 구현 */}
      {items.length === 0 ? (
        <p>결제된 아이템이 없습니다</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border-b pb-2">
              <p>상품명: {item.title}</p>
              <p>가격: {item.lprice}</p>
              <p>수량: {item.quantity}</p>
            </div>
          ))}
          <p className="text-right font-semibold">
            총 금액:{" "}
            {items.reduce(
              (sum, item) => sum + Number(item.lprice) * item.quantity,
              0
            ).toLocaleString()}원
          </p>
        </div>
      )}
      {/* 3.2. 홈으로 가기 버튼 구현 */}
      <div className="text-right mt-6">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
