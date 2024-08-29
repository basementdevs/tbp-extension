import AboutCard from "@Components/about/about";
import ChatAppearance from "@Components/settings/chat-appearance";
import Tabs from "~resources/shad/components/ui/tabs";
import type UserStorageService from "~services/user/user-storage-service";
import SettingsForm from "../settings/settings-form";
import Stats from "../stats/stats";
import ColorCustomizer from "../theme/color-customize";
import Theme from "../theme/theme";

type MainContentProps = {
  selectedItem: string;
  userService: UserStorageService;
  channelName?: string;
};

const MainContent = ({
  selectedItem,
  userService,
  channelName,
}: MainContentProps) => {
  const renderSettingsContent = (isLiveProfile: boolean) => {
    return (
      <>
        <SettingsForm liveProfile={isLiveProfile} channelName={channelName} />
        <ChatAppearance
          userService={userService}
          liveProfile={isLiveProfile}
          channelName={channelName}
        />
        <ColorCustomizer
          liveProfile={isLiveProfile}
          channelName={channelName}
        />
      </>
    );
  };
  const tabSettingsList = [
    {
      name: "Perfil Global",
      value: "global-profile",
      disabled: false,
      content: renderSettingsContent(false),
    },
    {
      name: "Perfil da Live",
      value: "channel-profile",
      disabled: !channelName,
      content: renderSettingsContent(true),
    },
  ];

  return (
    <div className={selectedItem === "settings" ? "mt-7" : ""}>
      {selectedItem === "settings" && <Tabs tabData={tabSettingsList} />}
      {selectedItem === "stats" && <Stats />}
      {selectedItem === "about" && <AboutCard />}
      {selectedItem === "themes" && (
        <Theme
          userService={userService}
          liveProfile={true}
          channelName={channelName}
        />
      )}
    </div>
  );
};

export default MainContent;
