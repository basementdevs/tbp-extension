import "./style.css";
import { env } from "@/config/env";
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

const cssDocumentEl = document.getElementById("tbp-effects");

if (!cssDocumentEl) {
  const current_ts = Date.now();
  const uri = `${env.data.APP_PLATFORM_API_URL}/storage/effects.css?ts=${current_ts}`;
  const link = document.createElement("link");
  link.id = "tbp-effects";
  link.rel = "stylesheet";
  link.href = uri;
  document.head.appendChild(link);
}

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
