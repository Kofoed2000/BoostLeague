export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6">
      <h1 className="text-3xl font-bold text-blue-500">
        BoostLeague.gg
      </h1>

      <div className="flex gap-8">
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Prices</a>
        <a href="#">Reviews</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  );
}