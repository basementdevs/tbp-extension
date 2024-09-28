import type { AccessTokenResponse } from "@/types/types";
import { useStorage } from "@plasmohq/storage/hook";
import { createContext, useContext } from "react";

type AccessTokenContextType = {
  accessToken: AccessTokenResponse;
};

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(
  undefined,
);

export function AccessTokenProvider({
  children,
  accessToken,
}: { children: React.ReactNode; accessToken: AccessTokenResponse }) {
  return (
    <AccessTokenContext.Provider value={{ accessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
}

export function useAccessToken() {
  const context = useContext(AccessTokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}

export const useAccessTokenFromStorage = () => {
  return useStorage<AccessTokenResponse>("accessToken");
};
