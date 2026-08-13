"use client";

import { useEffect, useMemo, useState } from "react";

import ContactInformation from "@/components/checkout/ContactInformation";
import CheckoutFooter from "@/components/checkout/CheckoutFooter";
import OrderInformation from "@/components/checkout/OrderInformation";
import OrderSummary from "@/components/order/OrderSummary";
import Container from "@/components/ui/Container";

import { Checkout } from "@/types/checkout";

import { extras } from "@/data/extras";
import { gameModes } from "@/data/gameModes";

import {
  calculatePrice,
  getRankById,
} from "@/lib/rocketLeague";

type ServiceType =
  | "rank-boost"
  | "reward-wins"
  | "tournament-wins"
  | "placement-boost";

const rewardPrices: Record<string, number> = {
  Bronze: 2,
  Silver: 2.5,
  Gold: 3,
  Platinum: 3.5,
  Diamond: 4,
  Champion: 5,
  "Grand Champion": 7,
  "Supersonic Legend": 10,
};

const tournamentPrices: Record<string, number> = {
  Bronze: 10,
  Silver: 15,
  Gold: 20,
  Platinum: 27.5,
  Diamond: 40,
  Champion: 55,
  "Grand Champion": 70,
  "Supersonic Legend": 95,
};

const placementPrices: Record<string, number> = {
  "Bronze I": 1,
  "Bronze II": 1.1,
  "Bronze III": 1.2,

  "Silver I": 1.4,
  "Silver II": 1.6,
  "Silver III": 1.8,

  "Gold I": 2,
  "Gold II": 2.2,
  "Gold III": 2.4,

  "Platinum I": 2.7,
  "Platinum II": 3,
  "Platinum III": 3.3,

  "Diamond I": 3.6,
  "Diamond II": 3.9,
  "Diamond III": 4.2,

  "Champion I": 4.6,
  "Champion II": 5,
  "Champion III": 5.4,

  "Grand Champion I": 5.8,
  "Grand Champion II": 6.2,
  "Grand Champion III": 6.5,

  "Supersonic Legend": 7.7,
};

export default function CheckoutPage() {
  const [serviceType, setServiceType] =
    useState<ServiceType>("rank-boost");

  const [rewardRank, setRewardRank] =
    useState("Bronze");

  const [rewardWins, setRewardWins] =
    useState(1);

  const [tournamentRank, setTournamentRank] =
    useState("Bronze");

  const [tournamentWins, setTournamentWins] =
    useState(1);

  const [placementRank, setPlacementRank] =
    useState("Bronze I");

  const [placementMatches, setPlacementMatches] =
    useState(10);

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

  /*
   * -----------------------------------------
   * LOAD ORDER FROM CALCULATOR
   * -----------------------------------------
   */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const service = params.get("service");

    if (
      service === "rank-boost" ||
      service === "reward-wins" ||
      service === "tournament-wins" ||
      service === "placement-boost"
    ) {
      setServiceType(service);
    }

    const current = Number(
      params.get("current") ?? "0"
    );

    const desired = Number(
      params.get("desired") ?? "8"
    );

    const platform =
      params.get("platform") ?? "Steam";

    const mode =
      params.get("mode") ?? "2v2";

    const extrasFromUrl =
      params.get("extras");

    const selectedExtras =
      extrasFromUrl
        ? extrasFromUrl.split(",").filter(Boolean)
        : [];

    setCheckout((prev) => ({
      ...prev,

      currentRankId: current,
      desiredRankId: desired,

      platform,
      gameMode: mode,

      extras: selectedExtras,
    }));

    setRewardRank(
      params.get("rewardRank") ?? "Bronze"
    );

    setRewardWins(
      Number(params.get("rewardWins") ?? "1")
    );

    setTournamentRank(
      params.get("tournamentRank") ?? "Bronze"
    );

    setTournamentWins(
      Number(params.get("tournamentWins") ?? "1")
    );

    setPlacementRank(
      params.get("placementRank") ?? "Bronze I"
    );

    setPlacementMatches(
      Number(params.get("placementMatches") ?? "10")
    );
  }, []);

  /*
   * -----------------------------------------
   * CURRENT / DESIRED RANK
   * -----------------------------------------
   */

  const currentRank =
    getRankById(checkout.currentRankId);

  const desiredRank =
    getRankById(checkout.desiredRankId);

  /*
   * -----------------------------------------
   * GAME MODE MULTIPLIER
   * -----------------------------------------
   */

  const gameModeMultiplier =
    gameModes.find(
      (mode) => mode.name === checkout.gameMode
    )?.priceMultiplier ?? 1;

  /*
   * -----------------------------------------
   * EXTRAS MULTIPLIER
   * -----------------------------------------
   */

  const extrasMultiplier =
    checkout.extras.reduce((total, id) => {
      const extra = extras.find(
        (extra) => extra.id === id
      );

      if (!extra) {
        return total;
      }

      return (
        total * extra.priceMultiplier
      );
    }, 1);

  /*
   * -----------------------------------------
   * BASE PRICE
   * -----------------------------------------
   */

  const basePrice = useMemo(() => {
    if (serviceType === "rank-boost") {
      return calculatePrice(
        checkout.currentRankId,
        checkout.desiredRankId
      );
    }

    if (serviceType === "reward-wins") {
      const pricePerWin =
        rewardPrices[rewardRank] ?? 2;

      return (
        pricePerWin * rewardWins
      );
    }

    if (serviceType === "tournament-wins") {
      const pricePerWin =
        tournamentPrices[tournamentRank] ?? 10;

      return (
        pricePerWin * tournamentWins
      );
    }

    if (serviceType === "placement-boost") {
      const pricePerMatch =
        placementPrices[placementRank] ?? 1;

      return (
        pricePerMatch * placementMatches
      );
    }

    return 0;
  }, [
    serviceType,
    checkout.currentRankId,
    checkout.desiredRankId,
    rewardRank,
    rewardWins,
    tournamentRank,
    tournamentWins,
    placementRank,
    placementMatches,
  ]);

  /*
   * -----------------------------------------
   * FINAL PRICE
   * -----------------------------------------
   */

  const totalPrice =
    basePrice *
    gameModeMultiplier *
    extrasMultiplier;

  /*
   * -----------------------------------------
   * SERVICE TITLE
   * -----------------------------------------
   */

  const serviceTitle =
    serviceType === "rank-boost"
      ? "Rank Boost"
      : serviceType === "reward-wins"
        ? "Reward Wins"
        : serviceType === "tournament-wins"
          ? "Tournament Wins"
          : "Placement Boost";

  return (
    <main className="min-h-screen py-24">

      <Container>

        <div className="mx-auto max-w-7xl">

          {/* Header */}

          <div className="mb-12">

            <h1 className="text-5xl font-bold">
              Checkout
            </h1>

            <p className="mt-4 text-lg text-gray-400">
              Complete your {serviceTitle} order.
            </p>

          </div>

          <div className="grid gap-8 xl:grid-cols-[1.3fr_0.8fr]">

            {/* LEFT SIDE */}

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
                checkout={checkout}
                price={totalPrice}
              />

            </div>

            {/* RIGHT SIDE */}

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