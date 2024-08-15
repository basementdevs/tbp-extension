import Header from "@Components/app/header";
import ProfileCard from "@Components/settings/profile-card";
import SettingsForm from "@Components/settings/settings-form";

import AboutCard from "@Components/about/about";
import ChatAppearance from "@Components/settings/chat-appearance";
import Tabs from "@Shad/components/ui/tabs";
import UserStorageService from "~services/user/user-storage-service";
import type { User } from "~types/types";
import { t } from "~utils/i18nUtils";

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  const userService = new UserStorageService(user);

  const tabData = [
    {
      name: t("profileSettings"),
      value: "settings",
      content: (
        <div className="flex flex-col w-full gap-3">
          <SettingsForm userService={userService} />
          <ChatAppearance userService={userService} />
        </div>
      ),
    },
    {
      name: t("aboutTitle"),
      value: "about",
      content: <AboutCard />,
    },
  ];

  return (
    <div className="flex flex-col max-w-96">
      <Header />
      <ProfileCard user={userService.user} />
      <Tabs tabData={tabData} />
    </div>
  );
}
