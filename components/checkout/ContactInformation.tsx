"use client";

import { useEffect } from "react";
import {
  signIn,
  useSession,
} from "next-auth/react";

import { Checkout } from "@/types/checkout";

type ContactInformationProps = {
  checkout: Checkout;
  setCheckout: React.Dispatch<
    React.SetStateAction<Checkout>
  >;
};

export default function ContactInformation({
  checkout,
  setCheckout,
}: ContactInformationProps) {
  const {
    data: session,
    status,
  } = useSession();

  const discordUsername =
    session?.user?.discordUsername;

  useEffect(() => {
    if (!discordUsername) {
      return;
    }

    setCheckout((prev) => ({
      ...prev,
      contactInformation: {
        ...prev.contactInformation,
        discord: discordUsername,
      },
    }));
  }, [
    discordUsername,
    setCheckout,
  ]);

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
            value={
              checkout.contactInformation.email
            }
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
            Discord *
          </label>

          {status === "authenticated" &&
            discordUsername ? (
            <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-4">
              <p className="font-medium text-green-400">
                ✓ Discord connected
              </p>

              <p className="mt-1 text-sm text-gray-300">
                Logged in as{" "}
                <span className="font-semibold">
                  {discordUsername}
                </span>
              </p>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() =>
                  signIn("discord")
                }
                className="w-full rounded-xl bg-[#5865F2] px-4 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Login with Discord
              </button>

              <p className="mt-2 text-sm text-gray-500">
                Connect your Discord account so we can
                automatically create a private chat with your
                booster after the order is claimed.
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
}