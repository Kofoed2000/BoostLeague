"use client";

import { ReactNode } from "react";

type SelectionModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export default function SelectionModal({
  open,
  title,
  children,
  onClose,
}: SelectionModalProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-900 shadow-2xl">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

            <h2 className="text-2xl font-bold">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="
                text-3xl
                text-gray-400
                transition-colors
                hover:text-white
              "
            >
              ×
            </button>

          </div>

          {/* Content */}

          <div className="max-h-[70vh] overflow-y-auto p-6">
            {children}
          </div>

        </div>

      </div>
    </>
  );
}