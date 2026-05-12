"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [accountType, setAccountType] = useState("individual");
  const [activeTxn, setActiveTxn] = useState(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, accountType, setAccountType, activeTxn, setActiveTxn }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}
