const stats = [
  {
    value: "12,000+",
    title: "Completed Orders",
    description: "Successfully completed Rocket League boosts.",
  },
  {
    value: "4.9 / 5",
    title: "Average Rating",
    description: "Based on hundreds of verified customer reviews.",
  },
  {
    value: "100%",
    title: "Anonymous",
    description: "Your account and identity always stay private.",
  },
  {
    value: "24/7",
    title: "Support",
    description: "We're available whenever you need help.",
  },
];

export default function TrustStats() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
            Trusted by Rocket League Players
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Trusted. Secure. Professional.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Thousands of players have trusted BoostLeague to help them
            reach their dream rank quickly, safely and anonymously.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="
                group
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900/70
                p-8
                backdrop-blur
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-500/50
                hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]
              "
            >
              <h3 className="text-5xl font-bold text-blue-500">
                {stat.value}
              </h3>

              <p className="mt-5 text-xl font-semibold">
                {stat.title}
              </p>

              <p className="mt-3 text-gray-400">
                {stat.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}