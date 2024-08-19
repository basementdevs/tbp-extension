import Logo from "data-base64:@Root/assets/icon.png";
import { version } from "@Root/package.json";
import { useStorage } from "@plasmohq/storage/dist/hook";
import { env } from "~config/env";
import { t } from "~utils/i18nUtils";
import Sidebar from "./sidebar";

type HeaderProps = {
  isSidebarVisible?: boolean;
};

export default function Header({ isSidebarVisible = true }: HeaderProps) {
  const [isAuthenticated] = useStorage("accessToken");

  const appStage =
    env.data.APP_ENVIRONMENT === "production"
      ? `(${env.data.APP_STAGE})`
      : "(dev)";

  return (
    <header
      className={`flex flex-row justify-between items-center ${isSidebarVisible ? "w-full" : ""}`}
    >
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
    </header>
  );
}
