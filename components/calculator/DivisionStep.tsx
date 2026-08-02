"use client";

type DivisionStepProps = {
  onBack: () => void;
  onSelect: (division: string) => void;
};

const divisions = [
  "Division I",
  "Division II",
  "Division III",
  "Division IV",
];

export default function DivisionStep({
  onBack,
  onSelect,
}: DivisionStepProps) {
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

        {divisions.map((division) => (

          <button
            key={division}
            type="button"
            onClick={() => onSelect(division)}
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
            <span className="text-lg font-semibold">
              {division}
            </span>

            <span className="text-gray-500 text-xl">
              ✓
            </span>

          </button>

        ))}

      </div>

    </div>
  );
}