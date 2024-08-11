import { Label } from "@Shad/components/ui/label";
import { type MutableRefObject, useRef } from "react";

import type {
  AccessTokenResponse, Occupation,
  TwitchUser,
  UserSettings,
} from "~types/types";
import { t } from "~utils/i18nUtils";
import UserStorageService from "~services/user/user-storage-service";
import { useStorage } from "@plasmohq/storage/hook";
import { env } from "~config/env";
import { getOccupations } from "~services/occupation-service";

interface SettingsFormProps {
  userService: UserStorageService;
}

export const pronounsItems = [
  { apiValue: "n/d", translationKey: "None" },
  { apiValue: "He/Him", translationKey: "HeHim" },
  { apiValue: "She/Her", translationKey: "SheHer" },
  { apiValue: "They/Them", translationKey: "TheyThem" },
  { apiValue: "She/They", translationKey: "SheThey" },
  { apiValue: "He/They", translationKey: "HeThey" },
  { apiValue: "He/She", translationKey: "HeShe" },
  { apiValue: "Xe/Xem", translationKey: "XeXem" },
  { apiValue: "It/Its", translationKey: "ItIts" },
  { apiValue: "Fae/Faer", translationKey: "FaeFaer" },
  { apiValue: "Ve/Ver", translationKey: "VeVer" },
  { apiValue: "Ae/Aer", translationKey: "AeAer" },
  { apiValue: "Zie/Hir", translationKey: "ZieHir" },
  { apiValue: "Per/Per", translationKey: "PerPer" },
  { apiValue: "E/Em", translationKey: "EEm" },
];


export default function SettingsForm({ userService }: SettingsFormProps) {
  // TODO: implement caching for refreshing occupations list after 1h
  const [occupations] = useStorage<Occupation[]>("occupations", []);

  let settings = userService.getSettings();
  const [twitchUser] = useStorage<TwitchUser>("twitchUser");
  const [accessToken] = useStorage<AccessTokenResponse>("accessToken");
  const pronounsListEl: MutableRefObject<HTMLSelectElement> = useRef(null);
  const occupationListEl: MutableRefObject<HTMLSelectElement> = useRef(null);


  const saveToDatabase = async () => {
    const selectedPronoun = pronounsListEl.current.value;
    const selectedOccupation = occupationListEl.current.value;

    const response = await fetch(
      `${env.data.APP_PLATFORM_API_URL}/me/update-settings`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.access_token}`,
        },
        body: JSON.stringify({
          pronouns: selectedPronoun,
          locale: navigator.language,
          occupation_id: selectedOccupation,
          user_id: twitchUser.id,
          username: twitchUser.login,
        }),
      },
    );

    if (response.ok) {
      const updatedSettings = (await response.json()) as UserSettings;
      await userService.updateSettings(updatedSettings);
    }
  };

  return (
    <form>
      <div className="flex flex-col w-full items-center gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="pronouns">{t("pronounsLabel")}</Label>
          <select
            ref={pronounsListEl}
            id="pronouns"
            onChange={saveToDatabase}
            value={settings.pronouns}
            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
          >
            {pronounsItems.map(({ translationKey, apiValue }) => (
              <option key={translationKey} value={apiValue}>
                {t(`pronouns${translationKey}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="occupation">{t("occupationLabel")}</Label>
          <select
            ref={occupationListEl}
            id="pronouns"
            onChange={saveToDatabase}
            value={settings.occupation_id}
            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
          >
            {occupations.map((occupation) => (
              <option key={occupation.id} value={occupation.id}>
                {t(`occupation${occupation.translation_key}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
