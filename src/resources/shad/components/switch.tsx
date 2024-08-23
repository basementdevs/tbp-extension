import * as SwitchRadix from "@radix-ui/react-switch";
import React from "react";

const Switch = () => (
  <form>
    <div className="flex items-center">
      <SwitchRadix.Root
        className="w-[44px] h-[20px] bg-elevation-04dp rounded-full relative focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
        id="airplane-mode"
        style={{ "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)" }}
      >
        <SwitchRadix.Thumb className="block w-[12px] h-[12px] bg-elevation-surface rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[26px]" />
      </SwitchRadix.Root>
    </div>
  </form>
);

export default Switch;
