import { useRef } from "react";
import { Storage } from "@plasmohq/storage";
import SelectField from "@Shad/components/ui/SelectField";

import type { TwitchUser } from "~types/types";

interface SettingsFormProps {
  user?: TwitchUser;
  pronouns?: string;
  occupation?: string;
}

export const occupations = [
  { translationKey: "None", apiValue: "none" },
  { translationKey: "Student", apiValue: "student" },
  { translationKey: "Lawyer", apiValue: "lawyer" },
  { translationKey: "Doctor", apiValue: "doctor" },
  { translationKey: "CivilEngineer", apiValue: "civil-engineer" },
  { translationKey: "FrontEndEngineer", apiValue: "frontend-engineer" },
  { translationKey: "SreEngineer", apiValue: "sre-engineer" },
  { translationKey: "BackEndEngineer", apiValue: "backend-engineer" },
  { translationKey: "FullstackEngineer", apiValue: "fullstack-engineer" },
  { translationKey: "UxUiDesigner", apiValue: "designer" },
];

export const pronounsItems = [
  { apiValue: "n/d", translationKey: "None" },
  { apiValue: "He/Him", translationKey: "HeHim" },
  { apiValue: "She/Her", translationKey: "SheHer" },
  { apiValue: "They/Them", translationKey: "TheyThem" },
  { apiValue: "She/They", translationKey: "SheThey" },
  { apiValue: "He/They", translationKey: "HeThey" },
  { apiValue: "He/She", translationKey: "HeShe" },
  { apiValue: "Xe/Xem", translationKey: "XeXem" },
  { apiValue: "It/Its", translationKey: "ItIts" },
  { apiValue: "Fae/Faer", translationKey: "FaeFaer" },
  { apiValue: "Ve/Ver", translationKey: "VeVer" },
  { apiValue: "Ae/Aer", translationKey: "AeAer" },
  { apiValue: "Zie/Hir", translationKey: "ZieHir" },
  { apiValue: "Per/Per", translationKey: "PerPer" },
  { apiValue: "E/Em", translationKey: "EEm" },
];

export default function SettingsForm({
  user,
  pronouns,
  occupation,
}: SettingsFormProps) {
  const pronounsListEl = useRef<HTMLSelectElement>(null);
  const occupationListEl = useRef<HTMLSelectElement>(null);

  const updateSettings = async () => {
    const storage = new Storage();
    const selectedPronoun = pronounsListEl.current?.value;
    const selectedOccupation = occupationListEl.current?.value;

    const response = await fetch(
      `${process.env.PLASMO_PUBLIC_API_URL}/settings`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pronouns: selectedPronoun,
          locale: navigator.language,
          occupation: selectedOccupation,
          user_id: user?.id,
          username: user?.display_name,
        }),
      },
    );

    if (response.ok) {
      await storage.set("pronouns", selectedPronoun);
      await storage.set("occupation", selectedOccupation);
    }
  };

  return (
    <form>
      <div className="flex flex-col w-full items-center gap-8 mb-8">
        <SelectField
          id="pronouns"
          label="pronounsLabel"
          ref={pronounsListEl}
          items={pronounsItems}
          selectedValue={pronouns}
          onChange={updateSettings}
        />
        <SelectField
          id="occupation"
          label="occupationLabel"
          ref={occupationListEl}
          items={occupations}
          selectedValue={occupation}
          onChange={updateSettings}
        />
      </div>
    </form>
  );
}
