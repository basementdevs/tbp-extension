import { t } from "@/utils/i18nUtils";
import { ChevronRight } from "lucide-react";
import React, { useState, type MutableRefObject } from "react";

type SelectFieldProps = {
  id: string;
  label: string;
  items: { translationKey: string; apiValue: string }[];
  value?: string;
  isDisable?: boolean;
  onChange: (value: string) => void;
  children?: React.ReactNode;
};

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, items, value, onChange, isDisable, children }, ref) => {
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-x-5 items-center">
          <label className="font-medium text-text-high" htmlFor={id}>
            {t(label)}
          </label>
          {children}
        </div>
        <div className="relative">
          <select
            ref={ref as MutableRefObject<HTMLSelectElement>}
            id={id}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className="flex w-full items-center justify-between px-4 py-3 border border-helper-outline hover:border-icon-medium focus:border-primary-600 focus:outline-none font-medium bg-elevation-surface rounded-pill appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isDisable}
          >
            {items.map(({ translationKey, apiValue }) => (
              <option
                key={translationKey}
                value={apiValue}
                className="bg-helper-outline font-primary text-text-medium focus:border-primary-600"
              >
                {t(`${id}${translationKey}`)}
              </option>
            ))}
          </select>
          <ChevronRight
            size="16"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-icon-medium"
          />
        </div>
      </div>
    );
  },
);

SelectField.displayName = "SelectField";

export default SelectField;
