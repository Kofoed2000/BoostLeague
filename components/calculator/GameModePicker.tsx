"use client";

import { useState } from "react";

import { GameMode, gameModes } from "@/data/gameModes";

import SelectionModal from "../ui/SelectionModal";
import GameModeStep from "./GameModeStep";

type GameModePickerProps = {
  value: GameMode;
  onChange: (value: GameMode) => void;
};

export default function GameModePicker({
  value,
  onChange,
}: GameModePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-zinc-700
          bg-zinc-900
          px-5
          py-4
          transition-all
          duration-300
          hover:border-blue-500
        "
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">
            {value.icon}
          </span>

          <div className="text-left">
            <p className="font-semibold">
              {value.name}
            </p>

            <p className="text-sm text-gray-400">
              {value.description}
            </p>
          </div>
        </div>

        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <SelectionModal
        open={open}
        title="Choose Game Mode"
        onClose={() => setOpen(false)}
      >
        <div className="space-y-3">
          {gameModes.map((mode) => {
            const selected = mode.id === value.id;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  onChange(mode);
                  setOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  p-5
                  transition-all
                  duration-200

                  ${
                    selected
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-zinc-800 bg-zinc-900 hover:border-blue-500 hover:bg-zinc-800"
                  }
                `}
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

                {selected ? (
                  <span className="text-2xl text-blue-500">
                    ✓
                  </span>
                ) : (
                  <span className="text-xl text-gray-500">
                    →
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </SelectionModal>
    </>
  );
}