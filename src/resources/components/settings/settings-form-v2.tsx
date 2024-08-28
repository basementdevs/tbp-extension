import { pronounsItems } from "~utils/pronouns";
import { useAccessToken } from "../auth/access-token-provider";
import { useGetUserSettingsQuery } from "~services/settings-service";

type SettingsFormProps = {
  liveProfile: boolean;
  channelName?: string | undefined;
};

const DEFAULT_SETTINGS = {
  editingLiveProfile: false,
  pronouns: "none",
  occupation: "1",
  pronounsActive: true,
  occupationActive: true,
} as const;

export default function SettingsFormV2({
  liveProfile,
  channelName,
}: SettingsFormProps) {
  const { accessToken } = useAccessToken();

  const settingsQuery = useGetUserSettingsQuery({
    authorization: accessToken,
    channelId: liveProfile ? channelName : undefined,
  });

  return (
    <div>
      <h1>SettingsForm</h1>
    </div>
  );
}
