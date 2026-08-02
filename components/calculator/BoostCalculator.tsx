"use client";

import { useState } from "react";

import RankPicker from "./RankPicker";
import PlatformPicker from "./PlatformPicker";
import GameModePicker from "./GameModePicker";
import ExtrasSelect from "./ExtrasSelect";
import PriceSummary from "./PriceSummary";

import { platforms } from "@/data/platforms";
import { gameModes } from "@/data/gameModes";
import { extras } from "@/data/extras";

import {
  calculatePrice,
  getRankById,
} from "@/lib/rocketLeague";

export default function BoostCalculator() {
  const [calculator, setCalculator] = useState({
    currentRankId: 0,
    desiredRankId: 8,
    gameMode: gameModes[0],
    platform: platforms[0],
    selectedExtras: [] as string[],
  });

  const currentRank = getRankById(calculator.currentRankId);
  const desiredRank = getRankById(calculator.desiredRankId);

  const basePrice = calculatePrice(
    calculator.currentRankId,
    calculator.desiredRankId
  );

  const multiplier =
    calculator.gameMode.priceMultiplier *
    calculator.selectedExtras.reduce((total, id) => {
      const extra = extras.find((e) => e.id === id);

      if (!extra) return total;

      return total * extra.priceMultiplier;
    }, 1);

  const totalPrice = basePrice * multiplier;

  function toggleExtra(id: string) {
    setCalculator((prev) => ({
      ...prev,
      selectedExtras: prev.selectedExtras.includes(id)
        ? prev.selectedExtras.filter((extra) => extra !== id)
        : [...prev.selectedExtras, id],
    }));
  }

  return (
    <section
      id="calculator"
      className="relative overflow-hidden px-6 py-28"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">

        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">
            Boost Calculator
          </h2>

          <p className="mt-5 text-lg text-gray-400">
            Calculate your Rocket League boost instantly.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">

          {/* Left Side */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">

            <div className="space-y-8">

              <div>
                <label className="mb-3 block text-lg font-semibold">
                  Current Rank
                </label>

                <RankPicker
                  value={calculator.currentRankId}
                  onChange={(value) =>
                    setCalculator({
                      ...calculator,
                      currentRankId: value,
                    })
                  }
                />
              </div>

              <div>
                <label className="mb-3 block text-lg font-semibold">
                  Desired Rank
                </label>

                <RankPicker
                  value={calculator.desiredRankId}
                  onChange={(value) =>
                    setCalculator({
                      ...calculator,
                      desiredRankId: value,
                    })
                  }
                />
              </div>

              <div>
                <label className="mb-3 block text-lg font-semibold">
                  Game Mode
                </label>

                <GameModePicker
                  value={calculator.gameMode}
                  onChange={(value) =>
                    setCalculator({
                      ...calculator,
                      gameMode: value,
                    })
                  }
                />
              </div>

              <div>
                <label className="mb-3 block text-lg font-semibold">
                  Platform
                </label>

                <PlatformPicker
                  value={calculator.platform}
                  onChange={(value) =>
                    setCalculator({
                      ...calculator,
                      platform: value,
                    })
                  }
                />
              </div>

              <ExtrasSelect
                selectedExtras={calculator.selectedExtras}
                onToggle={toggleExtra}
              />

            </div>

          </div>

          {/* Right Side */}

          <div className="sticky top-8 h-fit">

            <PriceSummary
              currentRank={currentRank.display}
              desiredRank={desiredRank.display}
              platform={calculator.platform.name}
              gameMode={calculator.gameMode.name}
              price={totalPrice}
            />

          </div>

        </div>

      </div>

    </section>
  );
}