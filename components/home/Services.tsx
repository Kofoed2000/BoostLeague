import SectionTitle from "../ui/SectionTitle";

export default function Services() {
  return (
    <section className="px-10 py-24">

      <SectionTitle text="Our Services" />

      <div className="grid grid-cols-3 gap-8 mt-12">

        <div className="rounded-2xl bg-zinc-900 p-8">
          <h3 className="text-2xl font-bold">Rank Boost</h3>

          <p className="mt-4 text-gray-400">
            Climb to your dream rank quickly and safely.
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-8">
          <h3 className="text-2xl font-bold">Coaching</h3>

          <p className="mt-4 text-gray-400">
            Improve your mechanics and game sense.
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-8">
          <h3 className="text-2xl font-bold">Placement Matches</h3>

          <p className="mt-4 text-gray-400">
            Let our boosters secure the best possible placement.
          </p>
        </div>

      </div>
    </section>
  );
}