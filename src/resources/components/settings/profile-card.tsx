import Skeleton from "react-loading-skeleton";
import type { User, UserSettings } from "~types/types";
import { t } from "~utils/i18nUtils";
import "react-loading-skeleton/dist/skeleton.css";

type ProfileCardProps = {
  settings: UserSettings;
  user: User;
  isLoading: boolean;
};

export default function ProfileCard({
  settings,
  user,
  isLoading,
}: ProfileCardProps) {
  const occupationText = t(`occupation${settings?.occupation_id}`);
  const pronounsText = t(`pronouns${settings?.pronouns.translation_key}`);

  if (isLoading) {
    return (
      <div className="flex items-center rounded-xl bg-elevation-04dp p-2">
        <Skeleton width={112} height={112} className="rounded-xl" />
        <div className="pl-4 w-full">
          <div className="flex flex-col">
            <Skeleton width={120} height={16} className="mb-1" />
            <Skeleton width={100} height={14} />
          </div>
          <div className="flex items-center mt-2">
            <Skeleton width={80} height={12} />
          </div>
          <div className="mt-1">
            <Skeleton width={100} height={12} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center rounded-xl bg-elevation-04dp p-2">
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
