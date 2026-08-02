import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Card from "../ui/Card";

export default function Hero() {
  return (
    <Section className="overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[180px]" />

      <Container>

        <div className="relative grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <Badge>
              ⭐ Trusted by 12,000+ Rocket League Players
            </Badge>

            <h1 className="mt-8 text-6xl font-black leading-tight lg:text-7xl">
              Reach Your
              <br />
              <span className="text-blue-500">
                Dream Rank
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-8 text-gray-400">
              Professional Rocket League boosting with experienced
              players, secure orders and completely anonymous service.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Button text="Order Now" />

              <button className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold transition hover:border-blue-500">
                View Prices
              </button>

            </div>

            <div className="mt-12 flex flex-wrap gap-10">

              <div>
                <p className="text-3xl font-bold">12K+</p>
                <p className="text-gray-500">Orders Completed</p>
              </div>

              <div>
                <p className="text-3xl font-bold">4.9★</p>
                <p className="text-gray-500">Customer Rating</p>
              </div>

              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-gray-500">Anonymous</p>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative hidden h-[520px] lg:block">

            <Card className="absolute left-0 top-8 w-64 p-6">
              <p className="text-gray-400">
                Current Rank
              </p>

              <p className="mt-2 text-2xl font-bold">
                Champion II
              </p>
            </Card>

            <Card className="absolute right-0 top-44 w-64 border-blue-500/30 bg-blue-500/10 p-6">
              <p className="text-gray-400">
                Desired Rank
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-400">
                Grand Champion I
              </p>
            </Card>

            <Card className="absolute left-20 bottom-0 w-72 p-6">
              <p className="text-gray-400">
                Status
              </p>

              <p className="mt-2 text-2xl font-bold text-green-400">
                ✔ Boost Completed
              </p>
            </Card>

          </div>

        </div>

      </Container>

    </Section>
  );
}