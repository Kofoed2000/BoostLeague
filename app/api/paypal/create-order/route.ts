import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { extras } from "@/data/extras";
import {
  calculatePrice,
  getRankById,
} from "@/lib/rocketLeague";

const PAYPAL_API_URL =
  "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret =
    process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "PayPal credentials are missing from .env.local"
    );
  }

  const credentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await fetch(
    `${PAYPAL_API_URL}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.text();

    console.error(
      "PayPal authentication failed:",
      error
    );

    throw new Error(
      "Failed to authenticate with PayPal."
    );
  }

  const data = await response.json();

  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const checkout = await request.json();

    if (!checkout) {
      return NextResponse.json(
        {
          success: false,
          message: "Checkout data is missing.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      serviceType,

      currentRankId,
      desiredRankId,

      rewardRank,
      rewardWins,

      tournamentRank,
      tournamentWins,

      placementRank,
      placementMatches,

      platform,
      gameMode,

      extras: selectedExtras,

      orderInformation,
      contactInformation,
    } = checkout;

    const currentRank =
      getRankById(currentRankId);

    const desiredRank =
      getRankById(desiredRankId);

    if (
      serviceType === "rank-boost"
    ) {
      if (!currentRank || !desiredRank) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid rank selection.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        desiredRankId <= currentRankId
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Desired rank must be higher than current rank.",
          },
          {
            status: 400,
          }
        );
      }
    }

    if (
      !contactInformation?.email?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !contactInformation?.discord?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Discord username is required.",
        },
        {
          status: 400,
        }
      );
    }

    let totalPrice = 0;

    if (
      serviceType === "rank-boost"
    ) {
      const basePrice =
        calculatePrice(
          currentRankId,
          desiredRankId
        );

      const multiplier = (
        Array.isArray(selectedExtras)
          ? selectedExtras
          : []
      ).reduce(
        (
          total: number,
          extraId: string
        ) => {
          const extra = extras.find(
            (item) =>
              item.id === extraId
          );

          if (!extra) {
            return total;
          }

          return (
            total *
            extra.priceMultiplier
          );
        },
        1
      );

      totalPrice =
        basePrice * multiplier;
    } else {
      totalPrice =
        Number(checkout.price) || 0;
    }

    if (totalPrice <= 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid order price.",
        },
        {
          status: 400,
        }
      );
    }

    const accessToken =
      await getPayPalAccessToken();

    const paypalResponse =
      await fetch(
        `${PAYPAL_API_URL}/v2/checkout/orders`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type":
              "application/json",
            Accept:
              "application/json",
            "PayPal-Request-Id":
              crypto.randomUUID(),
          },
          body: JSON.stringify({
            intent: "CAPTURE",

            purchase_units: [
              {
                description:
                  serviceType ===
                  "rank-boost"
                    ? `Rocket League Boost - ${currentRank?.display} to ${desiredRank?.display}`
                    : `Rocket League ${serviceType}`,

                amount: {
                  currency_code:
                    "EUR",
                  value:
                    totalPrice.toFixed(
                      2
                    ),
                },
              },
            ],

            application_context: {
              brand_name:
                "BoostLeague",

              user_action:
                "PAY_NOW",

              return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,

              cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
            },
          }),
          cache: "no-store",
        }
      );

    const paypalData =
      await paypalResponse.json();

    if (!paypalResponse.ok) {
      console.error(
        "PayPal order creation failed:",
        paypalData
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "PayPal could not create the order.",
        },
        {
          status:
            paypalResponse.status,
        }
      );
    }

    const orderNumber = `BL-${Date.now()}`;

const orderData: any = {
  orderNumber,

  serviceType,

  email:
    contactInformation.email,

  discord:
    contactInformation.discord,

  platform,

  gameMode:
    gameMode || null,

  extras:
    selectedExtras?.length
      ? selectedExtras.join(",")
      : null,

  notes:
    orderInformation?.notes?.trim() ||
    null,

  price: totalPrice,

  paypalOrderId:
    paypalData.id,

  status: "pending",
};

if (serviceType === "rank-boost") {
  Object.assign(orderData, {
    currentRank:
      currentRank?.display ??
      null,

    desiredRank:
      desiredRank?.display ??
      null,
  });
}

if (serviceType === "reward-wins") {
  Object.assign(orderData, {
    currentRank:
      currentRank?.display ?? null,

    rewardRank:
      rewardRank || null,

    rewardWins:
      rewardWins || null,
  });
}

if (serviceType === "placements-boost") {
  Object.assign(orderData, {
    placementRank:
      placementRank || null,

    placementMatches:
      placementMatches || null,
  });
}

if (serviceType === "tournaments-wins") {
  Object.assign(orderData, {
    tournamentRank:
      tournamentRank || null,

    tournamentWins:
      tournamentWins || null,
  });
}

await prisma.order.create({
  data: orderData,
});

    return NextResponse.json({
      success: true,
      orderID: paypalData.id,
      orderNumber,
      price: totalPrice,
    });
  } catch (error) {
    console.error(
      "PayPal create order error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while creating the PayPal order.",
      },
      {
        status: 500,
      }
    );
  }
}