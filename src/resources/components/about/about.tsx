import { Github } from "lucide-react";
import packageJson from "../../../../package.json";

import { t } from "~utils/i18nUtils";

export default function AboutCard() {
  const version = packageJson.version;
  const repositoryUrl =
    "https://github.com/basementdevs/twitch-addon-scylladb-rs/";
  const changelogUrl = `${repositoryUrl}/releases/tag/${version}`;

  return (
    <div className="flex flex-col space-y-5 mt-8">
      <div className="space-y-2">
        <h1 className="font-bold text-xs text-text-high">{t("aboutTitle")}</h1>
        <p className="text-xxs font-medium text-text-medium">
          {t("aboutDescription")}
        </p>
        <p className="text-xxs font-medium text-text-medium">
          {t("aboutSubdescription")}
        </p>
      </div>

      <div className="space-y-2">
        <h1 className="font-bold text-xs text-text-high">
          {t("aboutChangelog")}
        </h1>
        <p className="text-xxs font-medium text-text-medium">
          {t("aboutVersion")} {version}
        </p>
      </div>
      <div className="flex">
        <a href={repositoryUrl}>
          <Github />
        </a>
      </div>
    </div>
  );
}
