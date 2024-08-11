import { t } from "~utils/i18nUtils";
import type { User } from "~types/types";

type ProfileCardProps = {
  user: User;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  // frontend-engineer -> FrontEndEngineer
  const occupation = user.settings.occupation;

  return (
    <div className="flex items-center rounded-xl bg-muted">
      <img
        src={user.accounts[0].avatar}
        alt="The user's profile"
        className="size-28 rounded-xl p-1"
      />
      <div className="p-2">
        <div className="flex flex-col">
          <h1
            className="font-extrabold text-lg m-0 line-clamp-1"
            id="usernameEl"
          >
            {user.name}
          </h1>
          <p
            className="text-gray-600 dark:text-gray-300 text-sm m-0 p-0"
            id="roleEl"
          >
            {t(`occupation${occupation.translation_key}`) ??
              t("occupationNone")}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm">
            <span className="font-bold">ID:</span>
            <span className="text-gray-600 dark:text-gray-300 ml-2" id="idEl">
              {user.accounts[0].id}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">{t("pronounsTitle")}:</span>
            <span
              className="text-gray-600 dark:text-gray-300 ml-2"
              id="pronounsEl"
            >
              {user.settings.pronouns
                ? t(`pronouns${user.settings.pronouns.replace("/", "")}`)
                : t("pronounsNone")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
