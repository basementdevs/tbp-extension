import AboutCard from "@/components/layouts/about";
import Stats from "@/components/layouts/stats";
import Theme from "@/components/layouts/theme";
import ChatAppearance from "@/components/ui/chat-appearance";
import Header from "@/components/ui/header";
import ProfileCard from "@/components/ui/profile-card";
import Sidebar from "@/components/ui/sidebar";
import Tabs from "@/components/ui/tabs";
import UserStorageService from "@/services/user/user-storage-service";
import type { User } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import SettingsForm from "./settings-form";
import ColorCustomizer from "./theme/color-customize";

type ProfileProps = {
  user: User;
  channelName?: string;
};

export default function Profile({ user, channelName }: ProfileProps) {
  const userService = new UserStorageService(user);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("settings");

  const renderChannelSettings = (isLiveProfile: boolean) => {
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

  const tabItems = [
    {
      name: "Perfil Global",
      value: "global-profile",
      disabled: false,
      content: renderChannelSettings(false),
    },
    {
      name: "Perfil da Live",
      value: "channel-profile",
      disabled: !channelName,
      content: renderChannelSettings(true),
    },
  ];

  const renderContent = () => {
    switch (selectedSidebarItem) {
      case "settings":
        return <Tabs tabItems={tabItems} />;
      case "stats":
        return <Stats />;
      case "about":
        return <AboutCard />;
      case "themes":
        return (
          <Theme
            userService={userService}
            liveProfile={true}
            channelName={channelName}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col max-w-96 gap min-h-[800px]">
      <div className="flex justify-between w-full">
        <Header />
        <Sidebar
          setSelectedItem={setSelectedSidebarItem}
          selectedItem={selectedSidebarItem}
          userService={userService}
        />
      </div>

      <ProfileCard user={userService.user} channelName={channelName} />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSidebarItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={selectedSidebarItem === "settings" ? "mt-7" : ""}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
