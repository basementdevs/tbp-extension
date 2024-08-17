import AboutCard from "@Components/about/about";
import { ModeToggle } from "@Components/app/mode-toggle";
import ChatAppearance from "@Components/settings/chat-appearance";
import ProfileCard from "@Components/settings/profile-card";
import SettingsForm from "@Components/settings/settings-form";
import type UserStorageService from "~services/user/user-storage-service";

type MainContentProps = {
  selectedItem: string;
  userService: UserStorageService;
};

const MainContent = ({ selectedItem, userService }: MainContentProps) => {
  switch (selectedItem) {
    case "Configurações":
      return (
        <>
          <SettingsForm userService={userService} />
          <ChatAppearance userService={userService} />
        </>
      );
    case "Estatísticas":
      return <div>Estatísticas Content</div>;
    case "Sobre":
      return <AboutCard />;
    case "Temas":
      return (
        <>
          <h2>Temas</h2>
          <ModeToggle />
        </>
      );
  }
};

export default MainContent;
