"use client";

import { Checkout } from "@/types/checkout";

type OrderInformationProps = {
  checkout: Checkout;
  setCheckout: React.Dispatch<React.SetStateAction<Checkout>>;
};

export default function OrderInformation({
  checkout,
  setCheckout,
}: OrderInformationProps) {
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

        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
          <p className="font-semibold text-blue-400">
            Account Information
          </p>

          <p className="mt-2 text-sm text-gray-300">
            You do NOT need to provide your login information during checkout.
            After payment, you will receive instructions to join our Discord
            server where you can securely provide your account details directly
            to your booster.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Order Notes
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
            placeholder="Let us know if there is anything important we should know about your order."
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

      </div>
    </div>
  );
}