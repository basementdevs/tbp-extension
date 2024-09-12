import TwitchLogo from "react:~/assets/twitch.svg";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { t } from "@/utils/i18n";
import { sendToBackground } from "@plasmohq/messaging";

const authenticate = async () => {
  await sendToBackground({
    name: "oauth",
  });
};

export const Login = () => {
  return (
    <>
      <Header isSidebarVisible={false} />
      <div className="flex flex-col gap-y-8">
        <hr className="border-helper-outline w-full mt-4" />
        <div className="flex flex-col items-center justify-center gap-y-8">
          <div className="text-center">
            <h1 className="font-secondary text-lg font-semibold text-text-high">
              {t("heroTitle")}{" "}
              <span className="text-[#9747FF]">{t("heroProfileTitle")}</span>
            </h1>
            <p className="text-text-medium font-primary text-xs">
              {t("heroSubtitle")}
            </p>
          </div>
          <Button
            onClick={authenticate}
            className="px-4 py-3 space-x-xxs w-full rounded-sm"
          >
            <TwitchLogo width={16} height={16} className="text-white" />
            <p className="text-white font-semibold text-xs">
              {t("authenticateButtonText")}
            </p>
          </Button>
        </div>
      </div>
    </>
  );
};
