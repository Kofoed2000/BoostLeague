"use client";

import { useState } from "react";

import {
  PayPalProvider,
  PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

import { Checkout } from "@/types/checkout";

type CheckoutFooterProps = {
  checkout: Checkout;
  price: number;
  disabled?: boolean;
};

export default function CheckoutFooter({
  checkout,
  price,
  disabled = false,
}: CheckoutFooterProps) {
  const [error, setError] = useState("");

  function validateCheckout() {
    if (!checkout.orderInformation.inGameUsername.trim()) {
      setError("Please enter your in-game username.");
      return false;
    }

    if (!checkout.contactInformation.email.trim()) {
      setError("Please enter your email.");
      return false;
    }

    if (checkout.currentRankId >= checkout.desiredRankId) {
      setError(
        "Desired rank must be higher than current rank."
      );
      return false;
    }

    setError("");

    return true;
  }

  async function createOrder() {
    if (!validateCheckout()) {
      throw new Error("Checkout validation failed.");
    }

    const response = await fetch(
      "/api/paypal/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkout),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.orderID) {
      throw new Error(
        data.message ||
          "Could not create PayPal order."
      );
    }

    return {
      orderId: data.orderID,
    };
  }

  async function captureOrder(orderID: string) {
    const response = await fetch(
      "/api/paypal/capture-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Could not complete PayPal payment."
      );
    }

    window.location.href =
      `/checkout/success?orderId=${orderID}`;
  }

  const clientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8">
        <h3 className="text-lg font-semibold text-red-400">
          PayPal configuration error
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          PayPal Client ID is missing.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-xl text-green-400">
          🔒
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Secure Checkout
          </h3>

          <p className="text-sm text-gray-400">
            Payments are securely processed by PayPal.
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-zinc-800 pt-8">
        <div className="mb-6">
          <p className="text-sm text-gray-400">
            Total Price
          </p>

          <p className="mt-2 text-4xl font-bold text-blue-500">
            €{price.toFixed(2)}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        <PayPalProvider
          clientId={clientId}
          environment="sandbox"
          pageType="checkout"
        >
          <PayPalOneTimePaymentButton
            disabled={disabled}
            createOrder={async () => {
              return await createOrder();
            }}
            onApprove={async ({ orderId }) => {
              try {
                setError("");

                await captureOrder(orderId);
              } catch (error) {
                console.error(error);

                setError(
                  error instanceof Error
                    ? error.message
                    : "Payment could not be completed."
                );
              }
            }}
            onCancel={() => {
              setError(
                "Payment was cancelled. You can try again whenever you're ready."
              );
            }}
            onError={(error) => {
              console.error(
                "PayPal error:",
                error
              );

              setError(
                "Something went wrong with PayPal. Please try again."
              );
            }}
          />
        </PayPalProvider>
      </div>
    </div>
  );
}