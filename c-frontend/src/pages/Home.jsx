import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedAndCTA from "../components/FeaturedAndCTA";
import CTAStats from "../components/CTAStats";
import Footer from "../components/Footer";
import TrustedBy from "../components/TrustedBy";
import LeadForm from "../components/LeadForm";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <CTAStats />
      <FeaturedAndCTA />
     
      <TrustedBy />
       <LeadForm />
      <Footer />
    </>
  );
}

export default Home;
