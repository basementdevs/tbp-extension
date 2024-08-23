import AboutCard from "@Components/about/about";
import ChatAppearance from "@Components/settings/chat-appearance";
import ProfileCard from "@Components/settings/profile-card";
import SettingsForm from "@Components/settings/settings-form";
import Tabs from "~resources/shad/components/ui/tabs";
import type UserStorageService from "~services/user/user-storage-service";
import Stats from "../stats/stats";
import ColorCustomizer from "../theme/color-customize";
import Theme from "../theme/theme";

type MainContentProps = {
  selectedItem: string;
  userService: UserStorageService;
  watchingChannelName: string | null;
};

const MainContent = ({
  selectedItem,
  userService,
  watchingChannelName,
}: MainContentProps) => {
  console.log(watchingChannelName);
  const tabSettingsList = [
    {
      name: "Perfil Global",
      value: "global-profile",
      disabled: false,
      content: (
        <>
          <SettingsForm userService={userService} />
          <ChatAppearance userService={userService} />
          <ColorCustomizer userService={userService} />
        </>
      ),
    },

    {
      name: "Perfil da Live",
      value: "live-profile",
      disabled: !watchingChannelName,
      content: (
        <>
          <SettingsForm userService={userService} liveProfile />
          <ChatAppearance userService={userService} />
          <ColorCustomizer userService={userService} />
        </>
      ),
    },
  ];

  switch (selectedItem) {
    case "settings":
      return (
        <div className="mt-7">
          <Tabs tabData={tabSettingsList} />
        </div>
      );
    case "stats":
      return <Stats />;
    case "about":
      return <AboutCard />;
    case "themes":
      return <Theme userService={userService} />;
  }
};

export default MainContent;
