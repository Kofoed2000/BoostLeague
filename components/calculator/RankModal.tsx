"use client";

import { useState } from "react";

import { rocketLeagueRanks } from "@/data/rocketLeagueRanks";
import { rankHierarchy } from "@/data/rankHierarchy";
import RankStep from "./RankStep";
import TierStep from "./TierStep";
import DivisionStep from "./DivisionStep";

type Step = "rank" | "tier" | "division";

type RankModalProps = {
  open: boolean;
  value: number;
  onChange: (value: number) => void;
  onClose: () => void;
  minimumRankId?: number;
};

export default function RankModal({
  open,
  value,
  onChange,
  onClose,
  minimumRankId,
}: RankModalProps) {
  const [step, setStep] = useState<Step>("rank");

  const [selectedRankGroup, setSelectedRankGroup] =
    useState("");

  const [selectedTier, setSelectedTier] =
    useState("");

  const availableRanks =
  minimumRankId === undefined
    ? rocketLeagueRanks
    : rocketLeagueRanks.filter(
        (rank) =>
          rank.id > minimumRankId
      );

  const availableRankNames =
  rankHierarchy
    .filter((group) =>
      availableRanks.some((rank) =>
        rank.rank.startsWith(group.name)
      )
    )
    .map((group) => group.name);

  function closeModal() {
    setStep("rank");
    setSelectedRankGroup("");
    setSelectedTier("");

    onClose();
  }

  function handleDivisionSelect(
    division: string
  ) {
    const rank = availableRanks.find(
      (rank) =>
        rank.rank === selectedTier &&
        rank.division === division
    );

    if (!rank) return;

    onChange(rank.id);

    closeModal();
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-xl -translate-x-1/2 -translate-y-1/2">

        <div className="rounded-3xl border border-zinc-700 bg-zinc-900 shadow-2xl">

          {/* Header */}

          <div className="border-b border-zinc-800 p-6">

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-2xl font-bold">

                {step === "rank" && "Choose Rank"}

                {step === "tier" && "Choose Tier"}

                {step === "division" &&
                  "Choose Division"}

              </h2>

              <button
                onClick={closeModal}
                className="text-3xl text-gray-400 hover:text-white"
              >
                ×
              </button>

            </div>

            {/* Progress */}

            <div className="flex gap-3">

              <div
                className={`h-2 flex-1 rounded-full ${
                  step === "rank"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              />

              <div
                className={`h-2 flex-1 rounded-full ${
                  step === "tier"
                    ? "bg-blue-500"
                    : step === "division"
                    ? "bg-green-500"
                    : "bg-zinc-700"
                }`}
              />

              <div
                className={`h-2 flex-1 rounded-full ${
                  step === "division"
                    ? "bg-blue-500"
                    : "bg-zinc-700"
                }`}
              />

            </div>

          </div>

          {/* Body */}

          <div className="max-h-[65vh] overflow-y-auto p-6">

            {step === "rank" && (
              <RankStep
                availableRankNames={
                  availableRankNames
                }
                onSelect={(rank) => {
                  setSelectedRankGroup(rank);
                  setStep("tier");
                }}
              />
            )}

            {step === "tier" && (
              <TierStep
                rankGroup={selectedRankGroup}
                onBack={() => setStep("rank")}
                onSelect={(tier) => {
                  setSelectedTier(tier);

                  if (
                    tier ===
                    "Supersonic Legend"
                  ) {
                    const ssl =
                      availableRanks.find(
                        (rank) =>
                          rank.rank ===
                          "Supersonic Legend"
                      );

                    if (ssl) {
                      onChange(ssl.id);
                    }

                    closeModal();

                    return;
                  }

                  setStep("division");
                }}
              />
            )}

            {step === "division" && (
              <DivisionStep
                onBack={() =>
                  setStep("tier")
                }
                onSelect={
                  handleDivisionSelect
                }
              />
            )}

          </div>

        </div>

      </div>

    </>
  );
}