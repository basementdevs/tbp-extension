import type { TwitchUser } from "~types/types";
import { t } from "~utils/i18nUtils";

type ProfileCardProps = {
  user: TwitchUser;
  pronouns?: string;
  occupation?: string;
};

export default function ProfileCard({
  user,
  pronouns,
  occupation,
}: ProfileCardProps) {
  // Transform occupation from 'frontend-engineer' to 'FrontEndEngineer'
  const transformedOccupation = occupation
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const occupationText =
    t(`occupation${transformedOccupation}`) || t("occupationNone");
  const pronounsText = pronouns
    ? t(`pronouns${pronouns.replace("/", "")}`)
    : t("pronounsNone");

  return (
    <div className="flex items-center rounded-xl bg-elevation-05dp p-2">
      <img
        src={user.profile_image_url}
        alt="The user's profile"
        className="size-28 rounded-xl"
      />
      <div className="pl-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-sm text-text-high" id="usernameEl">
            {user.display_name}
          </h1>
          <span className="font-medium text-xs" id="roleEl">
            {occupationText}
          </span>
        </div>
        <div className="text-sm">
          <span className="font-bold text-xxs text-text-high">ID: </span>
          <span className="font-medium text-xs text-text-medium" id="idEl">
            {user.id}
          </span>
          <div className="text-sm">
            <span className="font-bold text-xxs text-text-high">
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
    </div>
  );
}
