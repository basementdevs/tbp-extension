import { useUserSettings } from "@/hooks/use-user-settings";
import { useAccessToken } from "@/providers/access-token-provider";
import { useUpdateUserSettingsMutation } from "@/services/settings-service";
import type { Effect } from "@/types/types";
import { useStorage } from "@plasmohq/storage/hook";
import { Check } from "lucide-react";

interface EffectCustomizeProps {
  liveProfile: boolean;
  channelName: string | undefined;
}

const EffectCustomize = ({
  liveProfile,
  channelName,
}: EffectCustomizeProps) => {
  const [effects] = useStorage<Effect[]>("settings-effects");
  const { mutate } = useUpdateUserSettingsMutation();
  const { accessToken } = useAccessToken();

  const { activeSettings } = useUserSettings(liveProfile, channelName);

  const effectList = effects || [];

  const handleChange = (key: string, value: number | undefined) => {
    mutate({
      authorization: accessToken,
      payload: {
        channel_id: liveProfile ? channelName : "global",
        [key]: value,
      },
    });
  };

  return (
    <div className="flex space-x-4">
      {effectList.map((effect) => (
        <div key={effect.id} className="relative">
          <button
            type="button"
            className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                ${activeSettings?.effect_id === effect.id ? "ring-2 ring-white" : ""}`}
            style={{ backgroundColor: effect.hex ?? "#000" }}
            onClick={() => handleChange("effect_id", effect.id)}
          />
          {activeSettings?.effect_id === effect.id && (
            <div className="absolute -top-1 -right-1 bg-icon-high border-helper-outline rounded-full p-0.5">
              <Check size={12} className="text-elevation-surface font-bold" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EffectCustomize;
