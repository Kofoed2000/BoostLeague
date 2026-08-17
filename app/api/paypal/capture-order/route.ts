import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const PAYPAL_API_URL =
  "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken() {
  const clientId =
    process.env.PAYPAL_CLIENT_ID;

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
    const error =
      await response.text();

    console.error(
      "PayPal authentication failed:",
      error
    );

    throw new Error(
      "Failed to authenticate with PayPal."
    );
  }

  const data =
    await response.json();

  return data.access_token;
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const orderID =
      body?.orderID;

    if (
      typeof orderID !==
        "string" ||
      !orderID.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "PayPal order ID is missing.",
        },
        {
          status: 400,
        }
      );
    }

    const accessToken =
      await getPayPalAccessToken();

    const response = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`,
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
        body: JSON.stringify({}),
        cache: "no-store",
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      console.error(
        "PayPal capture failed:",
        data
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "PayPal could not complete the payment.",
        },
        {
          status:
            response.status,
        }
      );
    }

    if (
      data.status !==
      "COMPLETED"
    ) {
      console.error(
        "Unexpected PayPal order status:",
        data.status
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "PayPal payment was not completed.",
          status:
            data.status,
        },
        {
          status: 400,
        }
      );
    }

    await prisma.order.update({
      where: {
        paypalOrderId:
          orderID,
      },
      data: {
        status: "paid",
      },
    });

    return NextResponse.json({
      success: true,
      orderID: data.id,
      status: data.status,
      capture:
        data.purchase_units?.[0]
          ?.payments
          ?.captures?.[0] ??
        null,
    });
  } catch (error) {
    console.error(
      "PayPal capture order error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while completing the PayPal payment.",
      },
      {
        status: 500,
      }
    );
  }
}