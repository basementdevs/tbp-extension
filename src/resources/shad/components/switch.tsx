import * as SwitchRadix from "@radix-ui/react-switch";
import React from "react";

const Switch = () => (
  <div className="flex items-center">
    <SwitchRadix.Root
      className="w-[44px] h-[20px] bg-elevation-04dp rounded-full relative focus:shadow-black data-[state=checked]:bg-icon-high outline-none cursor-default border border-helper-outline"
      id="airplane-mode"
    >
      <SwitchRadix.Thumb className="block w-[12px] h-[12px] py-[2px] px-1 rounded-full transition-transform bg-elevation-surface duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px] data-[state=checked]:bg-elevation-surface" />
    </SwitchRadix.Root>
  </div>
);

export default Switch;
