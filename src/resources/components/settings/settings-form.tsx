import SelectField from "@Shad/components/ui/SelectField";
import { type MutableRefObject, useRef } from "react";

import type {
  AccessTokenResponse,
  Occupation,
  TwitchUser,
  UserSettings,
} from "~types/types";

import { useStorage } from "@plasmohq/storage/hook";
import { env } from "~config/env";
import type UserStorageService from "~services/user/user-storage-service";

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
  const occupationsItems = occupations.map((occupation) => ({
    apiValue: `${occupation.id}`,
    translationKey: occupation.translation_key,
  }));
  const settings = userService.getSettings();

  const current_occupation = `${settings.occupation.id}`;
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
    console.log(response);

    if (response.ok) {
      const updatedSettings = (await response.json()) as UserSettings;
      await userService.updateSettings(updatedSettings);
    }
  };

  return (
    <form>
      <div className="flex flex-col w-full items-center gap-8 mb-8">
        <SelectField
          id="pronouns"
          label="pronounsLabel"
          ref={pronounsListEl}
          items={pronounsItems}
          selectedValue={settings.pronouns.slug}
          onChange={saveToDatabase}
        />
        <SelectField
          id="occupation"
          label="occupationLabel"
          ref={occupationListEl}
          items={occupationsItems}
          selectedValue={current_occupation}
          onChange={saveToDatabase}
        />
      </div>
    </form>
  );
}
