import { Navbar } from "@/react-app/components/Navbar";
import { HeroSection } from "@/react-app/components/HeroSection";
import { FeaturesSection } from "@/react-app/components/FeaturesSection";
import { CTASection } from "@/react-app/components/CTASection";
import { Footer } from "@/react-app/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
