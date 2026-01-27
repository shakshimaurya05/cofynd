import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Adv from "../components/Adv";
import Footer from "../components/Footer";
import FeaturedCoworking from "../components/FeaturedCoworking";
import LeadForm from "../components/LeadForm";
import CTAStats from "../components/CTAStats";
import HowItWorks from "../components/HowItWorks";
function Home() {

  return (
    <>
      <Navbar />
      <Hero  />
      <About />
      <CTAStats />                                                                              
      <HowItWorks />
      <LeadForm />
      <FeaturedCoworking />
      <Adv />
      
      
      <Footer />
    </>
  );
}
export default Home;
