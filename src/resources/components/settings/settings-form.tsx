import SelectField from "@Shad/components/ui/SelectField";
import { type MutableRefObject, useRef, useState } from "react";

import type {
  AccessTokenResponse,
  Occupation,
  TwitchUser,
  UserSettings,
} from "~types/types";

import { useStorage } from "@plasmohq/storage/hook";
import { env } from "~config/env";
import type UserStorageService from "~services/user/user-storage-service";
import AnnounceBadge from "../app/announce-badge";

interface SettingsFormProps {
  userService: UserStorageService;
  liveProfile?: boolean;
}

export const pronounsItems = [
  { apiValue: "none", translationKey: "None" },
  { apiValue: "he-him", translationKey: "HeHim" },
  { apiValue: "she-her", translationKey: "SheHer" },
  { apiValue: "they-them", translationKey: "TheyThem" },
  { apiValue: "she-they", translationKey: "SheThey" },
  { apiValue: "he-they", translationKey: "HeThey" },
  { apiValue: "he-she", translationKey: "HeShe" },
  { apiValue: "xe-xem", translationKey: "XeXem" },
  { apiValue: "it-its", translationKey: "ItIts" },
  { apiValue: "fae-faer", translationKey: "FaeFaer" },
  { apiValue: "ve-ver", translationKey: "VeVer" },
  { apiValue: "ae-aer", translationKey: "AeAer" },
  { apiValue: "zie-hir", translationKey: "ZieHir" },
  { apiValue: "per-per", translationKey: "PerPer" },
  { apiValue: "e-em", translationKey: "EEm" },
];

export default function SettingsForm({
  userService,
  liveProfile,
}: SettingsFormProps) {
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
  const [channelName] = useStorage("channelName");

  const saveToDatabase = async () => {
    const selectedPronoun = pronounsListEl.current.value.toLowerCase();
    const selectedOccupation = occupationListEl.current.value;

    const payload = {
      pronouns: selectedPronoun,
      locale: navigator.language,
      occupation_id: selectedOccupation,
      user_id: twitchUser.id,
      username: twitchUser.login,
      enabled: true,
      channel_id: "global",
    };

    const response = await fetch(
      `${env.data.APP_PLATFORM_API_URL}/me/update-settings`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.access_token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (response.ok) {
      const updatedSettings = (await response.json()) as UserSettings;
      await userService.updateSettings(updatedSettings);
    }
  };

  return (
    <form>
      <div className="flex flex-col w-full items-center gap-8 mb-8 mt-3">
        {liveProfile && (
          <AnnounceBadge>
            <p className="text-xs text-text-medium">
              Você está editando o canal{" "}
              <span className="font-bold text-text-high capitalize">
                {channelName}
              </span>
            </p>
          </AnnounceBadge>
        )}
        <SelectField
          id="pronouns"
          label="pronounsLabel"
          ref={pronounsListEl}
          items={pronounsItems}
          selectedValue={settings.pronouns.slug}
          onChange={saveToDatabase}
          liveProfile={liveProfile}
        />
        <SelectField
          id="occupation"
          label="occupationLabel"
          ref={occupationListEl}
          items={occupationsItems}
          selectedValue={current_occupation}
          onChange={saveToDatabase}
          liveProfile={liveProfile}
        />
      </div>
    </form>
  );
}
