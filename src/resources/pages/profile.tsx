import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Header from "~resources/components/app/header";
import MainContent from "~resources/components/app/main-content";
import Sidebar from "~resources/components/app/sidebar";
import ProfileCard from "~resources/components/settings/profile-card";
import UserStorageService from "~services/user/user-storage-service";
import type { User } from "~types/types";

type ProfileProps = {
  user: User;
  channelName?: string;
};

export default function Profile({ user, channelName }: ProfileProps) {
  const userService = new UserStorageService(user);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("settings");

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
        >
          <MainContent
            selectedItem={selectedSidebarItem}
            userService={userService}
            channelName={channelName}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
