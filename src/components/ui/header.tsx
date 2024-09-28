import Logo from "data-base64:../../../assets/icon.png";
import { env } from "@/config/env";
import { t } from "@/utils/i18n";
import { version } from "../../../package.json";

type HeaderProps = {
  isSidebarVisible?: boolean;
};

export default function Header({ isSidebarVisible = true }: HeaderProps) {
  const appStage =
    env.data.APP_ENVIRONMENT === "production"
      ? `(${env.data.APP_STAGE})`
      : "(dev)";

  return (
    <header
      className={`flex flex-row justify-between items-center ${isSidebarVisible ? "w-full" : ""}`}
    >
      <div className="flex items-center justify-center">
        <img src={Logo} alt="logo" width={20} height={20} className="mr-3" />
        <div className="flex items-center gap-x-1">
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
      </div>
    </header>
  );
}
