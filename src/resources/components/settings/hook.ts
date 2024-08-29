import { useGetUserSettingsQuery } from "~services/settings-service";
import { useAccessToken } from "../auth/access-token-provider";

export function useUserSettings(liveProfile: boolean, channelName?: string) {
  const { accessToken } = useAccessToken();

  const { data, isLoading } = useGetUserSettingsQuery({
    authorization: accessToken,
    channelName: liveProfile ? channelName : undefined,
    liveProfile: liveProfile,
  });

  const activeSettings = liveProfile
    ? data?.channelSettings || data?.globalSettings
    : data?.globalSettings;

  return { activeSettings, isLoading };
}
