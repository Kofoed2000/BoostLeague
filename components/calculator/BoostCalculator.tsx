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
import { rankHierarchy } from "@/data/rankHierarchy";

import {
  calculatePrice,
  getRankById,
} from "@/lib/rocketLeague";

type ServiceType =
  | "rank-boost"
  | "reward-wins"
  | "tournament-wins"
  | "placement-boost";

/*
 * -----------------------------------------
 * REWARD WIN PRICES
 * -----------------------------------------
 */

const rewardPrices: Record<string, number> = {
  Bronze: 2,
  Silver: 2.5,
  Gold: 3,
  Platinum: 3.5,
  Diamond: 4,
  Champion: 5,
  "Grand Champion": 7,
  "Supersonic Legend": 10,
};

/*
 * -----------------------------------------
 * TOURNAMENT WIN PRICES
 * -----------------------------------------
 */

const tournamentPrices: Record<string, number> = {
  Bronze: 10,
  Silver: 15,
  Gold: 20,
  Platinum: 27.5,
  Diamond: 40,
  Champion: 55,
  "Grand Champion": 70,
  "Supersonic Legend": 95,
};

/*
 * -----------------------------------------
 * PLACEMENT BOOST PRICES
 *
 * Prices below are for all 10 placement
 * matches.
 *
 * There is NO quantity discount.
 *
 * Example:
 * Grand Champion III = €65 / 10
 * 5 matches = €32.50
 * 10 matches = €65.00
 * -----------------------------------------
 */

const placementPrices: Record<string, number> = {
  "Bronze I": 10,
  "Bronze II": 11,
  "Bronze III": 12,

  "Silver I": 14,
  "Silver II": 16,
  "Silver III": 18,

  "Gold I": 20,
  "Gold II": 22,
  "Gold III": 24,

  "Platinum I": 27,
  "Platinum II": 30,
  "Platinum III": 33,

  "Diamond I": 36,
  "Diamond II": 39,
  "Diamond III": 42,

  "Champion I": 46,
  "Champion II": 50,
  "Champion III": 54,

  "Grand Champion I": 58,
  "Grand Champion II": 62,
  "Grand Champion III": 65,

  "Supersonic Legend": 77,
};

