"use client";

import { useState } from "react";
import Image from "next/image";

import { rocketLeagueRanks } from "@/data/rocketLeagueRanks";

import RankModal from "./RankModal";

type RankPickerProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function RankPicker({
  value,
  onChange,
}: RankPickerProps) {
  const [open, setOpen] = useState(false);

  const selectedRank =
    rocketLeagueRanks.find(
      (rank) => rank.id === value
    ) ?? rocketLeagueRanks[0];

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

          <Image
            src={selectedRank.icon}
            alt={selectedRank.display}
            width={46}
            height={46}
          />

          <div className="text-left">

            <p className="font-semibold">
              {selectedRank.rank}
            </p>

            {selectedRank.division && (
              <p className="text-sm text-gray-400">
                {selectedRank.division}
              </p>
            )}

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

      <RankModal
        open={open}
        value={value}
        onChange={onChange}
        onClose={() => setOpen(false)}
      />
    </>
  );
}