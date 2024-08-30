import { useAccessToken } from "@/providers/access-token-provider";
import { useGetUserSettingsQuery } from "@/services/settings-service";

export function useUserSettings(liveProfile: boolean, channelName?: string) {
  const { accessToken } = useAccessToken();

  const { data, isLoading } = useGetUserSettingsQuery({
    authorization: accessToken,
    channelName: liveProfile ? channelName : undefined,
  });

  const activeSettings = liveProfile
    ? data?.channelSettings || data?.globalSettings
    : data?.globalSettings;

  return { activeSettings, isLoading };
}
