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
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  selectedItem: string;
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
      <span className={twMerge(isSelected && "text-white")}>{name}</span>
    </button>
  </li>
);

const Sidebar = ({ setSelectedItem, selectedItem }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarItems = [
    { name: "Configurações", icon: Settings },
    { name: "Estatísticas", icon: PieChart },
    { name: "Sobre", icon: Info },
    { name: "Temas", icon: Palette },
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
        className={`fixed top-0 right-0 w-80 h-full bg-elevation-01dp shadow-lg transform transition-transform duration-300 ease-in-out z-50 border border-helper-outline rounded-md ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <Header isSidebarVisible={true} />
          <button
            type="button"
            className="p-2 rounded-md focus:outline-none"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.name}
                name={item.name}
                icon={item.icon}
                isSelected={selectedItem === item.name}
                onClick={() => {
                  setSelectedItem(item.name);
                  toggleSidebar();
                }}
              />
            ))}
          </ul>
        </nav>
        <ProfileRibbon />
      </aside>
    </div>
  );
};

export default Sidebar;
