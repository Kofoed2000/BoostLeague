import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        backdrop-blur-xl
        shadow-xl
        transition-all
        duration-300
        hover:border-blue-500/40
        hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}