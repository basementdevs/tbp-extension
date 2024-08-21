import { useStorage } from "@plasmohq/storage/hook";
import { Check } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  type UpdateSettingsDTO,
  updateSettings,
} from "~services/settings-service";
import type UserStorageService from "~services/user/user-storage-service";
import type { AccessTokenResponse, Color } from "~types/types";

interface ColorCustomizerProps {
  userService?: UserStorageService;
}

const ColorCustomizer = ({ userService }: ColorCustomizerProps) => {
  const [selectedColor, setSelectedColor] = useState(
    userService.getSettings().color_id,
  );
  const [accessToken] = useStorage<AccessTokenResponse>("accessToken");
  const [colors] = useStorage<Color[]>("settings-colors");

  const colorList = useMemo(() => {
    if (!colors) {
      return [];
    }

    return colors;
  }, [colors]);

  const updateEffect = async ({ color_id }: UpdateSettingsDTO) => {
    setSelectedColor(color_id);

    const settings = await updateSettings(accessToken, { color_id });
    await userService.updateSettings(settings);
  };

  return (
    <div className="flex space-x-4">
      {colorList.map((color) => (
        <div key={color.id} className="relative">
          <button
            type="button"
            className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                ${selectedColor === color.id ? "ring-2 ring-white" : ""}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => updateEffect({ color_id: color.id })}
          />
          {selectedColor === color.id && (
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
