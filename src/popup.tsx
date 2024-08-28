import "~style.css";

import { ThemeProvider } from "@Components/app/theme-provide";
import { Auth } from "@Pages/auth";
import Profile from "@Pages/profile";
import { useStorage } from "@plasmohq/storage/hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function IndexPopup() {
  const [user] = useStorage("user");
  const [channelName] = useStorage("channelName");

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-96 rounded bg-elevation-surface px-4 py-6">
        {user ? (
          <Profile user={user} watchingChannelName={channelName} />
        ) : (
          <Auth />
        )}
      </div>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default IndexPopup;
