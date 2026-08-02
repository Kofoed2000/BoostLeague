import SectionTitle from "../ui/SectionTitle";

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-28">

      <div className="text-center">

        <p className="uppercase tracking-[0.3em] text-blue-500 font-semibold">
          WHY US
        </p>

        <div className="mt-3">
          <SectionTitle text="Why Choose BoostLeague?" />
        </div>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Trusted by Rocket League players looking for safe, fast and reliable boosting.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
          <div className="text-5xl">🛡️</div>

          <h3 className="text-2xl font-bold mt-6">
            Safe & Secure
          </h3>

          <p className="text-gray-400 mt-4">
            Your account stays protected throughout the entire boost.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
          <div className="text-5xl">⚡</div>

          <h3 className="text-2xl font-bold mt-6">
            Fast Delivery
          </h3>

          <p className="text-gray-400 mt-4">
            Most orders begin within minutes after purchase.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
          <div className="text-5xl">🏆</div>

          <h3 className="text-2xl font-bold mt-6">
            Elite Boosters
          </h3>

          <p className="text-gray-400 mt-4">
            Only experienced SSL and high-ranked players work on your order.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
          <div className="text-5xl">💬</div>

          <h3 className="text-2xl font-bold mt-6">
            24/7 Support
          </h3>

          <p className="text-gray-400 mt-4">
            Our support team is available whenever you need help.
          </p>
        </div>

      </div>

    </section>
  );
}