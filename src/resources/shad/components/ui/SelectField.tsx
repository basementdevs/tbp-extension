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
      <select
        ref={ref as MutableRefObject<HTMLSelectElement>}
        id={id}
        onChange={onChange}
        value={selectedValue}
        className="flex w-full items-center justify-between px-4 py-3 text-icon-medium border border-helper-outline font-medium bg-elevation-surface rounded-pill"
      >
        {items.map(({ translationKey, apiValue }) => (
          <option key={translationKey} value={apiValue}>
            {t(`${id}${translationKey}`)}
          </option>
        ))}
      </select>
    </div>
  ),
);

SelectField.displayName = "SelectField";

export default SelectField;
