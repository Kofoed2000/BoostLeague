"use client";

import Image from "next/image";
import { rankHierarchy } from "@/data/rankHierarchy";

type RewardRankPickerProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function RewardRankPicker({
    value,
    onChange,
}: RewardRankPickerProps) {
    const selectedRank =
        rankHierarchy.find(
            (rank) => rank.name === value
        ) ?? rankHierarchy[0];

    return (
        <div className="relative">

            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="
          w-full
          appearance-none
          rounded-2xl
          border
          border-zinc-700
          bg-zinc-900
          py-4
          pl-16
          pr-12
          text-white
          outline-none
          transition
          focus:border-blue-500
        "
            >
                {rankHierarchy.map((rank) => (
                    <option
                        key={rank.name}
                        value={rank.name}
                    >
                        {rank.name}
                    </option>
                ))}
            </select>

            <div className="pointer-events-none absolute left-5 top-1/2 flex -translate-y-1/2 items-center gap-3">

                <Image
                    src={selectedRank.icon}
                    alt={selectedRank.name}
                    width={36}
                    height={36}
                />

            </div>

            <div className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2">
                {selectedRank.name}
            </div>

            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                ▼
            </span>

        </div>
    );
}