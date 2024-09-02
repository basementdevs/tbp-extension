import "./style.css";
import {
  AccessTokenProvider,
  useAccessTokenFromStorage,
} from "@/providers/access-token-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { useStorage } from "@plasmohq/storage/hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import Profile from "./components/profile";
import { Login } from "./pages/login";

const queryClient = new QueryClient();

function IndexPopup() {
  const [user] = useStorage("user");
  const [channelName] = useStorage("channelName");
  const [accessToken] = useAccessTokenFromStorage();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="w-96 rounded bg-elevation-surface px-4 py-6">
          {user && accessToken ? (
            <AccessTokenProvider accessToken={accessToken}>
              <Profile user={user} channelName={channelName} />
            </AccessTokenProvider>
          ) : (
            <Login />
          )}
        </div>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default IndexPopup;
