import Button from "../ui/Button";

export default function CTA() {
  return (
    <section className="px-10 py-32">
      <div className="mx-auto max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-900 px-12 py-20 text-center">

        <h2 className="text-5xl font-bold">
          Ready to Reach Your Dream Rank?
        </h2>

        <p className="mt-6 text-xl text-gray-400">
          Fast, secure and handled by experienced professional boosters.
        </p>

        <div className="mt-10">
          <Button text="Start Boosting" />
        </div>

      </div>
    </section>
  );
}