"use client";

import SelectionPicker, {
  SelectionItem,
} from "../ui/SelectionPicker";

import {
  Platform,
  platforms,
} from "@/data/platforms";

type PlatformPickerProps = {
  value: Platform;
  onChange: (value: Platform) => void;
};

export default function PlatformPicker({
  value,
  onChange,
}: PlatformPickerProps) {
  const items: SelectionItem[] = platforms.map(
    (platform) => ({
      id: platform.id,
      title: platform.name,
      icon: platform.icon,
    })
  );

  return (
    <SelectionPicker
      title="Choose Platform"
      value={{
        id: value.id,
        title: value.name,
        icon: value.icon,
      }}
      items={items}
      onChange={(item) => {
        const platform = platforms.find(
          (p) => p.id === item.id
        );

        if (!platform) return;

        onChange(platform);
      }}
    />
  );
}