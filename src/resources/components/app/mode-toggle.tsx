import { useTheme } from "@Components/app/theme-provide";
import { ChevronRight } from "lucide-react";
import { t } from "~utils/i18nUtils";
import type { Theme } from "./theme-provide";

export function ThemeSelect() {
  const { setTheme, theme } = useTheme();

  const themeOptions = [
    { value: "light", label: t("themeLight") },
    { value: "dark", label: t("themeDark") },
    { value: "system", label: t("themeSystem") },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as Theme);
  };

  return (
    <div className="relative w-full">
      <select
        id="theme-select"
        onChange={handleChange}
        value={theme}
        className="flex w-full items-center justify-between px-4 py-2 border border-helper-outline hover:border-icon-medium focus:border-primary-600 focus:outline-none font-medium bg-elevation-surface rounded-pill appearance-none"
      >
        {themeOptions.map(({ value, label }) => (
          <option
            key={value}
            value={value}
            className="bg-helper-outline font-primary text-text-medium focus:border-primary-600"
          >
            {label}
          </option>
        ))}
      </select>
      <ChevronRight
        size="16"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 pointer-events-none text-icon-medium"
      />
    </div>
  );
}
