import "~style.css";

import { ThemeProvider } from "@Components/app/theme-provide";
import { Auth } from "@Pages/auth";
import Profile from "@Pages/profile";

import { useStorage } from "@plasmohq/storage/dist/hook";

function IndexPopup() {
  const [user] = useStorage("user");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-96 rounded bg-elevation-surface px-4 py-6">
        {user ? <Profile user={user} /> : <Auth />}
      </div>
    </ThemeProvider>
  );
}

export default IndexPopup;
