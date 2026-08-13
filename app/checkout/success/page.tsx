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

          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-4xl text-green-400">
            ✓
          </div>

          {/* Title */}
          <h1 className="mt-8 text-4xl font-bold">
            Payment Successful!
          </h1>

          <p className="mt-4 text-lg text-gray-400">
            Thank you for your order. Your Rocket League
            boosting order has been received.
          </p>

          {/* Order ID */}
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

          {/* Next Steps */}
          <div className="mt-8 rounded-2xl bg-blue-500/10 p-6 text-left">
            <h2 className="font-semibold text-blue-400">
              What happens next?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              We will review your order and begin preparing
              your boost. Keep an eye on your email or Discord
              for updates.
            </p>
          </div>

          {/* Back Home */}
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