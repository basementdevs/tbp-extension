import { t } from "@/utils/i18n";
import { ChevronDown } from "lucide-react";
import React, { useState, type MutableRefObject } from "react";

type DynamicSelectProps = {
  id: string;
  label: string;
  items: { name: string; apiValue: string }[];
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  children?: React.ReactNode;
};

const DynamicSelect = React.forwardRef<HTMLSelectElement, DynamicSelectProps>(
  ({ id, label, items, value, onChange, disabled, children }, ref) => {
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-x-5 items-center">
          <label className="font-medium text-text-high" htmlFor={id}>
            {t(label)}
          </label>
        </div>
        <div className="relative">
          <select
            ref={ref as MutableRefObject<HTMLSelectElement>}
            id={id}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className="flex w-full items-center justify-between px-4 py-2 border border-helper-outline hover:border-icon-medium focus:border-primary-600 focus:outline-none font-medium bg-elevation-surface rounded-md appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled}
          >
            {items.map(({ name, apiValue }) => (
              <option
                key={name}
                value={apiValue}
                className="bg-helper-outline font-primary text-text-medium focus:border-primary-600"
              >
                {name}
              </option>
            ))}
          </select>
          <ChevronDown
            size="16"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-icon-medium"
          />
        </div>
      </div>
    );
  },
);

DynamicSelect.displayName = "DynamicSelect";

export default DynamicSelect;
