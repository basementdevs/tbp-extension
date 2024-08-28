import AboutCard from "@Components/about/about";
import ChatAppearance from "@Components/settings/chat-appearance";
import Tabs from "~resources/shad/components/ui/tabs";
import type UserStorageService from "~services/user/user-storage-service";
import Stats from "../stats/stats";
import ColorCustomizer from "../theme/color-customize";
import Theme from "../theme/theme";
import SettingsFormV2 from "../settings/settings-form-v2";

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
  const renderSettingsContent = (isLiveProfile: boolean) => (
    <>
      <SettingsFormV2 liveProfile={isLiveProfile} channelName={channelName} />
      <ChatAppearance userService={userService} />
      <ColorCustomizer userService={userService} />
    </>
  );
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
      {selectedItem === "themes" && <Theme userService={userService} />}
    </div>
  );
};

export default MainContent;
