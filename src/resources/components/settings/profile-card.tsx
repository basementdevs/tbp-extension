import { useStorage } from "@plasmohq/storage/hook";
import type { User } from "~types/types";
import { t } from "~utils/i18nUtils";
import { useUserSettings } from "./hook";

type ProfileCardProps = {
  user: User;
  channelName: string | undefined;
};

export default function ProfileCard({ user, channelName }: ProfileCardProps) {
  const [currentTabValue] = useStorage("currentTabValue", "global-profile");

  const { activeSettings } = useUserSettings(
    currentTabValue === "channel-profile",
    channelName,
  );

  const occupationText = t(
    `occupation${activeSettings?.occupation.translation_key}`,
  );
  const pronounsText = t(`pronouns${activeSettings?.pronouns.translation_key}`);

  return (
    <div className="flex items-center rounded-xl bg-elevation-04dp p-2">
      <img
        src={user?.accounts[0]?.avatar}
        alt="The user's profile"
        className="size-28 rounded-xl"
      />
      <div className="pl-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-sm text-text-high" id="usernameEl">
            {user.name}
          </h1>
          <span className="font-medium text-text-medium" id="roleEl">
            {occupationText}
          </span>
        </div>
        <div className="flex items-center mt-2">
          <span className="font-bold text-xxs text-text-high">ID:&nbsp;</span>
          <span className="font-medium text-xs text-text-medium" id="idEl">
            {user.id}
          </span>
        </div>
        <div>
          <span className="font-bold text-xs text-text-high">
            {t("pronounsTitle")}:&nbsp;
          </span>
          <span
            className="font-medium text-xs text-text-medium"
            id="pronounsEl"
          >
            {pronounsText}
          </span>
        </div>
      </div>
    </div>
  );
}
