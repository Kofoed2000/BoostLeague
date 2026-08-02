import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import TrustStats from "../components/home/TrustStats";
import BoostCalculator from "../components/calculator/BoostCalculator";
import Services from "../components/home/Services";
import WhyChooseUs from "../components/home/WhyChooseUs";
import HowItWorks from "../components/home/HowItWorks";
import Reviews from "../components/home/Reviews";
import CTA from "../components/home/CTA";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <TrustStats />

      <BoostCalculator />

      <Services />

      <WhyChooseUs />

      <HowItWorks />

      <Reviews />

      <CTA />

      <Footer />
    </main>
  );
}