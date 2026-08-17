"use client";

import Image from "next/image";
import { rankHierarchy } from "@/data/rankHierarchy";

type RankStepProps = {
  onSelect: (rank: string) => void;
  availableRankNames?: string[];
};

export default function RankStep({
  onSelect,
  availableRankNames,
}: RankStepProps) {
  const ranksToShow =
    availableRankNames
      ? rankHierarchy.filter((rank) =>
          availableRankNames.includes(
            rank.name
          )
        )
      : rankHierarchy;

  return (
    <div className="space-y-3">
      {ranksToShow.map((rank) => (
        <button
          key={rank.name}
          type="button"
          onClick={() => onSelect(rank.name)}
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
            <Image
              src={rank.icon}
              alt={rank.name}
              width={48}
              height={48}
            />

            <span className="text-lg font-semibold">
              {rank.name}
            </span>
          </div>

          <span className="text-gray-500 text-xl">
            →
          </span>
        </button>
      ))}
    </div>
  );
}