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

const Theme = ({ liveProfile }: ThemeProps) => {
  // TODO: remove this theme page and add directly to the sidebar
  return (
    <div className="flex flex-col gap-y-8 mt-8">
      <div className="space-y-2 flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-bold text-xs text-text-high">
            {t("themeToggleTitle")}
          </h1>
          <ThemeSelect />
        </div>
      </div>
    </div>
  );
};

export default Theme;
