type CheckoutFooterProps = {
  price: number;
  disabled?: boolean;
};

export default function CheckoutFooter({
  price,
  disabled = false,
}: CheckoutFooterProps) {
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
            Payments are securely processed by Stripe.
          </p>

        </div>

      </div>

      <div className="mt-8 flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400">
            Total Price
          </p>

          <p className="text-4xl font-bold text-blue-500">
            €{price.toFixed(2)}
          </p>

        </div>

        <button
          disabled={disabled}
          className={`
            rounded-2xl
            px-8
            py-4
            font-bold
            transition-all
            duration-300

            ${
              disabled
                ? "cursor-not-allowed bg-zinc-700 text-gray-400"
                : "bg-blue-600 hover:scale-105 hover:bg-blue-500"
            }
          `}
        >
          Continue to Payment
        </button>

      </div>

    </div>
  );
}