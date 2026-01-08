import Hero from "../components/Hero";
import virtualImg from "../assets/hero3.avif";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import { useParams } from "react-router-dom";
import listings from "../data/listings";
import ListingGrid from "../components/ListingGrid";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";
import {
  FaBuilding,
  FaFileInvoice,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUserTie,
  FaHandshake,
} from "react-icons/fa";

const virtualOfficeFeatures = [
  {
    icon: <FaBuilding size={28} className="text-yellow-400" />,
    title: "Company Registration",
    description:
      "Register your company without a physical office.",
  },
  {
    icon: <FaFileInvoice size={28} className="text-yellow-400" />,
    title: "GST Registration",
    description:
      "Get GST registration with complete documentation.",
  },
  {
    icon: <FaMapMarkerAlt size={28} className="text-yellow-400" />,
    title: "Business Address",
    description:
      "Prestigious business address for branding.",
  },
  {
    icon: <FaEnvelope size={28} className="text-yellow-400" />,
    title: "Mailing Address",
    description:
      "Collect and forward couriers easily.",
  },
  {
    icon: <FaUserTie size={28} className="text-yellow-400" />,
    title: "Reception Services",
    description:
      "Client handling and reception support.",
  },
  {
    icon: <FaHandshake size={28} className="text-yellow-400" />,
    title: "Meeting Room",
    description:
      "Complimentary meeting room access every month.",
  },
]; 
const cities = ["delhi", "gurugram", "noida", "greater-noida"];

export default function VirtualOffice() {
  const { city } = useParams(); 

  const filteredListings = listings.filter((item) => {
    if (city) {
      return (
        item.spaceType === "virtual-office" &&
        item.city === city
      );
    }
    return item.spaceType === "virtual-office";
  });

  const heading = city
    ? `Top Coworking Spaces in ${city.replace("-", " ")}`
    : "Top Coworking Spaces in India";

  return (
    <>
     <Navbar />
     {!city && (
      <>
      <Hero
        title="Find The Best"
        highlight="Virtual Office"
        subtitle="In India "
        image={virtualImg}
        mode="virtual-office"
      />
<Features features={virtualOfficeFeatures} />
</>
)}
     <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
      
        {city ? (
  
  <>
    <h1 className="text-3xl font-semibold mb-10">
      {heading}
    </h1>

    <ListingGrid listings={filteredListings} />
  </>
) : (
  cities.map((c) => {
    const cityListings = listings.filter(
      (item) =>
        item.spaceType === "virtual-office" &&
        item.city === c
    );

    if (cityListings.length === 0) return null;

    return (
      <div key={c} className="mb-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Top Virtual Offices in{" "}
          {c.replace("-", " ").toUpperCase()}
        </h2>

        <ListingGrid listings={cityListings} />
      </div>
    );
  })
)}

      </div>
    </section>
    <LeadForm />
    <Footer />
    </>
  );
}