export default function BoostCalculator() {
  const [serviceType, setServiceType] =
    useState<ServiceType>("rank-boost");

  const [calculator, setCalculator] = useState({
    currentRankId: 0,
    desiredRankId: 8,

    rewardRank: "Bronze",
    rewardWins: 1,

    tournamentRank: "Bronze",
    tournamentWins: 1,

    placementRank: "Bronze I",
    placementMatches: 1,

    gameMode: gameModes[0],
    platform: platforms[0],

    selectedExtras: [] as string[],
  });

  const currentRank = getRankById(
    calculator.currentRankId
  );

  const desiredRank = getRankById(
    calculator.desiredRankId
  );

  const selectedRewardRank = rankHierarchy.find(
    (rank) => rank.name === calculator.rewardRank
  );

  const selectedTournamentRank = rankHierarchy.find(
    (rank) =>
      rank.name === calculator.tournamentRank
  );

  const selectedPlacementRank = rankHierarchy.find(
    (rank) =>
      rank.name === calculator.placementRank
  );

  /*
   * -----------------------------------------
   * RANK BOOST PRICE
   * -----------------------------------------
   */

  const rankBoostBasePrice = calculatePrice(
    calculator.currentRankId,
    calculator.desiredRankId
  );

  /*
   * -----------------------------------------
   * REWARD WINS PRICE
   * -----------------------------------------
   */

  const rewardPricePerWin =
    rewardPrices[calculator.rewardRank] ?? 2;

  const rewardWinsBasePrice =
    rewardPricePerWin * calculator.rewardWins;

  /*
   * -----------------------------------------
   * TOURNAMENT WINS PRICE
   * -----------------------------------------
   */

  const tournamentPricePerWin =
    tournamentPrices[
      calculator.tournamentRank
    ] ?? 10;

  const tournamentWinsBasePrice =
    tournamentPricePerWin *
    calculator.tournamentWins;

  /*
   * -----------------------------------------
   * PLACEMENT BOOST PRICE
   *
   * placementPrices contains the price for
   * all 10 matches.
   *
   * Therefore:
   *
   * price / 10 * selected matches
   *
   * -----------------------------------------
   */

  const placementBasePrice =
    (placementPrices[
      calculator.placementRank
    ] ?? 10) /
    10 *
    calculator.placementMatches;

  /*
   * -----------------------------------------
   * GAME MODE / EXTRAS
   *
   * Tournament Wins does NOT use either.
   * -----------------------------------------
   */

  const multiplier =
    serviceType === "tournament-wins"
      ? 1
      : calculator.gameMode.priceMultiplier *
        calculator.selectedExtras.reduce(
          (total, id) => {
            const extra = extras.find(
              (extra) => extra.id === id
            );

            if (!extra) {
              return total;
            }

            return (
              total * extra.priceMultiplier
            );
          },
          1
        );

  /*
   * -----------------------------------------
   * BASE PRICE
   * -----------------------------------------
   */

  let basePrice = rankBoostBasePrice;

  if (serviceType === "reward-wins") {
    basePrice = rewardWinsBasePrice;
  }

  if (serviceType === "tournament-wins") {
    basePrice = tournamentWinsBasePrice;
  }

  if (serviceType === "placement-boost") {
    basePrice = placementBasePrice;
  }

  /*
   * -----------------------------------------
   * FINAL PRICE
   * -----------------------------------------
   */

  const totalPrice =
    basePrice * multiplier;

  /*
   * -----------------------------------------
   * EXTRA TOGGLE
   * -----------------------------------------
   */

  function toggleExtra(id: string) {
    setCalculator((prev) => ({
      ...prev,

      selectedExtras:
        prev.selectedExtras.includes(id)
          ? prev.selectedExtras.filter(
              (extra) => extra !== id
            )
          : [
              ...prev.selectedExtras,
              id,
            ],
    }));
  }

  /*
   * -----------------------------------------
   * SERVICE CHANGE
   * -----------------------------------------
   */

  function changeService(
    service: ServiceType
  ) {
    setServiceType(service);

    /*
     * Tournament Wins does not use extras.
     * Clear them when switching to Tournament.
     */
    if (service === "tournament-wins") {
      setCalculator((prev) => ({
        ...prev,
        selectedExtras: [],
      }));
    }
  }

  return (
    <section
      id="calculator"
      className="relative overflow-hidden px-6 py-28"
    >
      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-12 text-center">

          <h2 className="text-5xl font-bold">
            Boost Calculator
          </h2>

          <p className="mt-5 text-lg text-gray-400">
            Choose your boosting service and
            calculate your price.
          </p>

        </div>

        {/* Service Selector */}

        <div className="mx-auto mb-10 grid max-w-6xl gap-3 md:grid-cols-4">

          {/* Rank Boost */}

          <button
            type="button"
            onClick={() =>
              changeService("rank-boost")
            }
            className={`
              rounded-2xl
              border
              px-5
              py-4
              text-left
              transition-all
              duration-300

              ${
                serviceType === "rank-boost"
                  ? "border-blue-500 bg-blue-500/10 text-white"
                  : "border-zinc-800 bg-zinc-900/70 text-gray-400 hover:border-zinc-600 hover:text-white"
              }
            `}
          >
            <p className="font-bold">
              Rank Boost
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Reach your desired rank
            </p>
          </button>

          {/* Reward Wins */}

          <button
            type="button"
            onClick={() =>
              changeService("reward-wins")
            }
            className={`
              rounded-2xl
              border
              px-5
              py-4
              text-left
              transition-all
              duration-300

              ${
                serviceType === "reward-wins"
                  ? "border-blue-500 bg-blue-500/10 text-white"
                  : "border-zinc-800 bg-zinc-900/70 text-gray-400 hover:border-zinc-600 hover:text-white"
              }
            `}
          >
            <p className="font-bold">
              Reward Wins
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Earn your season rewards
            </p>
          </button>

          {/* Tournament Wins */}

          <button
            type="button"
            onClick={() =>
              changeService("tournament-wins")
            }
            className={`
              rounded-2xl
              border
              px-5
              py-4
              text-left
              transition-all
              duration-300

              ${
                serviceType === "tournament-wins"
                  ? "border-blue-500 bg-blue-500/10 text-white"
                  : "border-zinc-800 bg-zinc-900/70 text-gray-400 hover:border-zinc-600 hover:text-white"
              }
            `}
          >
            <p className="font-bold">
              Tournament Wins
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Win tournament titles
            </p>
          </button>

          {/* Placement Boost */}

          <button
            type="button"
            onClick={() =>
              changeService("placement-boost")
            }
            className={`
              rounded-2xl
              border
              px-5
              py-4
              text-left
              transition-all
              duration-300

              ${
                serviceType === "placement-boost"
                  ? "border-blue-500 bg-blue-500/10 text-white"
                  : "border-zinc-800 bg-zinc-900/70 text-gray-400 hover:border-zinc-600 hover:text-white"
              }
            `}
          >
            <p className="font-bold">
              Placement Boost
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Get your placement matches played
            </p>
          </button>

        </div>

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">

          {/* Left Side */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">

            <div className="space-y-8">

              {/* -------------------------------- */}
              {/* RANK BOOST */}
              {/* -------------------------------- */}

              {serviceType === "rank-boost" && (
                <>

                  <div>

                    <label className="mb-3 block text-lg font-semibold">
                      Current Rank
                    </label>

                    <RankPicker
                      value={
                        calculator.currentRankId
                      }
                      onChange={(value) =>
                        setCalculator(
                          (prev) => ({
                            ...prev,
                            currentRankId:
                              value,
                          })
                        )
                      }
                    />

                  </div>

                  <div>

                    <label className="mb-3 block text-lg font-semibold">
                      Desired Rank
                    </label>

                    <RankPicker
                      value={
                        calculator.desiredRankId
                      }
                      onChange={(value) =>
                        setCalculator(
                          (prev) => ({
                            ...prev,
                            desiredRankId:
                              value,
                          })
                        )
                      }
                    />

                  </div>

                </>
              )}

              {/* -------------------------------- */}
              {/* REWARD WINS */}
              {/* -------------------------------- */}

              {serviceType === "reward-wins" && (
                <>

                  <div>

                    <label className="mb-3 block text-lg font-semibold">
                      Current Reward Rank
                    </label>

                    <div className="relative">

                      <select
                        value={
                          calculator.rewardRank
                        }
                        onChange={(event) =>
                          setCalculator(
                            (prev) => ({
                              ...prev,
                              rewardRank:
                                event.target.value,
                            })
                          )
                        }
                        className="
                          w-full
                          appearance-none
                          rounded-2xl
                          border
                          border-zinc-700
                          bg-zinc-900
                          px-5
                          py-4
                          pr-12
                          text-white
                          outline-none
                          transition
                          focus:border-blue-500
                        "
                      >

                        {rankHierarchy.map(
                          (rank) => (
                            <option
                              key={rank.name}
                              value={rank.name}
                            >
                              {rank.name}
                            </option>
                          )
                        )}

                      </select>

                      <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                        ▼
                      </span>

                    </div>

                  </div>

                  <div>

                    <label className="mb-3 block text-lg font-semibold">
                      Rewards
                    </label>

                    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">

                      <div className="flex items-center justify-between">

                        <span className="text-gray-400">
                          Number of wins
                        </span>

                        <span className="text-xl font-bold text-blue-500">
                          {calculator.rewardWins}
                        </span>

                      </div>

                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={
                          calculator.rewardWins
                        }
                        onChange={(event) =>
                          setCalculator(
                            (prev) => ({
                              ...prev,
                              rewardWins:
                                Number(
                                  event.target
                                    .value
                                ),
                            })
                          )
                        }
                        className="mt-5 w-full accent-blue-600"
                      />

                      <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>1</span>
                        <span>10</span>
                      </div>

                    </div>

                  </div>

                </>
              )}

              {/* -------------------------------- */}
              {/* TOURNAMENT WINS */}
              {/* -------------------------------- */}

              {serviceType === "tournament-wins" && (
                <>

                  <div>

                    <label className="mb-3 block text-lg font-semibold">
                      Tournament Rank
                    </label>

                    <div className="relative">

                      <select
                        value={
                          calculator.tournamentRank
                        }
                        onChange={(event) =>
                          setCalculator(
                            (prev) => ({
                              ...prev,
                              tournamentRank:
                                event.target.value,
                            })
                          )
                        }
                        className="
                          w-full
                          appearance-none
                          rounded-2xl
                          border
                          border-zinc-700
                          bg-zinc-900
                          px-5
                          py-4
                          pr-12
                          text-white
                          outline-none
                          transition
                          focus:border-blue-500
                        "
                      >

                        {rankHierarchy.map(
                          (rank) => (
                            <option
                              key={rank.name}
                              value={rank.name}
                            >
                              {rank.name}
                            </option>
                          )
                        )}

                      </select>

                      <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                        ▼
                      </span>

                    </div>

                  </div>

                  <div>

                    <label className="mb-3 block text-lg font-semibold">
                      Tournament Wins
                    </label>

                    <div className="grid grid-cols-3 gap-3">

                      {[1, 2, 3].map(
                        (wins) => (
                          <button
                            key={wins}
                            type="button"
                            onClick={() =>
                              setCalculator(
                                (prev) => ({
                                  ...prev,
                                  tournamentWins:
                                    wins,
                                })
                              )
                            }
                            className={`
                              rounded-2xl
                              border
                              py-4
                              text-lg
                              font-bold
                              transition-all

                              ${
                                calculator.tournamentWins ===
                                wins
                                  ? "border-blue-500 bg-blue-600 text-white"
                                  : "border-zinc-700 bg-zinc-900 text-gray-400 hover:border-zinc-500 hover:text-white"
                              }
                            `}
                          >
                            {wins} Win
                            {wins > 1
                              ? "s"
                              : ""}
                          </button>
                        )
                      )}

                    </div>

                  </div>

                </>
              )}

              {/* -------------------------------- */}
              {/* PLACEMENT BOOST */}
              {/* -------------------------------- */}

              {serviceType === "placement-boost" && (
                <>

                  <div>

                    <label className="mb-3 block text-lg font-semibold">
                      Previous Rank
                    </label>

                    <div className="relative">

                      <select
                        value={
                          calculator.placementRank
                        }
                        onChange={(event) =>
                          setCalculator(
                            (prev) => ({
                              ...prev,
                              placementRank:
                                event.target.value,
                            })
                          )
                        }
                        className="
                          w-full
                          appearance-none
                          rounded-2xl
                          border
                          border-zinc-700
                          bg-zinc-900
                          px-5
                          py-4
                          pr-12
                          text-white
                          outline-none
                          transition
                          focus:border-blue-500
                        "
                      >

                        {rankHierarchy.map(
                          (rank) => (
                            <option
                              key={rank.name}
                              value={rank.name}
                            >
                              {rank.name}
                            </option>
                          )
                        )}

                      </select>

                      <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                        ▼
                      </span>

                    </div>

                  </div>

                  <div>

                    <label className="mb-3 block text-lg font-semibold">
                      Placement Matches
                    </label>

                    <div className="grid grid-cols-5 gap-3">

                      {[
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                      ].map((matches) => (
                        <button
                          key={matches}
                          type="button"
                          onClick={() =>
                            setCalculator(
                              (prev) => ({
                                ...prev,
                                placementMatches:
                                  matches,
                              })
                            )
                          }
                          className={`
                            rounded-2xl
                            border
                            py-4
                            text-lg
                            font-bold
                            transition-all

                            ${
                              calculator.placementMatches ===
                              matches
                                ? "border-blue-500 bg-blue-600 text-white"
                                : "border-zinc-700 bg-zinc-900 text-gray-400 hover:border-zinc-500 hover:text-white"
                            }
                          `}
                        >
                          {matches}
                        </button>
                      ))}

                    </div>

                  </div>

                </>
              )}

              {/* -------------------------------- */}
              {/* GAME MODE */}
              {/* -------------------------------- */}

              {serviceType !== "tournament-wins" && (
                <div>

                  <label className="mb-3 block text-lg font-semibold">
                    Game Mode
                  </label>

                  <GameModePicker
                    value={
                      calculator.gameMode
                    }
                    onChange={(value) =>
                      setCalculator(
                        (prev) => ({
                          ...prev,
                          gameMode: value,
                        })
                      )
                    }
                  />

                </div>
              )}

              {/* -------------------------------- */}
              {/* PLATFORM */}
              {/* -------------------------------- */}

              <div>

                <label className="mb-3 block text-lg font-semibold">
                  Platform
                </label>

                <PlatformPicker
                  value={
                    calculator.platform
                  }
                  onChange={(value) =>
                    setCalculator(
                      (prev) => ({
                        ...prev,
                        platform: value,
                      })
                    )
                  }
                />

              </div>

              {/* -------------------------------- */}
              {/* EXTRAS */}
              {/* -------------------------------- */}

              {serviceType !== "tournament-wins" && (
                <ExtrasSelect
                  selectedExtras={
                    calculator.selectedExtras
                  }
                  onToggle={toggleExtra}
                />
              )}

            </div>

          </div>

          {/* Right Side */}

          <div className="sticky top-8 h-fit">

            <PriceSummary
              serviceType={serviceType}

              currentRank={
                currentRank.display
              }
              desiredRank={
                desiredRank.display
              }

              currentRankId={
                calculator.currentRankId
              }
              desiredRankId={
                calculator.desiredRankId
              }

              rewardRank={
                calculator.rewardRank
              }
              rewardWins={
                calculator.rewardWins
              }
              rewardRankIcon={
                selectedRewardRank?.icon ?? ""
              }

              tournamentRank={
                calculator.tournamentRank
              }
              tournamentWins={
                calculator.tournamentWins
              }
              tournamentRankIcon={
                selectedTournamentRank?.icon ?? ""
              }

              placementRank={
                calculator.placementRank
              }
              placementMatches={
                calculator.placementMatches
              }

              platform={
                calculator.platform.name
              }
              gameMode={
                calculator.gameMode.name
              }

              selectedExtras={
                calculator.selectedExtras
              }

              price={totalPrice}
            />

          </div>

        </div>

      </div>

    </section>
  );
}