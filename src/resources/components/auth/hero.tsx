import { sendToBackground } from "@plasmohq/messaging";
import { LucideTwitch } from "lucide-react";
import type React from "react";
import { Button } from "~resources/shad/components/ui/button";

import { t } from "~utils/i18nUtils";

const authenticate = async () => {
  await sendToBackground({
    name: "oauth",
  });
};

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8">
      <div className="text-center">
        <h1 className="font-secondary text-lg font-semibold text-text-high dark:text-text-high">
          {t("heroTitle")}
        </h1>
        <p className="text-text-medium font-primary text-xs">
          {t("heroSubtitle")}
        </p>
      </div>
      <Button
        onClick={authenticate}
        className="px-4 py-3 space-x-xxs w-full rounded-pill"
      >
        <LucideTwitch size="16" color="white" />
        <p className="text-white font-semibold text-xs">
          {t("authenticateButtonText")}
        </p>
      </Button>
    </div>
  );
}
