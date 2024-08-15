import type { User } from "~types/types";
import { t } from "~utils/i18nUtils";

type ProfileCardProps = {
  user: User;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  // frontend-engineer -> FrontEndEngineer
  const occupation = user.settings.occupation;
  const occupationText = t(`occupation${occupation.translation_key}`);
  const pronounsText = t(`pronouns${user.settings.pronouns.translation_key}`);
  return (
    <div className="flex items-center rounded-xl bg-elevation-05dp p-2">
      <img
        src={user.accounts[0].avatar}
        alt="The user's profile"
        className="size-28 rounded-xl"
      />
      <div className="pl-4">
        <div className="flex flex-col">
          <h1 className="font-bold text-sm text-text-high" id="usernameEl">
            {user.name}
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
