import "./style.css";
import {
  AccessTokenProvider,
  useAccessTokenFromStorage,
} from "@/providers/access-token-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { useStorage } from "@plasmohq/storage/hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect } from "react";
import Profile from "./components/profile";
import { Login } from "./pages/login";

const queryClient = new QueryClient();

function Popup() {
  const [user] = useStorage("user");
  const [channelName] = useStorage("channelName");
  const [accessToken] = useAccessTokenFromStorage();

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("Popup is closing");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="w-96 rounded bg-elevation-surface px-4 py-4">
          {user && accessToken ? (
            <AccessTokenProvider accessToken={accessToken}>
              <Profile user={user} channelName={channelName} />
            </AccessTokenProvider>
          ) : (
            <Login />
          )}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default Popup;
