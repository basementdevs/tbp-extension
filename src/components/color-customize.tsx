import { useUserSettings } from "@/hooks/use-user-settings";
import { useAccessToken } from "@/providers/access-token-provider";
import {
  type UpdateSettingsDTO,
  useUpdateUserSettingsMutation,
} from "@/services/settings-service";
import type { Color } from "@/types/types";
import { useStorage } from "@plasmohq/storage/hook";
import { Check } from "lucide-react";

interface ColorCustomizerProps {
  liveProfile?: boolean;
  channelName?: string | undefined;
}

const ColorCustomizer = ({
  liveProfile,
  channelName,
}: ColorCustomizerProps) => {
  const [colors] = useStorage<Color[]>("settings-colors");
  const { mutate } = useUpdateUserSettingsMutation();
  const { accessToken } = useAccessToken();

  const { activeSettings } = useUserSettings(liveProfile ?? false, channelName);

  const colorList = colors || [];

  const handleChange = (key: string, value: number | undefined) => {
    mutate({
      authorization: accessToken,
      payload: {
        channel_id: liveProfile ? channelName : "global",
        [key]: value,
      },
    });
  };

  const updateEffect = async ({ color_id }: UpdateSettingsDTO) => {
    handleChange("color_id", color_id);
  };

  return (
    <div className="flex space-x-4">
      {colorList.map((color) => (
        <div key={color.id} className="relative">
          <button
            type="button"
            className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                ${activeSettings?.color_id === color.id ? "ring-2 ring-white" : ""}`}
            style={{ backgroundColor: color.hex ?? "#000" }}
            onClick={() => updateEffect({ color_id: color.id })}
          />
          {activeSettings?.color_id === color.id && (
            <div className="absolute -top-1 -right-1 bg-icon-high border-helper-outline rounded-full p-0.5">
              <Check size={12} className="text-elevation-surface font-bold" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorCustomizer;
