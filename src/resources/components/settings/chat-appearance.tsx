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
  const pronounText =
    t(`pronouns${settings.pronouns.translation_key}`) ?? "None";
  const title = t("chatAppearanceTitle");
  const greeting = t("chatAppearanceGreeting");
  const description = t("chatAppearanceDescription");
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="font-medium text-text-medium text-xs">{title}</h1>
      <div className="flex items-center space-x-1">
        <img
          width={18}
          src={`${baseUrl}/static/icons/${occupationIcon}.png`}
          alt="Occupation icon"
          className="rounded"
        />
        <span className="font-bold text-gray text-xs">
          {userService.user.name}
        </span>
        <span className="font-medium text-text-low text-xs">
          ({pronounText}):
        </span>
        <span className="text-text-high text-xs">{greeting}</span>
      </div>
      <p className="text-text-low text-xs">{description}</p>
    </div>
  );
}
