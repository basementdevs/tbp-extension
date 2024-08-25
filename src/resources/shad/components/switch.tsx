import * as SwitchRadix from "@radix-ui/react-switch";
import React from "react";

interface SwitchProps {
  onCheckedChange: (checked: boolean) => void;
  checked: boolean;
}

const Switch = ({ onCheckedChange, checked }: SwitchProps) => (
  <div className="flex items-center">
    <SwitchRadix.Root
      onCheckedChange={onCheckedChange}
      checked={checked}
      className="w-[44px] h-[20px] bg-elevation-04dp rounded-full relative focus:shadow-black data-[state=checked]:bg-icon-high outline-none cursor-default border border-helper-outline"
      id="airplane-mode"
    >
      <SwitchRadix.Thumb className="block w-[12px] h-[12px] py-[2px] px-1 rounded-full transition-transform bg-elevation-surface duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px] data-[state=checked]:bg-elevation-surface" />
    </SwitchRadix.Root>
  </div>
);

export default Switch;
