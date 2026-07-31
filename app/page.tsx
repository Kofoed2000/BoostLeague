import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Services />
    </main>
  );
}