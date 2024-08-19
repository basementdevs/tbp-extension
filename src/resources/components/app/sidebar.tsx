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
import type UserStorageService from "~services/user/user-storage-service";
import Header from "./header";
import ProfileRibbon from "./profile-ribbon";

type SidebarProps = {
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
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
  setSelectedItem,
  selectedItem,
  userService,
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarItems = [
    { name: "Configurações", key: "settings", icon: Settings },
    { name: "Estatísticas", key: "stats", icon: PieChart },
    { name: "Sobre", key: "about", icon: Info },
    { name: "Temas", key: "themes", icon: Palette },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        className="p-2 rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <aside
        className={`fixed top-0 right-0 w-80 h-full bg-elevation-01dp shadow-lg transform transition-transform duration-300 ease-in-out z-50 border border-helper-outline rounded-md px-4 py-6 ${
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
                isSelected={selectedItem === item.name}
                onClick={() => {
                  setSelectedItem(item.key);
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
