import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProofGrid from "../components/ProofGrid";
import Logistics from "../components/Logistics";
import Testimonial from "../components/Testimonial";
import UberOne from "../components/UberOne";
import SafetyNet from "../components/SafetyNet";
import MarginCalculator from "../components/MarginCalculator";
import FinalCTA from "../components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Hero />
        <ProofGrid />
        <Logistics />
        <Testimonial />
        <UberOne />
        <SafetyNet />
        <MarginCalculator />
        <FinalCTA />
      </div>
      <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Uber Technologies, Inc. For merchant partnership inquiries only.
        </p>
      </footer>
    </div>
  );
};

export default Index;
