import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedAndCTA from "../components/FeaturedAndCTA";
import CTAStats from "../components/CTAStats";
import Footer from "../components/Footer";
import TrustedBy from "../components/TrustedBy";
import LeadForm from "../components/LeadForm";
import heroImg from "../assets/hero1.jpg";
import { useState } from "react";
import CityActionModal from "../components/CityActionModal";
function Home() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <>
      <Navbar />
    <Hero
        title="Choose from"
        highlight="1000+ spaces to"
        subtitle="work and live in India"
        subtitleColor="text-blue-800"
        image={heroImg}
        enableCityPopup
  onCityClick={(city) => setSelectedCity(city)}
  mode="home"
      />
      <Categories />
      <CTAStats />
      <FeaturedAndCTA />
     
      <TrustedBy />
       <LeadForm />
       {selectedCity && (
  <CityActionModal
    city={selectedCity}
    onClose={() => setSelectedCity(null)}
  />
)}
      <Footer />
    </>
  );
}
export default Home;
