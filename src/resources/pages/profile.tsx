import React, { useState } from "react";
import Header from "~resources/components/app/header";
import MainContent from "~resources/components/app/main-content";
import Sidebar from "~resources/components/app/sidebar";
import UserStorageService from "~services/user/user-storage-service";
import type { User } from "~types/types";

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  const userService = new UserStorageService(user);
  const [selectedItem, setSelectedItem] = useState("Configurações");

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
      <MainContent selectedItem={selectedItem} userService={userService} />
    </div>
  );
}
