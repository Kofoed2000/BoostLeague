"use client";

import { Checkout } from "@/types/checkout";
import { platformInformation } from "@/data/platformInformation";

type OrderInformationProps = {
  checkout: Checkout;
  setCheckout: React.Dispatch<React.SetStateAction<Checkout>>;
};

export default function OrderInformation({
  checkout,
  setCheckout,
}: OrderInformationProps) {
  const info =
    platformInformation[
      checkout.platform as keyof typeof platformInformation
    ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
      <h2 className="text-2xl font-bold">
        Order Information
      </h2>

      <div className="mt-8 space-y-6">

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Platform
          </label>

          <input
            readOnly
            value={checkout.platform}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-gray-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Game Mode
          </label>

          <input
            readOnly
            value={checkout.gameMode}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-gray-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            {info.usernameLabel} *
          </label>

          <input
            type="text"
            value={checkout.orderInformation.inGameUsername}
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                orderInformation: {
                  ...prev.orderInformation,
                  inGameUsername: e.target.value,
                },
              }))
            }
            placeholder={info.placeholder}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <p className="mt-2 text-sm text-gray-500">
            {info.helperText}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Preferred Play Time
          </label>

          <select
            value={checkout.orderInformation.preferredPlayTime}
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                orderInformation: {
                  ...prev.orderInformation,
                  preferredPlayTime: e.target.value,
                },
              }))
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Additional Notes
          </label>

          <textarea
            rows={5}
            value={checkout.orderInformation.notes}
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                orderInformation: {
                  ...prev.orderInformation,
                  notes: e.target.value,
                },
              }))
            }
            placeholder="Anything we should know?"
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

      </div>
    </div>
  );
}