import SectionTitle from "../ui/SectionTitle";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section className="px-8 py-28 max-w-7xl mx-auto">

      <div className="text-center">

        <p className="uppercase tracking-[0.3em] text-blue-500 font-semibold">
          SERVICES
        </p>

        <div className="mt-3">
          <SectionTitle text="Choose Your Boost" />
        </div>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Fast, safe and professional Rocket League boosting from verified
          high-ranked players.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            price={service.price}
            icon={service.icon}
          />
        ))}

      </div>

    </section>
  );
}