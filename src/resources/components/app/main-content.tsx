import AboutCard from "@Components/about/about";
import ChatAppearance from "@Components/settings/chat-appearance";
import SettingsForm from "@Components/settings/settings-form";
import { useState } from "react";
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
  const renderSettingsContent = (isLiveProfile: boolean) => (
    <>
      <SettingsForm
        liveProfile={isLiveProfile}
        watchingChannelName={watchingChannelName}
      />
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
      value: "live-profile",
      disabled: !watchingChannelName,
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
