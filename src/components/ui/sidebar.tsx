import type UserStorageService from "@/services/user/user-storage-service";
import { t } from "@/utils/i18n";
import {
  Info,
  type LucideIcon,
  Menu,
  Palette,
  PieChart,
  Settings,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Header from "./header";
import ProfileRibbon from "./profile-ribbon";

type SidebarProps = {
  setSelectedSidebarItem: (item: string) => void;
  selectedItem: string;
  userService: UserStorageService;
};

type SidebarItemProps = {
  name: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
};

const SidebarItem = ({
  name,
  icon: Icon,
  isSelected,
  onClick,
}: SidebarItemProps) => (
  <li>
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "w-full text-left p-2 rounded-md flex items-center gap-2 font-medium",
        isSelected ? "bg-primary-500" : "hover:bg-elevation-02dp",
      )}
    >
      <Icon size={20} className={twMerge(isSelected && "text-white")} />
      <span className={twMerge(isSelected && "text-white font-bold")}>
        {name}
      </span>
    </button>
  </li>
);

const Sidebar = ({
  setSelectedSidebarItem,
  selectedItem,
  userService,
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    { name: t("sidebarItemSettings"), key: "settings", icon: Settings },
    { name: t("sidebarItemStatistics"), key: "stats", icon: PieChart },
    { name: t("sidebarItemThemes"), key: "themes", icon: Palette },
    { name: t("sidebarItemAbout"), key: "about", icon: Info },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="p-2 rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-50 z-40" : "opacity-0 -z-10"
        }`}
        onClick={toggleSidebar}
        onKeyUp={toggleSidebar}
      />
      <aside
        className={`fixed top-0 right-0 w-80 h-full bg-elevation-01dp shadow-lg transform transition-transform duration-300 ease-in-out z-50 border border-helper-outline rounded-md px-4 py-4 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center pb-8">
          <Header isSidebarVisible={true} />
          <button
            type="button"
            className="p-2 rounded-md focus:outline-none"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mb-10">
          <ul className="space-y-5">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.key}
                name={item.name}
                icon={item.icon}
                isSelected={selectedItem === item.key}
                onClick={() => {
                  setSelectedSidebarItem(item.key);
                  toggleSidebar();
                }}
              />
            ))}
          </ul>
        </nav>
        <ProfileRibbon user={userService.user} />
      </aside>
    </div>
  );
};

export default Sidebar;
