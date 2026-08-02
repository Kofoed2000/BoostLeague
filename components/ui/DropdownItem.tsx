import Image from "next/image";

type DropdownItemProps = {
  icon: string;
  title: string;
  subtitle?: string | null;
  selected?: boolean;
  onClick: () => void;
};

export default function DropdownItem({
  icon,
  title,
  subtitle,
  selected = false,
  onClick,
}: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-4
        px-5
        py-4
        transition-all
        duration-200
        ${
          selected
            ? "bg-blue-500/15"
            : "hover:bg-zinc-800"
        }
      `}
    >
      <Image
        src={icon}
        alt={title}
        width={42}
        height={42}
      />

      <div className="flex-1 text-left">

        <p className="font-semibold">
          {title}
        </p>

        {subtitle && (
          <p className="text-sm text-gray-400">
            {subtitle}
          </p>
        )}

      </div>

      {selected && (
        <span className="text-blue-400">
          ✓
        </span>
      )}

    </button>
  );
}