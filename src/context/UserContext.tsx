"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 유저 타입 정의
interface User {
  userId: string;
  age: number;
  phoneNumber: string;
}

// context에서 사용할 타입
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

// context 생성
const UserContext = createContext<UserContextType | undefined>(undefined);

// provider 정의
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    userId: "cnu2025",
    age: 21,
    phoneNumber: "010-1234-5678",
  });

  return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
  );
};

// 커스텀 훅
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};