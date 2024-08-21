import EffectCustomize from "@Components/theme/effect-customize";
import type UserStorageService from "~services/user/user-storage-service";
import { t } from "~utils/i18nUtils";
import { ThemeSelect } from "../app/mode-toggle";
import ColorCustomizer from "./color-customize";

interface ThemeProps {
  userService?: UserStorageService;
}

const Theme = ({ userService }: ThemeProps) => {
  return (
    <div className="flex flex-col gap-y-8 mt-8">
      <div className="space-y-2">
        <h1 className="font-bold text-xs text-text-high">Escolha seu tema</h1>
        <p className="text-xxs font-medium text-text-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="space-y-2 flex items-center justify-between">
        <h1 className="font-bold text-xs text-text-high w-2/3">Tema</h1>
        <div className="w-1/3">
          <ThemeSelect />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-bold text-xs text-text-high">
          Customize suas cores
        </h1>
        <p className="text-xxs font-medium text-text-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam libero
          risus, faucibus nec dui ac, varius rhoncus elit.
        </p>
        <ColorCustomizer userService={userService} />
      </div>
      <div className="space-y-2">
        <h1 className="font-bold text-xs text-text-high">
          Adicione Efeitos ao seu Nickname
        </h1>
        <p className="text-xxs font-medium text-text-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam libero
          risus, faucibus nec dui ac, varius rhoncus elit.
        </p>
        <EffectCustomize userService={userService} />
      </div>
    </div>
  );
};

export default Theme;
