import Hero from "../components/Hero";
import colivingImg from "../assets/hero4.jpg";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import { useParams } from "react-router-dom";
import { fetchSpaces } from "../api/spaces";
import { useEffect, useState } from "react";
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

const cities = ["gurgaon", "noida", "greater-noida", "delhi"];

export default function Coliving() {
  const { city } = useParams(); 
  
   const [spaces, setSpaces] = useState([]);
    useEffect(() => {
   fetchSpaces({
     spaceType: "coworking",
     city: city || null,
   })
     .then((data) => setSpaces(data))
     .catch((err) => console.error(err));
 }, [city]);
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
     <>
       <h1 className="text-3xl font-semibold mb-10">{heading}</h1>
       <ListingGrid listings={spaces} />
     </>
   ) : (
     cities.map((c) => {
       const citySpaces = spaces.filter(
         (item) => item.city === c
       );
   
       if (citySpaces.length === 0) return null;
   
       return (
         <div key={c} className="mb-20">
           <h2 className="text-3xl font-semibold mb-10 text-center">
             Top Coworking Spaces in{" "}
             {c.replace("-", " ").toUpperCase()}
           </h2>
   
           <ListingGrid listings={citySpaces} />
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
