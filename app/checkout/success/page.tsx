"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    setOrderId(params.get("orderId"));
  }, []);

  return (
    <main className="min-h-screen py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-10 text-center backdrop-blur">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-4xl text-green-400">
            ✓
          </div>

          <h1 className="mt-8 text-4xl font-bold">
            Payment Successful!
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Thank you for your order. Your Rocket League
            boosting order has been received.
          </p>

          {orderId && (
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm uppercase tracking-wider text-gray-500">
                PayPal Order ID
              </p>

              <p className="mt-2 break-all font-mono text-sm text-gray-300">
                {orderId}
              </p>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 text-left">
            <h2 className="font-semibold text-blue-400">
              What happens next?
            </h2>

            <ol className="mt-4 space-y-3 text-sm text-gray-300">
              <li>
                <strong>1.</strong> Our team will review your
                order.
              </li>

              <li>
                <strong>2.</strong> We will contact you on
                Discord using the username provided during
                checkout.
              </li>

              <li>
                <strong>3.</strong> You will receive
                instructions on how to securely provide your
                account login details.
              </li>

              <li>
                <strong>4.</strong> Your boost will begin as
                soon as everything is confirmed.
              </li>
            </ol>
          </div>

          <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
            <p className="text-sm text-yellow-300">
              Important: Never send your account login details
              before being contacted by an official
              BoostLeague team member.
            </p>
          </div>

          <Link
            href="/"
            className="
              mt-8
              inline-flex
              rounded-2xl
              bg-blue-600
              px-8
              py-4
              font-bold
              transition-all
              duration-300
              hover:scale-105
              hover:bg-blue-500
            "
          >
            Back to BoostLeague
          </Link>

        </div>
      </div>
    </main>
  );
}