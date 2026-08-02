import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <div
      className="
        inline-flex
        items-center
        rounded-full
        border
        border-blue-500/30
        bg-blue-500/10
        px-4
        py-2
        text-sm
        font-medium
        text-blue-400
      "
    >
      {children}
    </div>
  );
}