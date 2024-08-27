import { useStorage } from "@plasmohq/storage/hook";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Header from "~resources/components/app/header";
import MainContent from "~resources/components/app/main-content";
import Sidebar from "~resources/components/app/sidebar";
import {
  SettingsProvider,
  useSettings,
} from "~resources/components/settings-provider";
import ProfileCard from "~resources/components/settings/profile-card";
import UserStorageService from "~services/user/user-storage-service";
import type { User, UserSettings } from "~types/types";

type ProfileProps = {
  user: User;
  watchingChannelName: string;
};

function ProfileContent({ user, watchingChannelName }: ProfileProps) {
  const userService = new UserStorageService(user);
  const [currentTabValue] = useStorage("currentTabValue", "global-profile");
  const [selectedItem, setSelectedItem] = useState("settings");
  const {
    fetchSettings,
    globalSettings,
    channelSettings,
    isLoading,
    isTokenReady,
  } = useSettings();
  const [currentSettings, setCurrentSettings] = useState<UserSettings | null>(
    null,
  );

  useEffect(() => {
    const loadSettings = async () => {
      if (isTokenReady) {
        try {
          await fetchSettings({
            currentTabValue: currentTabValue || "global-profile",
            channelName: watchingChannelName,
          });
        } catch (err) {
          console.error("Error fetching settings:", err);
        }
      }
    };
    loadSettings();
  }, [isTokenReady, fetchSettings, currentTabValue, watchingChannelName]);

  useEffect(() => {
    if (currentTabValue === "global-profile") {
      setCurrentSettings(globalSettings);
    } else if (currentTabValue === "channel-profile") {
      setCurrentSettings(channelSettings);
    }
  }, [currentTabValue, channelSettings, globalSettings]);

  return (
    <div className="flex flex-col max-w-96 gap min-h-[800px]">
      <div className="flex justify-between w-full">
        <Header />
        <Sidebar
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          userService={userService}
        />
      </div>

      <ProfileCard
        settings={currentSettings}
        user={userService.user}
        isLoading={isLoading}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <MainContent
            selectedItem={selectedItem}
            userService={userService}
            watchingChannelName={watchingChannelName}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Profile(props: ProfileProps) {
  return (
    <SettingsProvider>
      <ProfileContent {...props} />
    </SettingsProvider>
  );
}
