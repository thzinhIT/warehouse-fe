"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

type AppContextType = {
  token: string;
  setToken: (token: string) => void;
  username: string;
  setUsername: (username: string) => void;
  accessToken: string;
  setAccessToken: (username: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const value = useMemo(
    () => ({
      token,
      setToken,
      username,
      setUsername,
      accessToken,
      setAccessToken,
    }),
    [token, setToken, username, setUsername, accessToken, setAccessToken]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext phải dùng trong AppProvider");
  }
  return context;
};
