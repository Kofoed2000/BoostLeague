import { Extra, extras } from "@/data/extras";

type ExtrasSelectProps = {
  selectedExtras: string[];
  onToggle: (id: string) => void;
  gameMode: string;
};

export default function ExtrasSelect({
  selectedExtras,
  onToggle,
  gameMode,
}: ExtrasSelectProps) {
  const visibleExtras = extras.filter(
    (extra) => {
      if (
        gameMode === "1v1 Duel" &&
        extra.id === "play-with-booster"
      ) {
        return false;
      }

      return true;
    }
  );

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">
        Extras
      </h3>

      <div className="space-y-4">
        {visibleExtras.map(
          (extra: Extra) => {
            const selected =
              selectedExtras.includes(
                extra.id
              );

            return (
              <button
                key={extra.id}
                type="button"
                onClick={() =>
                  onToggle(extra.id)
                }
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selected
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-zinc-700 bg-zinc-800 hover:border-zinc-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">
                      {extra.title}
                    </h4>

                    <p className="mt-1 text-sm text-gray-400">
                      {
                        extra.description
                      }
                    </p>
                  </div>

                  <p className="font-bold text-blue-400">
                    +
                    {Math.round(
                      (extra.priceMultiplier -
                        1) *
                        100
                    )}
                    %
                  </p>
                </div>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}