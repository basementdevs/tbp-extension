import { Storage } from "@plasmohq/storage";
import { useStorage } from "@plasmohq/storage/hook";
import { Check } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  type UpdateSettingsDTO,
  updateSettings,
} from "~services/settings-service";
import type UserStorageService from "~services/user/user-storage-service";
import type { AccessTokenResponse, Effect } from "~types/types";

interface EffectCustomizeProps {
  userService?: UserStorageService;
}

const EffectCustomize = ({ userService }: EffectCustomizeProps) => {
  const [selectedEffect, setSelectedEffect] = useState(
    userService.getSettings().effect_id,
  );
  const [accessToken] = useStorage<AccessTokenResponse>("accessToken");
  const [effects] = useStorage<Effect[]>("settings-effects");
  const storage = new Storage();

  const effectList = useMemo(() => {
    if (!effects) {
      return [];
    }

    return effects;
  }, [effects]);

  const updateEffect = async ({ effect_id }: UpdateSettingsDTO) => {
    setSelectedEffect(effect_id);

    const settings = await updateSettings(accessToken, { effect_id });
    await userService.updateSettings(settings);
  };

  return (
    <div className="flex space-x-4">
      {effectList.map((effect) => (
        <div key={effect.id} className="relative">
          <button
            type="button"
            className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                ${selectedEffect === effect.id ? "ring-2 ring-white" : ""}`}
            style={{ backgroundColor: effect.hex }}
            onClick={() => updateEffect({ effect_id: effect.id })}
          />
          {selectedEffect === effect.id && (
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
