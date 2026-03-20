import { useParams } from "react-router-dom";
import HeroSection from "./HeroSection";
import BenefitsSection from "./BenefitsSection";
import StepsSection from "./StepsSection";
import CitiesSection from "./CitiesSection";
import Footer from "../../components/Footer"
export default function VirtualOfficePage() {
  const { city } = useParams();

  const cityName = city
    ? city.charAt(0).toUpperCase() + city.slice(1)
    : "India";

  return (
    <div>
      <HeroSection city={cityName} />
      <BenefitsSection />
    
      <StepsSection />
      <CitiesSection />
      <Footer />
    </div>
  );
}