import { cn } from "@Shad/lib/utils";

import { env } from "@Config/env";
import type UserStorageService from "~services/user/user-storage-service";

import { t } from "~utils/i18nUtils";

type ChatAppearanceProps = {
  userService: UserStorageService;
};

export default function ChatAppearance({ userService }: ChatAppearanceProps) {
  const baseUrl = env.data.CONSUMER_API_URL;
  const occupationIcon = userService.user.settings.occupation.slug;
  const settings = userService.getSettings();

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-gray-600 dark:text-gray-300">
        {t("chatAppearanceTitle")}
      </h1>
      <div className="flex items-center space-x-0.5">
        <img
          width={18}
          src={`${baseUrl}/static/icons/${occupationIcon}.png`}
          alt="logo"
        />
        <span className={cn("font-bold text-gray")}>
          {userService.user.name}
        </span>
        <span className="font-light text-gray-500 dark:text-gray-400">
          ({t(`pronouns${settings.pronouns.replace("/", "")}`)}):
        </span>
        <span className="font-light dark:text-gray-300">
          {t("chatAppearanceGreeting")}
        </span>
      </div>
      <p className="text-gray-400 dark:text-gray-500">
        {t("chatAppearanceDescription")}
      </p>
    </div>
  );
}
