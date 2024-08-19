import AboutCard from "@Components/about/about";
import ChatAppearance from "@Components/settings/chat-appearance";
import ProfileCard from "@Components/settings/profile-card";
import SettingsForm from "@Components/settings/settings-form";
import type UserStorageService from "~services/user/user-storage-service";
import Stats from "../stats/stats";
import Theme from "../theme/theme";

type MainContentProps = {
  selectedItem: string;
  userService: UserStorageService;
};

const MainContent = ({ selectedItem, userService }: MainContentProps) => {
  switch (selectedItem) {
    case "settings":
      return (
        <>
          <SettingsForm userService={userService} />
          <ChatAppearance userService={userService} />
        </>
      );
    case "stats":
      return <Stats />;
    case "about":
      return <AboutCard />;
    case "themes":
      return <Theme />;
  }
};

export default MainContent;
