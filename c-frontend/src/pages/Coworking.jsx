import Hero from "../components/Hero";
import coworkingImg from "../assets/hero2.webp";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import { useParams } from "react-router-dom";
import { fetchSpaces } from "../api/spaces";
import { useEffect, useState } from "react";

import ListingGrid from "../components/ListingGrid";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";
import {
  FaWifi,
  FaUsers,
  FaDoorOpen,
  FaPrint,
  FaCoffee,
  FaCar,
} from "react-icons/fa";
const coworkingFeatures = [
  {
    icon: <FaWifi size={28} className="text-yellow-400" />,
    title: "High Speed WiFi",
    description:
      "High-Speed WiFi, HDTVs everything you need to do your best work.",
  },
  {
    icon: <FaUsers size={28} className="text-yellow-400" />,
    title: "Comfy Workstation",
    description:
      "Connect with other people and share your skills for better growth.",
  },
  {
    icon: <FaDoorOpen size={28} className="text-yellow-400" />,
    title: "Meeting Rooms",
    description:
      "Come up with great ideas and engage in valuable discussions.",
  },
  {
    icon: <FaPrint size={28} className="text-yellow-400" />,
    title: "Printer",
    description:
      "Printing and scanning facilities available without any extra cost.",
  },
  {
    icon: <FaCoffee size={28} className="text-yellow-400" />,
    title: "Pantry",
    description:
      "Lounge, kitchen, breakout rooms, and more.",
  },
  {
    icon: <FaCar size={28} className="text-yellow-400" />,
    title: "Parking",
    description:
      "Avoid morning hassle with easy and convenient parking.",
  },
];

const cities = ["gurgaon", "noida", "greater-noida", "delhi"];

export default function Coworking() {
  
  const [spaces, setSpaces] = useState([]);
   const { city } = useParams();
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
        <>
          <Hero
            title="Find The Best"
            highlight="Coworking Offices"
            subtitle="In India"
            image={coworkingImg}
            mode="coworking"
          />

          <Features features={coworkingFeatures} />
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
