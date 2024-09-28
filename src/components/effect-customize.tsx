import DynamicSelect from "@/components/ui/dynamic-select";
import SelectField from "@/components/ui/select-field";
import { useUserSettings } from "@/hooks/use-user-settings";
import { useAccessToken } from "@/providers/access-token-provider";
import { usePatchUserSettingsMutation } from "@/services/settings-service";
import type { Effect } from "@/types/types";
import { PRONOUNS_ITEMS } from "@/utils/pronouns";
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
  const { mutate } = usePatchUserSettingsMutation();
  const { accessToken } = useAccessToken();

  const { activeSettings } = useUserSettings(liveProfile, channelName);

  const effectList = effects || [];
  console.log(effectList);
  const mappedEffects = effectList.map((effect) => ({
    name: effect.name,
    apiValue: effect.id.toString(),
  }));
  console.log(mappedEffects);
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
      <DynamicSelect
        id="effects"
        label="effectsLabel"
        items={mappedEffects}
        value={activeSettings?.effect_id.toString()}
        onChange={(effect) =>
          handleChange("effect_id", Number.parseInt(effect))
        }
        disabled={!activeSettings?.enabled}
      />
    </div>
  );
};

export default EffectCustomize;
