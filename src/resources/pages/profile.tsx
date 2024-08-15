import Header from "@Components/app/header";
import ChatAppearance from "@Components/settings/chat-appearance";
import ProfileCard from "@Components/settings/profile-card";
import SettingsForm from "@Components/settings/settings-form";
import UserStorageService from "~services/user/user-storage-service";
import type { User } from "~types/types";

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  const userService = new UserStorageService(user);

  return (
    <div className="flex flex-col max-w-96">
      <Header />
      <ProfileCard user={userService.user} />
      <SettingsForm userService={userService} />
      <ChatAppearance userService={userService} />
    </div>
  );
}
