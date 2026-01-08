import Hero from "../components/Hero";
import colivingImg from "../assets/hero4.jpg";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import { useParams } from "react-router-dom";
import listings from "../data/listings";
import ListingGrid from "../components/ListingGrid";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";
import {
  FaCouch,
  FaWifi,
  FaHandshake,
  FaBroom,
  FaUtensils,
  FaUsers,
} from "react-icons/fa";

const colivingFeatures = [
  {
    icon: <FaCouch size={28} className="text-yellow-400" />,
    title: "Fully Furnished",
    description:
      "Live in a fully furnished space with comfort and convenience.",
  },
  {
    icon: <FaWifi size={28} className="text-yellow-400" />,
    title: "High Speed WiFi",
    description:
      "High-Speed WiFi, HDTVs everything you need to do your best work.",
  },
  {
    icon: <FaHandshake size={28} className="text-yellow-400" />,
    title: "Flexible Lease",
    description:
      "Flexible lease terms with countless amenities.",
  },
  {
    icon: <FaBroom size={28} className="text-yellow-400" />,
    title: "Regular Cleaning",
    description:
      "Regular cleaning services on priority basis.",
  },
  {
    icon: <FaUtensils size={28} className="text-yellow-400" />,
    title: "Kitchen",
    description:
      "Kitchen, breakout rooms, and shared spaces.",
  },
  {
    icon: <FaUsers size={28} className="text-yellow-400" />,
    title: "Community",
    description:
      "Interact with wonderful people and build a strong community.",
  },
];

const cities = ["delhi", "gurugram", "noida", "greater-noida"];

export default function Coliving() {
  const { city } = useParams(); 
  const filteredListings = listings.filter((item) => {
    if (city) {
      return (
        item.spaceType === "coliving" &&
        item.city === city
      );
    }
    return item.spaceType === "coliving";
  });

  const heading = city
    ? `Top Coworking Spaces in ${city.replace("-", " ")}`
    : "Top Coworking Spaces in India";
  return (
    <>
     <Navbar />
     {!city && (
     <> <Hero
        title="Find The Best"
        highlight="Coliving Spaces"
        subtitle="In India"
        image={colivingImg}
        mode="coliving"
      />
<Features features={colivingFeatures} />
</>
)}
   <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
      
        {city ? (
  /* 🔹 WHEN CITY IS SELECTED (/coliving/delhi) */
  <>
    <h1 className="text-3xl font-semibold mb-10">
      {heading}
    </h1>

    <ListingGrid listings={filteredListings} />
  </>
) : (
  /* 🔹 WHEN NO CITY (/coliving) */
  cities.map((c) => {
    const cityListings = listings.filter(
      (item) =>
        item.spaceType === "coliving" &&
        item.city === c
    );

    if (cityListings.length === 0) return null;

    return (
      <div key={c} className="mb-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Top Coliving Spaces in{" "}
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
