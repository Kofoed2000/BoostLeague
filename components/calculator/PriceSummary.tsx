import Link from "next/link";
import Image from "next/image";

import { rocketLeagueRanks } from "@/data/rocketLeagueRanks";

type ServiceType =
  | "rank-boost"
  | "reward-wins"
  | "tournament-wins"
  | "placement-boost";

type PriceSummaryProps = {
  serviceType: ServiceType;

  currentRank: string;
  desiredRank: string;

  currentRankId: number;
  desiredRankId: number;

  rewardRank: string;
  rewardWins: number;
  rewardRankIcon: string;
  desiredRewardRank: string;
  desiredRewardRankIcon: string;

  tournamentRank: string;
  tournamentWins: number;
  tournamentRankIcon: string;

  placementRank: string;
  placementMatches: number;

  platform: string;
  gameMode: string;

  selectedExtras: string[];

  price: number;
};

export default function PriceSummary({
  serviceType,

  currentRank,
  desiredRank,

  currentRankId,
  desiredRankId,

  rewardRank,
  rewardWins,
  rewardRankIcon,
  desiredRewardRank,
  desiredRewardRankIcon,

  tournamentRank,
  tournamentWins,
  tournamentRankIcon,

  placementRank,
  placementMatches,

  platform,
  gameMode,

  selectedExtras,

  price,
}: PriceSummaryProps) {
  const current = rocketLeagueRanks.find(
    (rank) => rank.display === currentRank
  );

  const desired = rocketLeagueRanks.find(
    (rank) => rank.display === desiredRank
  );

  const placement = rocketLeagueRanks.find(
    (rank) => rank.display === placementRank
  );

  const params = new URLSearchParams({
    service: serviceType,

    current: currentRankId.toString(),
    desired: desiredRankId.toString(),

    rewardRank,
    rewardWins: rewardWins.toString(),

    tournamentRank,
    tournamentWins: tournamentWins.toString(),

    placementRank,
    placementMatches:
      placementMatches.toString(),

    platform,

    mode:
      serviceType === "tournament-wins"
        ? ""
        : gameMode,

    extras:
      serviceType === "tournament-wins"
        ? ""
        : selectedExtras.join(","),
  });

  const serviceTitle =
    serviceType === "rank-boost"
      ? "Rank Boost"
      : serviceType === "reward-wins"
        ? "Reward Wins"
        : serviceType === "tournament-wins"
          ? "Tournament Wins"
          : "Placement Boost";

  return (
    <div>

      <h3 className="text-3xl font-bold">
        Order Summary
      </h3>

      <p className="mt-2 text-gray-500">
        {serviceTitle}
      </p>

      <div className="mt-8 space-y-6">

        {/* -------------------------------- */}
        {/* RANK BOOST */}
        {/* -------------------------------- */}

        {serviceType === "rank-boost" && (
          <>

            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Current Rank
              </p>

              <div className="mt-4 flex items-center gap-4">

                {current && (
                  <Image
                    src={current.icon}
                    alt={current.display}
                    width={55}
                    height={55}
                  />
                )}

                <p className="text-lg font-semibold">
                  {currentRank}
                </p>

              </div>

            </div>

            <div className="flex justify-center text-3xl text-blue-500">
              ↓
            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Desired Rank
              </p>

              <div className="mt-4 flex items-center gap-4">

                {desired && (
                  <Image
                    src={desired.icon}
                    alt={desired.display}
                    width={55}
                    height={55}
                  />
                )}

                <p className="text-lg font-semibold">
                  {desiredRank}
                </p>

              </div>

            </div>

          </>
        )}

        {/* -------------------------------- */}
        {/* REWARD WINS */}
        {/* -------------------------------- */}

        {serviceType === "reward-wins" && (
          <>
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Current Reward Rank
              </p>

              <div className="mt-4 flex items-center gap-4">

                {rewardRankIcon && (
                  <Image
                    src={`/ranks/Season_reward_level_${rewardRank
                      .toLowerCase()
                      .replaceAll(" ", "_")}.webp`}
                    alt={rewardRank}
                    width={55}
                    height={55}
                  />
                )}

                <p className="text-lg font-semibold">
                  {rewardRank}
                </p>

              </div>

            </div>

            {desiredRewardRank && (
              <>
                <div className="flex justify-center text-3xl text-blue-500">
                  ↓
                </div>

                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">

                  <p className="text-sm uppercase tracking-wider text-gray-500">
                    Desired Reward Rank
                  </p>

                  <div className="mt-4 flex items-center gap-4">

                    {desiredRewardRankIcon && (
                      <Image
                        src={`/ranks/Season_reward_level_${desiredRewardRank
                          .toLowerCase()
                          .replaceAll(" ", "_")}.webp`}
                        alt={desiredRewardRank}
                        width={55}
                        height={55}
                      />
                    )}

                    <p className="text-lg font-semibold">
                      {desiredRewardRank}
                    </p>

                  </div>

                </div>
              </>
            )}

            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Rewards
              </p>

              <div className="mt-4 flex items-center justify-between">

                <p className="text-lg font-semibold">
                  {rewardWins} Win
                  {rewardWins !== 1 ? "s" : ""}
                </p>

                <p className="text-2xl font-bold text-blue-500">
                  {rewardWins}
                </p>

              </div>

            </div>

          </>
        )}

        {/* -------------------------------- */}
        {/* TOURNAMENT WINS */}
        {/* -------------------------------- */}

        {serviceType === "tournament-wins" && (
          <>

            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Tournament Rank
              </p>

              <div className="mt-4 flex items-center gap-4">

                {tournamentRankIcon && (
                  <Image
                    src={tournamentRankIcon}
                    alt={tournamentRank}
                    width={55}
                    height={55}
                  />
                )}

                <p className="text-lg font-semibold">
                  {tournamentRank}
                </p>

              </div>

            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Tournament Wins
              </p>

              <div className="mt-4 flex items-center justify-between">

                <p className="text-lg font-semibold">
                  {tournamentWins} Win
                  {tournamentWins !== 1
                    ? "s"
                    : ""}
                </p>

                <p className="text-2xl font-bold text-blue-500">
                  {tournamentWins}
                </p>

              </div>

            </div>

          </>
        )}

        {/* -------------------------------- */}
        {/* PLACEMENT BOOST */}
        {/* -------------------------------- */}

        {serviceType === "placement-boost" && (
          <>

            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Previous Rank
              </p>

              <div className="mt-4 flex items-center gap-4">

                {placement && (
                  <Image
                    src={placement.icon}
                    alt={placement.display}
                    width={55}
                    height={55}
                  />
                )}

                <p className="text-lg font-semibold">
                  {placementRank}
                </p>

              </div>

            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">

              <p className="text-sm uppercase tracking-wider text-gray-500">
                Placement Matches
              </p>

              <div className="mt-4 flex items-center justify-between">

                <p className="text-lg font-semibold">
                  {placementMatches} Match
                  {placementMatches !== 1
                    ? "es"
                    : ""}
                </p>

                <p className="text-2xl font-bold text-blue-500">
                  {placementMatches}
                </p>

              </div>

            </div>

          </>
        )}

        {/* -------------------------------- */}
        {/* PLATFORM / GAME MODE */}
        {/* -------------------------------- */}

        <div
          className={
            serviceType === "tournament-wins"
              ? "grid grid-cols-1 gap-4"
              : "grid grid-cols-2 gap-4"
          }
        >

          <div className="rounded-xl bg-zinc-900 p-4">

            <p className="text-sm text-gray-500">
              Platform
            </p>

            <p className="mt-2 font-semibold">
              {platform}
            </p>

          </div>

          {serviceType !== "tournament-wins" && (
            <div className="rounded-xl bg-zinc-900 p-4">

              <p className="text-sm text-gray-500">
                Game Mode
              </p>

              <p className="mt-2 font-semibold">
                {gameMode}
              </p>

            </div>
          )}

        </div>

      </div>

      {/* -------------------------------- */}
      {/* PRICE */}
      {/* -------------------------------- */}

      <div className="mt-10 border-t border-zinc-700 pt-8">

        <p className="text-gray-400">
          Total Price
        </p>

        <p className="mt-3 text-5xl font-bold text-blue-500">
          €{price.toFixed(2)}
        </p>

        <Link
          href={`/checkout?${params.toString()}`}
          className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-blue-600
            py-4
            text-lg
            font-bold
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:bg-blue-500
          "
        >
          Order Now
        </Link>

      </div>

    </div>
  );
}