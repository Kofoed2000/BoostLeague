"use client";

import { gameModes } from "@/data/gameModes";

type GameModeStepProps = {
  onSelect: (id: string) => void;
};

export default function GameModeStep({
  onSelect,
}: GameModeStepProps) {
  return (
    <div className="space-y-3">
      {gameModes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => onSelect(mode.id)}
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-5
            transition-all
            duration-200
            hover:border-blue-500
            hover:bg-zinc-800
          "
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">
              {mode.icon}
            </span>

            <div className="text-left">
              <p className="font-semibold">
                {mode.name}
              </p>

              <p className="text-sm text-gray-400">
                {mode.description}
              </p>
            </div>
          </div>

          <span className="text-gray-500 text-xl">
            →
          </span>
        </button>
      ))}
    </div>
  );
}