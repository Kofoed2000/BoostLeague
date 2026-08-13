"use client";

type BoostingService = "rankBoost" | "rewardWins" | "tournamentWins";

type BoostingServicePickerProps = {
  value: BoostingService;
  onChange: (value: BoostingService) => void;
};

const services = [
  {
    id: "rankBoost" as const,
    title: "Rank Boost",
    description: "Increase your Rocket League rank.",
    icon: "🏆",
  },
  {
    id: "rewardWins" as const,
    title: "Reward Wins",
    description: "Get the wins you need for your season rewards.",
    icon: "🎁",
  },
  {
    id: "tournamentWins" as const,
    title: "Tournament Wins",
    description: "Win Rocket League tournaments.",
    icon: "🥇",
  },
];

export default function BoostingServicePicker({
  value,
  onChange,
}: BoostingServicePickerProps) {
  return (
    <div>
      <label className="mb-3 block text-lg font-semibold">
        Boosting Service
      </label>

      <div className="grid gap-3">
        {services.map((service) => {
          const selected = value === service.id;

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onChange(service.id)}
              className={`
                flex w-full items-center gap-4 rounded-2xl border p-4
                text-left transition-all duration-200
                ${
                  selected
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                }
              `}
            >
              <div
                className={`
                  flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-xl text-2xl
                  ${selected ? "bg-blue-500/20" : "bg-zinc-800"}
                `}
              >
                {service.icon}
              </div>

              <div className="flex-1">
                <p className="font-semibold">{service.title}</p>

                <p className="mt-1 text-sm text-gray-400">
                  {service.description}
                </p>
              </div>

              <div
                className={`
                  flex h-5 w-5 items-center justify-center rounded-full border
                  ${
                    selected
                      ? "border-blue-500 bg-blue-500"
                      : "border-zinc-600"
                  }
                `}
              >
                {selected && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}