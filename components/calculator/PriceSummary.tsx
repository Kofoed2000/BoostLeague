import Image from "next/image";

import { rocketLeagueRanks } from "@/data/rocketLeagueRanks";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

type PriceSummaryProps = {
  currentRank: string;
  desiredRank: string;
  platform: string;
  gameMode: string;
  price: number;
};

export default function PriceSummary({
  currentRank,
  desiredRank,
  platform,
  gameMode,
  price,
}: PriceSummaryProps) {
  const animatedPrice = useAnimatedNumber(price);

  const current = rocketLeagueRanks.find(
    (rank) => rank.display === currentRank
  );

  const desired = rocketLeagueRanks.find(
    (rank) => rank.display === desiredRank
  );

  return (
    <div className="rounded-3xl border border-zinc-700 bg-zinc-800/70 p-8 backdrop-blur">

      <h3 className="text-3xl font-bold">
        Order Summary
      </h3>

      <div className="mt-8 space-y-6">

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

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-zinc-900 p-4">

            <p className="text-sm text-gray-500">
              Platform
            </p>

            <p className="mt-2 font-semibold">
              {platform}
            </p>

          </div>

          <div className="rounded-xl bg-zinc-900 p-4">

            <p className="text-sm text-gray-500">
              Game Mode
            </p>

            <p className="mt-2 font-semibold">
              {gameMode}
            </p>

          </div>

        </div>

      </div>

      <div className="mt-10 border-t border-zinc-700 pt-8">

        <p className="text-sm uppercase tracking-widest text-gray-500">
          Total Price
        </p>

        <p className="mt-3 text-5xl font-extrabold tracking-tight text-blue-500 transition-all duration-200">
          €{animatedPrice.toFixed(2)}
        </p>

        <button
          className="
            mt-8
            w-full
            rounded-2xl
            bg-blue-600
            py-4
            text-lg
            font-bold
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:bg-blue-500
            active:scale-[0.99]
          "
        >
          Order Now
        </button>

      </div>

    </div>
  );
}