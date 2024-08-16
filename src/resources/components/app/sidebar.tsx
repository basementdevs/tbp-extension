import { Menu, X } from "lucide-react";
import { useState } from "react";
import Header from "./header";

const Sidebar: React.FC<{ onItemSelect: (item: string) => void }> = ({
  onItemSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarItems = [
    { name: "Configurações", icon: "" },
    { name: "Estatísticas", icon: "" },
    { name: "Sobre", icon: "" },
    { name: "Temas", icon: "" },
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
              <li key={item.name}>
                <button
                  type="button"
                  onClick={() => {
                    onItemSelect(item.name);
                    toggleSidebar();
                  }}
                  className="w-full text-left p-2 hover:bg-elevation-02dp rounded-md transition-colors"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
