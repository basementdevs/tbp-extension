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
    t(`pronouns.${settings.pronouns.translation_key}`) ?? "None";
  const title = t("chatAppearanceTitle");
  const greeting = t("chatAppearanceGreeting");
  const description = t("chatAppearanceDescription");
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="font-medium text-text-medium">{title}</h1>
      <div className="flex items-center space-x-1">
        <img
          width={18}
          src={`${baseUrl}/static/icons/${occupationIcon}.png`}
          alt="Occupation icon"
          className="rounded"
        />
        <span className={cn("font-bold text-gray")}>
          {userService.user.name}
        </span>
        <span className="font-medium text-text-low">({pronounText}):</span>
        <span className="text-text-high">{greeting}</span>
      </div>
      <p className="text-text-low">{description}</p>
    </div>
  );
}
