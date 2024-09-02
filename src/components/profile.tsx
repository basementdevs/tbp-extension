import UserStorageService from "@/services/user/user-storage-service";
import type { User } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import Header from "@/components/ui/header";
import ProfileCard from "@/components/ui/profile-card";
import Sidebar from "@/components/ui/sidebar";
import AboutCard from "@/pages/about";
import Settings from "@/pages/settings";
import Stats from "@/pages/stats";
import Theme from "@/pages/theme";

type ProfileProps = {
  user: User;
  channelName?: string;
};

export default function Profile({ user, channelName }: ProfileProps) {
  const userService = new UserStorageService(user);
  const [currentPage, setCurrentPage] = useState("settings");

  return (
    <div className="flex flex-col max-w-96 gap min-h-[800px]">
      <div className="flex justify-between w-full">
        <Header />
        <Sidebar
          userService={userService}
          setSelectedSidebarItem={setCurrentPage}
          selectedItem={currentPage}
        />
      </div>

      <ProfileCard user={userService.user} channelName={channelName} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={currentPage === "settings" ? "mt-7" : ""}
        >
          {currentPage === "settings" && (
            <Settings userService={userService} channelName={channelName} />
          )}
          {currentPage === "stats" && <Stats />}
          {currentPage === "about" && <AboutCard />}
          {currentPage === "themes" && (
            <Theme
              userService={userService}
              liveProfile={true}
              channelName={channelName}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
