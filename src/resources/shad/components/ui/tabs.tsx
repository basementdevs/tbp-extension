import { Storage } from "@plasmohq/storage";
import * as Tab from "@radix-ui/react-tabs";
import type React from "react";
import { useState } from "react";

type Tabs = {
  name: string;
  value: string;
  disabled?: boolean;
  content: React.ReactNode;
};

type TabsProps = {
  tabData: Tabs[];
  onValueChange?: (value: string) => void;
};

const storage = new Storage();

const TabTrigger: React.FC<{
  name: string;
  value: string;
  disabled: boolean;
}> = ({ name, value, disabled }) => {
  return (
    <Tab.Trigger
      className="bg-elevation-surface pb-3 flex-1 flex items-center justify-center leading-none dark:text-foreground select-none font-bold text-text-medium data-[state=active]:text-text-high dark:data-[state=active]:text-twitch-11 data-[state=active]:font-bold border-b-2 border-transparent transition-all duration-300 ease-in-out data-[state=active]:border-primary-500 outline-none cursor-default"
      value={value}
      disabled={disabled}
    >
      {name}
    </Tab.Trigger>
  );
};

const TabContent: React.FC<{ value: string; content: React.ReactNode }> = ({
  value,
  content,
}) => (
  <Tab.Content className="grow rounded-b-md" value={value}>
    {content}
  </Tab.Content>
);

const Tabs: React.FC<TabsProps> = ({ tabData, onValueChange }) => {
  const [currentValue, setCurrentValue] = useState(tabData[0]?.value);

  const handleValueChange = async (value: string) => {
    setCurrentValue(value);
    await storage.set("currentTabValue", value);
  };

  return (
    <Tab.Root
      className="flex flex-col w-full gap-3 dark:bg-background"
      defaultValue={tabData[0]?.value}
      value={currentValue}
      onValueChange={handleValueChange}
    >
      <Tab.List
        className="shrink-0 flex border-b border-helper-outline"
        aria-label="Sections"
      >
        {tabData.map((tab) => (
          <TabTrigger
            name={tab.name}
            value={tab.value}
            key={tab.value}
            disabled={tab?.disabled || false}
          />
        ))}
      </Tab.List>
      {tabData.map((tab) => (
        <TabContent value={tab.value} content={tab.content} key={tab.value} />
      ))}
    </Tab.Root>
  );
};

export default Tabs;
