import SectionTitle from "../ui/SectionTitle";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose your boost",
      description: "Select the service that fits your goals.",
    },
    {
      number: "02",
      title: "Place your order",
      description: "Complete checkout safely and securely.",
    },
    {
      number: "03",
      title: "Get boosted",
      description: "A professional booster starts your order.",
    },
  ];

  return (
    <section className="px-10 py-24">
      <SectionTitle text="How It Works" />

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl bg-zinc-900 p-8 border border-zinc-800"
          >
            <p className="text-blue-500 text-5xl font-bold">
              {step.number}
            </p>

            <h3 className="mt-6 text-2xl font-semibold">
              {step.title}
            </h3>

            <p className="mt-4 text-gray-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}