import { ModeToggle } from "@Components/app/mode-toggle";
import { version } from "@Root/package.json";
import { H4 } from "@Shad/components/ui/typography/h4";
import { Menu } from "lucide-react";
import { Button } from "~resources/shad/components/ui/button";
import Logo from "data-base64:@Root/assets/icon.png";
import { useStorage } from "@plasmohq/storage/dist/hook";
import { env } from "~config/env";
import { t } from "~utils/i18nUtils";

export default function Header() {
  const [isAuthenticated] = useStorage("accessToken");
  const onStorageClear = async () => {
    const { Storage } = await import("@plasmohq/storage");
    const storage = new Storage();
    await storage.clear();
  };

  const appStage =
    env.data.APP_ENVIRONMENT === "production"
      ? `(${env.data.APP_STAGE})`
      : "(dev)";

  return (
    <header className="flex flex-row justify-between items-center bg-elevation-surface">
      <div className="flex items-center space-x-2 justify-center">
        <img src={Logo} alt="logo" width={20} height={20} />
        <div>
          <span className="font-primary font-bold text-text-high text-xs">
            {t("headerTitle")}
          </span>
        </div>
        <div>
          <span className="font-medium text-text-medium text-xxs">
            v{version} {appStage}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="text-icon-medium"
        onClick={onStorageClear}
      >
        <Menu size={24} />
      </button>
    </header>
  );
}
