import Logo from "data-base64:@Root/assets/icon.png";
import { cn } from "@Shad/lib/utils";
import type { TwitchUser } from "~types/types";

import { env } from "@Config/env";
import { t } from "~utils/i18nUtils";

type ChatAppearanceProps = {
  user: TwitchUser;
  pronouns?: string;
  color: string;
  occupation?: string;
};

export default function ChatAppearance({
  user,
  pronouns,
  color,
  occupation,
}: ChatAppearanceProps) {
  const baseUrl = env.data.PLASMO_PUBLIC_API_URL;
  const occupationIcon = occupation?.toLowerCase() || "none";
  const pronounText = pronouns
    ? t(`pronouns${pronouns.replace("/", "")}`)
    : null;
  const greeting = t("chatAppearanceGreeting");
  const description = t("chatAppearanceDescription");
  const title = t("chatAppearanceTitle");

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
        <span className={cn(`font-bold text-[${color}]`)}>
          {user.display_name}
        </span>
        {pronounText && (
          <span className="font-medium text-text-low">({pronounText}):</span>
        )}
        <span className="text-text-high">{greeting}</span>
      </div>
      <p className="text-text-low">{description}</p>
    </div>
  );
}
