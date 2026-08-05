"use client";

import { useMemo, useState } from "react";

import ContactInformation from "@/components/checkout/ContactInformation";
import CheckoutFooter from "@/components/checkout/CheckoutFooter";
import OrderInformation from "@/components/checkout/OrderInformation";
import OrderSummary from "@/components/order/OrderSummary";
import Container from "@/components/ui/Container";

import { Checkout } from "@/types/checkout";

import { extras } from "@/data/extras";

import {
  calculatePrice,
  getRankById,
} from "@/lib/rocketLeague";

export default function CheckoutPage() {
  const [checkout, setCheckout] = useState<Checkout>({
    currentRankId: 0,
    desiredRankId: 8,

    platform: "Steam",
    gameMode: "2v2",

    extras: [],

    orderInformation: {
      inGameUsername: "",
      preferredPlayTime: "Evening",
      notes: "",
    },

    contactInformation: {
      email: "",
      discord: "",
    },
  });

  const currentRank = getRankById(checkout.currentRankId);
  const desiredRank = getRankById(checkout.desiredRankId);

  const totalPrice = useMemo(() => {
    const basePrice = calculatePrice(
      checkout.currentRankId,
      checkout.desiredRankId
    );

    const multiplier = checkout.extras.reduce((total, id) => {
      const extra = extras.find((e) => e.id === id);

      if (!extra) return total;

      return total * extra.priceMultiplier;
    }, 1);

    return basePrice * multiplier;
  }, [checkout]);

  return (
    <main className="min-h-screen py-24">

      <Container>

        <div className="mx-auto max-w-7xl">

          <div className="mb-12">

            <h1 className="text-5xl font-bold">
              Checkout
            </h1>

            <p className="mt-4 text-lg text-gray-400">
              Complete your Rocket League boost order.
            </p>

          </div>

          <div className="grid gap-8 xl:grid-cols-[1.3fr_0.8fr]">

            <div className="space-y-8">

              <OrderInformation
                checkout={checkout}
                setCheckout={setCheckout}
              />

              <ContactInformation
                checkout={checkout}
                setCheckout={setCheckout}
              />

              <CheckoutFooter
                price={totalPrice}
              />

            </div>

            <div className="sticky top-8 h-fit rounded-3xl border border-zinc-700 bg-zinc-800/70 p-8 backdrop-blur">

              <OrderSummary
                currentRank={currentRank.display}
                desiredRank={desiredRank.display}
                platform={checkout.platform}
                gameMode={checkout.gameMode}
                selectedExtras={checkout.extras}
                price={totalPrice}
              />

            </div>

          </div>

        </div>

      </Container>

    </main>
  );
}