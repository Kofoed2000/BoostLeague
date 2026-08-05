"use client";

import Image from "next/image";
import { rankHierarchy } from "@/data/rankHierarchy";

type TierStepProps = {
  rankGroup: string;
  onBack: () => void;
  onSelect: (tier: string) => void;
};

export default function TierStep({
  rankGroup,
  onBack,
  onSelect,
}: TierStepProps) {
  const group = rankHierarchy.find(
    (rank) => rank.name === rankGroup
  );

  if (!group) return null;

  return (
    <div>

      <button
        type="button"
        onClick={onBack}
        className="
          mb-6
          flex
          items-center
          gap-2
          text-sm
          text-blue-400
          hover:text-blue-300
        "
      >
        ← Back
      </button>

      <div className="space-y-3">

        {group.tiers.map((tier) => (

          <button
            key={tier}
            type="button"
            onClick={() => onSelect(tier)}
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
                src={group.icon}
                alt={tier}
                width={46}
                height={46}
              />

              <span className="text-lg font-semibold">
                {tier}
              </span>

            </div>

            <span className="text-gray-500 text-xl">
              →
            </span>

          </button>

        ))}

      </div>

    </div>
  );
}