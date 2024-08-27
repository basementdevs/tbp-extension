import "~style.css";

import { ThemeProvider } from "@Components/app/theme-provide";
import { Auth } from "@Pages/auth";
import Profile from "@Pages/profile";

import { useStorage } from "@plasmohq/storage/hook";
import type { AccessTokenResponse } from "~types/types";

function IndexPopup() {
  const [user] = useStorage("user");
  const [channelName] = useStorage("channelName");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-96 rounded bg-elevation-surface px-4 py-6">
        {user ? (
          <Profile user={user} watchingChannelName={channelName} />
        ) : (
          <Auth />
        )}
      </div>
    </ThemeProvider>
  );
}

export default IndexPopup;
