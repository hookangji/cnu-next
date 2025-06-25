"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ProductItem } from "@/types/Product"; // 타입은 뒤에 만들자

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  result: ProductItem[];
  setResult: (r: ProductItem[]) => void;
  cart: { [productId: string]: number };
  setCart: (c: { [productId: string]: number }) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ProductItem[]>([]);
  const [cart, setCart] = useState<{ [productId: string]: number }>({});

  return (
      <SearchContext.Provider value={{ query, setQuery, result, setResult, cart, setCart }}>
        {children}
      </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};