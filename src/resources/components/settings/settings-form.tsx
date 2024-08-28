import SelectField from "@Shad/components/ui/SelectField";
import { useStorage } from "@plasmohq/storage/hook";
import { type MutableRefObject, useEffect, useRef, useState } from "react";
import { useGetUserSettingsQuery, type UpdateSettingsDTO } from "~services/settings-service";
import type { AccessTokenResponse, Occupation, UserSettings } from "~types/types";
import Switch from "../../shad/components/switch";
import AnnounceBadge from "../app/announce-badge";
import { useSettings } from "../settings-provider";

type SettingsFormProps = {
  liveProfile: boolean;
  watchingChannelName?: string;
};

type FormState = {
  editingLiveProfile: boolean;
  pronouns: string;
  occupation: string;
  pronounsActive: boolean;
  occupationActive: boolean;
};

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


const DEFAULT_SETTINGS = {
  editingLiveProfile: false,
  pronouns: "none",
  occupation: "1",
  pronounsActive: true,
  occupationActive: true,
} as const


const buildDefaultSettings = (settings: UserSettings) => ({
  editingLiveProfile: settings.enabled,
  pronouns: settings.pronouns.slug || "none",
  occupation: `${settings.occupation_id || 1}`,
  pronounsActive: settings.pronouns.slug !== "none",
  occupationActive: settings.occupation_id !== 1,
})

export default function SettingsForm({
  liveProfile,
  watchingChannelName,
}: SettingsFormProps) {
  const [authorization] = useStorage<AccessTokenResponse>("accessToken");

  const settingsQuery = useGetUserSettingsQuery({
    authorization,
    channelId: liveProfile ? watchingChannelName : null,
  });


  const { globalSettings, channelSettings, saveSettings, fetchSettings } =
    useSettings();
  const [occupations] = useStorage<Occupation[]>("occupations", []);
  const [channelName] = useStorage("channelName");

  const [currentTabValue] = useStorage("currentTabValue", "global-profile");

  const pronounsListEl: MutableRefObject<HTMLSelectElement> = useRef(null);
  const occupationListEl: MutableRefObject<HTMLSelectElement> = useRef(null);

  const occupationsItems = occupations.map((occupation) => ({
    apiValue: `${occupation.id}`,
    translationKey: occupation.translation_key,
  }));

  const setting = (liveProfile ? settingsQuery.data.channelSettings : settingsQuery.data.globalSettings)

  const [formState, setFormState] = useState<FormState>(setting ? buildDefaultSettings(setting) : DEFAULT_SETTINGS);

  const isInputDisabled =
    liveProfile && !!watchingChannelName && !formState.editingLiveProfile;

  const handleChange = async (
    field: keyof FormState,
    value: string | boolean,
  ) => {
    const updatedState = { ...formState, [field]: value };
    setFormState(updatedState);

    await saveToDatabase(updatedState);
  };

  const saveToDatabase = async (updatedFormState: FormState) => {
    const isGlobalProfile = currentTabValue === "global-profile";

    const getPronouns = () =>
      isGlobalProfile || updatedFormState.pronounsActive
        ? pronounsListEl.current.value.toLowerCase()
        : "none";

    const getOccupationId = () =>
      isGlobalProfile || updatedFormState.occupationActive
        ? Number.parseInt(occupationListEl.current.value)
        : 1;

    const payload: UpdateSettingsDTO = {
      pronouns: getPronouns(),
      occupation_id: getOccupationId(),
      enabled: liveProfile ? updatedFormState.editingLiveProfile : false,
      channel_id: liveProfile ? watchingChannelName : "global",
      effect_id: 1,
      color_id: 1,
      locale: navigator.language,
    };
    // await saveSettings(payload);

    // await fetchSettings({
    //   currentTabValue: currentTabValue,
    //   channelName: liveProfile ? watchingChannelName : undefined,
    // });
  };


  return (
    <form>
      <div className="flex flex-col w-full items-center gap-8 mb-8 mt-3">
        {liveProfile && (
          <AnnounceBadge>
            <div className="flex flex-col items-center justify-center w-full gap-y-2">
              <p className="text-xs text-text-medium">
                Você está editando o canal{" "}
                <span className="font-bold text-text-high capitalize">
                  {channelName}
                </span>
              </p>
              <Switch
                onCheckedChange={(checked) =>
                  handleChange("editingLiveProfile", checked)
                }
                checked={formState.editingLiveProfile}
              />
            </div>
          </AnnounceBadge>
        )}
        <SelectField
          id="pronouns"
          label="pronounsLabel"
          items={pronounsItems}
          selectedValue={formState.pronouns}
          onChange={(value: string) => handleChange("pronouns", value)}
          liveProfile={liveProfile}
          active={formState.pronounsActive}
          onActiveChange={(active) => handleChange("pronounsActive", active)}
          disabled={isInputDisabled}
          currentTab={currentTabValue}
          ref={pronounsListEl}
        />
        <SelectField
          id="occupation"
          label="occupationLabel"
          items={occupationsItems}
          selectedValue={formState.occupation}
          onChange={(value: string) => handleChange("occupation", value)}
          liveProfile={liveProfile}
          active={formState.occupationActive}
          onActiveChange={(active) => handleChange("occupationActive", active)}
          disabled={isInputDisabled}
          currentTab={currentTabValue}
          ref={occupationListEl}
        />
      </div>
    </form>
  );
}
