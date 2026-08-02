"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type DropdownProps = {
  value: ReactNode;
  children: ReactNode;
};

export default function Dropdown({
  value,
  children,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-zinc-700
          bg-zinc-900
          px-5
          py-4
          transition-all
          duration-300
          hover:border-blue-500
        "
      >
        <div>{value}</div>

        <svg
          className={`h-5 w-5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            z-50
            mt-3
            max-h-[420px]
            overflow-y-auto
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-900
            shadow-2xl
          "
        >
          {children}
        </div>
      )}
    </div>
  );
}