import { env } from "@/config/env";
import { useUserSettings } from "@/hooks/use-user-settings";
import type UserStorageService from "@/services/user/user-storage-service";
import { cn } from "@/utils/cn";
import { t } from "@/utils/i18n";

type ChatAppearanceProps = {
  userService: UserStorageService;
  liveProfile: boolean;
  channelName: string | undefined;
};

export default function ChatAppearance({
  userService,
  liveProfile,
  channelName,
}: ChatAppearanceProps) {
  const { activeSettings } = useUserSettings(liveProfile, channelName);

  const baseUrl = env.data.CONSUMER_API_URL;
  const occupationIcon = activeSettings?.occupation?.slug ?? "none";
  const pronounText =
    t(`pronouns${activeSettings?.pronouns.translation_key}`) ?? "None";
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
        <span
          className={cn(
            "font-bold text-gray text-xs",
            activeSettings?.effect.class_name,
          )}
        >
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
