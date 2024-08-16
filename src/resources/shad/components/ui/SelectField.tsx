import { ChevronRight } from "lucide-react";
import React, { type MutableRefObject } from "react";
import { t } from "../../../../utils/i18nUtils";

type SelectFieldProps = {
  id: string;
  label: string;
  items: { translationKey: string; apiValue: string }[];
  selectedValue?: string;
  onChange: () => void;
};

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, items, selectedValue, onChange }, ref) => (
    <div className="flex flex-col gap-3 w-full">
      <label className="font-medium text-text-high" htmlFor={id}>
        {t(label)}
      </label>
      <div className="relative">
        <select
          ref={ref as MutableRefObject<HTMLSelectElement>}
          id={id}
          onChange={onChange}
          value={selectedValue}
          className="flex w-full items-center justify-between px-4 py-3 border border-helper-outline hover:border-icon-medium focus:border-primary-600 focus:outline-none font-medium bg-elevation-surface rounded-pill appearance-none pr-10"
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
  ),
);

SelectField.displayName = "SelectField";

export default SelectField;
