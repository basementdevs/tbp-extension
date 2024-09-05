import ColorCustomizer from "@/components/color-customize";
import EffectCustomize from "@/components/effect-customize";
import { ThemeSelect } from "@/components/mode-toggle";
import type UserStorageService from "@/services/user/user-storage-service";
import { t } from "@/utils/i18n";

interface ThemeProps {
  userService?: UserStorageService;
  liveProfile: boolean;
  channelName: string | undefined;
}

const Theme = ({ liveProfile, channelName }: ThemeProps) => {
  return (
    <div className="flex flex-col gap-y-8 mt-8">
      <div className="space-y-2 flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-bold text-xs text-text-high">
            Tema da interface
          </h1>
          <ThemeSelect />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-bold text-xs text-text-high">
          Customize suas cores
        </h1>
        <ColorCustomizer liveProfile={liveProfile} channelName={channelName} />
      </div>
      <div className="space-y-2">
        <h1 className="font-bold text-xs text-text-high">
          Adicione Efeitos ao seu Nickname
        </h1>
        <EffectCustomize liveProfile={liveProfile} channelName={channelName} />
      </div>
    </div>
  );
};

export default Theme;
