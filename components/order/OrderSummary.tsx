import Image from "next/image";
import { rocketLeagueRanks } from "@/data/rocketLeagueRanks";

type OrderSummaryProps = {
  serviceType: string;

  currentRank: string;
  desiredRank: string;

  rewardRank: string;
  rewardWins: number;

  tournamentRank: string;
  tournamentWins: number;

  placementRank: string;
  placementMatches: number;

  platform: string;
  gameMode: string;

  selectedExtras: string[];
  price: number;
};

export default function OrderSummary({
  serviceType,

  currentRank,
  desiredRank,

  rewardRank,
  rewardWins,

  tournamentRank,
  tournamentWins,

  placementRank,
  placementMatches,

  platform,
  gameMode,

  selectedExtras,
  price,
}: OrderSummaryProps) {
  const current = rocketLeagueRanks.find(
    (rank) => rank.display === currentRank
  );

  const desired = rocketLeagueRanks.find(
    (rank) => rank.display === desiredRank
  );

  return (
    <>
      <h3 className="text-3xl font-bold">
        Order Summary
      </h3>

      <div className="mt-8 space-y-6">

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

        {serviceType === "reward-wins" && (
          <>
            <div className="rounded-xl bg-zinc-900 p-5">
              <p className="text-gray-500 text-sm">
                Reward Rank
              </p>

              <p className="mt-2 text-lg font-semibold">
                {rewardRank}
              </p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-5">
              <p className="text-gray-500 text-sm">
                Reward Wins
              </p>

              <p className="mt-2 text-lg font-semibold">
                {rewardWins} Wins
              </p>
            </div>
          </>
        )}

        {serviceType === "tournament-wins" && (
          <>
            <div className="rounded-xl bg-zinc-900 p-5">
              <p className="text-gray-500 text-sm">
                Tournament Rank
              </p>

              <p className="mt-2 text-lg font-semibold">
                {tournamentRank}
              </p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-5">
              <p className="text-gray-500 text-sm">
                Tournament Wins
              </p>

              <p className="mt-2 text-lg font-semibold">
                {tournamentWins} Wins
              </p>
            </div>
          </>
        )}

        {serviceType === "placement-boost" && (
          <>
            <div className="rounded-xl bg-zinc-900 p-5">
              <p className="text-gray-500 text-sm">
                Previous Season Rank
              </p>

              <p className="mt-2 text-lg font-semibold">
                {placementRank}
              </p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-5">
              <p className="text-gray-500 text-sm">
                Placement Matches
              </p>

              <p className="mt-2 text-lg font-semibold">
                {placementMatches} Matches
              </p>
            </div>
          </>
        )}

        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-gray-500 text-sm">
            Platform
          </p>

          <p className="mt-2 font-semibold">
            {platform}
          </p>
        </div>

        {serviceType !== "tournament-wins" && (
          <div className="rounded-xl bg-zinc-900 p-4">
            <p className="text-gray-500 text-sm">
              Game Mode
            </p>

            <p className="mt-2 font-semibold">
              {gameMode}
            </p>
          </div>
        )}

        <div className="rounded-xl bg-zinc-900 p-4">
          <p className="text-gray-500 text-sm">
            Extras
          </p>

          {selectedExtras.length === 0 ? (
            <p className="mt-2 font-semibold">
              None
            </p>
          ) : (
            <ul className="mt-2 space-y-1">
              {selectedExtras.map((extra) => (
                <li key={extra}>
                  • {extra}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      <div className="mt-10 border-t border-zinc-700 pt-8">
        <p className="text-gray-400">
          Total Price
        </p>

        <p className="mt-3 text-5xl font-bold text-blue-500">
          €{price.toFixed(2)}
        </p>
      </div>
    </>
  );
}