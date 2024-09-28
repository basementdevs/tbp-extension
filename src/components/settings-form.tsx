import AnnounceBadge from "@/components/ui/announce-badge";
import SelectField from "@/components/ui/select-field";
import Switch from "@/components/ui/switch";
import { useAccessToken } from "@/providers/access-token-provider";
import {
  useGetUserSettingsQuery,
  usePatchUserSettingsMutation,
  useUpdateUserSettingsMutation,
} from "@/services/settings-service";
import type { Occupation } from "@/types/types";
import { t } from "@/utils/i18n";
import { PRONOUNS_ITEMS } from "@/utils/pronouns";
import { useStorage } from "@plasmohq/storage/hook";

type SettingsFormProps = {
  liveProfile: boolean;
  channelName?: string | undefined;
};

const DEFAULT_SETTINGS = {
  enabled: false,
  pronouns: "none",
  occupation_id: "1",
} as const;

export default function SettingsForm({
  liveProfile,
  channelName,
}: SettingsFormProps) {
  const [occupations] = useStorage<Occupation[]>("occupations", []);
  const { accessToken } = useAccessToken();

  const occupationsItems = occupations.map((occupation) => ({
    apiValue: `${occupation.id}`,
    translationKey: occupation.translation_key,
  }));

  const { data, isLoading } = useGetUserSettingsQuery({
    authorization: accessToken,
    channelName: liveProfile ? channelName : undefined,
  });

  const activeSettings = liveProfile
    ? data?.channelSettings
    : data?.globalSettings;

  const updateSettings = useUpdateUserSettingsMutation();
  const patchSettings = usePatchUserSettingsMutation();

  const handleChange = (
    key: keyof typeof DEFAULT_SETTINGS,
    value: string | boolean,
  ) => {
    const isLiveProfileWithoutChannelSettings =
      liveProfile && !data?.channelSettings;
    let payload = {};

    if (isLiveProfileWithoutChannelSettings) {
      payload = {
        channel_id: liveProfile ? channelName : "global",
        user_id: data?.globalSettings?.user_id?.toString(),
        occupation_id: data?.globalSettings?.occupation_id?.toString(),
        color_id: data?.globalSettings?.color_id?.toString(),
        effect_id: data?.globalSettings?.effect_id?.toString(),
        pronouns: data?.globalSettings?.pronouns?.slug,
        locale: data?.globalSettings?.locale,
        enabled: true,
      };
      updateSettings.mutate({
        authorization: accessToken,
        payload,
      });
    } else {
      payload = {
        channel_id: liveProfile ? channelName : "global",
        [key]: value,
      };
      patchSettings.mutate({
        authorization: accessToken,
        payload,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form>
      <div className="flex flex-col w-full items-center gap-8 mb-8 mt-3">
        {liveProfile && (
          <AnnounceBadge>
            <div className="flex flex-row items-center justify-between w-full gap-y-2">
              <Switch
                onCheckedChange={(checked) => handleChange("enabled", checked)}
                checked={activeSettings?.enabled || DEFAULT_SETTINGS.enabled}
              />
              <div className="flex flex-col items-end space-x-4">
                <p className="text-xs text-text-medium ">
                  {t("featureStreamProfileLabel")}
                </p>
                <p className="font-bold  text-text-high">
                  {channelName?.toLowerCase()}
                </p>
              </div>
            </div>
          </AnnounceBadge>
        )}
        <SelectField
          id="pronouns"
          label="pronounsLabel"
          items={PRONOUNS_ITEMS}
          value={activeSettings?.pronouns.slug}
          onChange={(value: string) => handleChange("pronouns", value)}
          disabled={!activeSettings?.enabled}
        />
        <SelectField
          id="occupation"
          label="occupationLabel"
          items={occupationsItems}
          value={activeSettings?.occupation_id?.toString()}
          onChange={(value: string) => handleChange("occupation_id", value)}
          disabled={!activeSettings?.enabled}
        />
      </div>
    </form>
  );
}
