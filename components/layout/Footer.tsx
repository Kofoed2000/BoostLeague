export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-20">
      <div className="mx-auto max-w-7xl px-10 py-14 grid gap-10 md:grid-cols-4">

        <div>
          <h2 className="text-2xl font-bold text-blue-500">
            BoostLeague.gg
          </h2>

          <p className="mt-4 text-gray-400">
            Professional Rocket League boosting with experienced boosters,
            secure orders and fast delivery.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Services</h3>

          <ul className="mt-4 space-y-2 text-gray-400">
            <li>Rank Boost</li>
            <li>Placement Matches</li>
            <li>Season Rewards</li>
            <li>Play With Booster</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Company</h3>

          <ul className="mt-4 space-y-2 text-gray-400">
            <li>Reviews</li>
            <li>FAQ</li>
            <li>Contact</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Support</h3>

          <ul className="mt-4 space-y-2 text-gray-400">
            <li>Discord</li>
            <li>Email Support</li>
            <li>Live Chat</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-zinc-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BoostLeague.gg — All rights reserved.
      </div>
    </footer>
  );
}