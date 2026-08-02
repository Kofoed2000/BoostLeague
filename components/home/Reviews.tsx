import SectionTitle from "../ui/SectionTitle";

const reviews = [
  {
    review:
      "Reached Grand Champion in less than 24 hours. Excellent communication throughout the order.",
    order: "#10482",
  },
  {
    review:
      "Very smooth process. The booster kept me updated the entire time.",
    order: "#10537",
  },
  {
    review:
      "Fast, professional and exactly as promised. Will definitely order again.",
    order: "#10611",
  },
];

export default function Reviews() {
  return (
    <section className="px-10 py-24">
      <SectionTitle text="Trusted by Players Worldwide" />

      <p className="mt-4 text-center text-gray-400">
        Real feedback from verified BoostLeague customers.
      </p>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.order}
            className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8"
          >
            <p className="text-yellow-400 text-xl">
              ★★★★★
            </p>

            <p className="mt-6 text-gray-200 leading-7">
              "{review.review}"
            </p>

            <p className="mt-8 text-green-400">
              ✓ Verified Customer
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Order {review.order}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}