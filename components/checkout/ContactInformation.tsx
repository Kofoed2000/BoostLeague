"use client";

import { Checkout } from "@/types/checkout";

type ContactInformationProps = {
  checkout: Checkout;
  setCheckout: React.Dispatch<React.SetStateAction<Checkout>>;
};

export default function ContactInformation({
  checkout,
  setCheckout,
}: ContactInformationProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
      <h2 className="text-2xl font-bold">
        Contact Information
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        We will use this information to contact you about your order.
      </p>

      <div className="mt-8 space-y-6">

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email *
          </label>

          <input
            type="email"
            value={checkout.contactInformation.email}
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                contactInformation: {
                  ...prev.contactInformation,
                  email: e.target.value,
                },
              }))
            }
            placeholder="Enter your email address"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <p className="mt-2 text-sm text-gray-500">
            We will send your order confirmation to this email.
          </p>
        </div>

        {/* Discord */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Discord Username *
          </label>

          <input
            type="text"
            value={checkout.contactInformation.discord}
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                contactInformation: {
                  ...prev.contactInformation,
                  discord: e.target.value,
                },
              }))
            }
            placeholder="Enter your Discord username"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <p className="mt-2 text-sm text-gray-500">
            We will contact you on Discord after payment to arrange
            account access and order details.
          </p>
        </div>

      </div>
    </div>
  );
}