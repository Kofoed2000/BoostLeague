"use client";

import SelectionPicker, {
  SelectionItem,
} from "../ui/SelectionPicker";

import {
  GameMode,
  gameModes,
} from "@/data/gameModes";

type GameModePickerProps = {
  value: GameMode;
  onChange: (value: GameMode) => void;
};

export default function GameModePicker({
  value,
  onChange,
}: GameModePickerProps) {
  const items: SelectionItem[] = gameModes.map(
    (mode) => ({
      id: mode.id,
      title: mode.name,
      subtitle: mode.description,
      icon: mode.icon,
    })
  );

  return (
    <SelectionPicker
      title="Choose Game Mode"
      value={{
        id: value.id,
        title: value.name,
        subtitle: value.description,
        icon: value.icon,
      }}
      items={items}
      onChange={(item) => {
        const mode = gameModes.find(
          (m) => m.id === item.id
        );

        if (!mode) return;

        onChange(mode);
      }}
    />
  );
}