import { t } from "~utils/i18nUtils";
import { ThemeSelect } from "../app/mode-toggle";
import ColorCustomizer from "./color-customize";

const Theme = () => {
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
        <ColorCustomizer />
      </div>
    </div>
  );
};

export default Theme;
