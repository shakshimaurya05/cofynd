import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";
import ListingGrid from "../components/ListingGrid";
import LeadForm from "../components/LeadForm";

import coworkingImg from "../assets/hero2.webp";

import { useParams } from "react-router-dom";
import { fetchSpaces } from "../api/spaces";
import { useEffect, useState } from "react";

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
    description: "Reliable internet for uninterrupted work.",
  },
  {
    icon: <FaUsers size={28} className="text-yellow-400" />,
    title: "Comfy Workstation",
    description: "Ergonomic seating & productive environment.",
  },
  {
    icon: <FaDoorOpen size={28} className="text-yellow-400" />,
    title: "Meeting Rooms",
    description: "Professional rooms for discussions & calls.",
  },
  {
    icon: <FaPrint size={28} className="text-yellow-400" />,
    title: "Printer",
    description: "Print & scan with zero hassle.",
  },
  {
    icon: <FaCoffee size={28} className="text-yellow-400" />,
    title: "Pantry",
    description: "Refreshments & breakout spaces.",
  },
  {
    icon: <FaCar size={28} className="text-yellow-400" />,
    title: "Parking",
    description: "Easy & convenient parking facilities.",
  },
];

export default function Coworking() {
  const { city } = useParams();
  const [spaces, setSpaces] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("all");


  const activeCity = city || "gurgaon";

  useEffect(() => {
    fetchSpaces({
      spaceType: "coworking",
      city: activeCity,
    })
      .then((data) => setSpaces(data))
      .catch((err) => console.error(err));
  }, [activeCity]);

  // Auto-generate locations from API data
  const locations = [
    "all",
    ...new Set(spaces.map((item) => item.location)),
  ];

  // Filter logic
  const filteredSpaces =
    selectedLocation === "all"
      ? spaces
      : spaces.filter(
          (item) => item.location === selectedLocation
        );

  const heading = `Top Coworking Spaces in ${activeCity.replace("-", " ")}`;

  return (
    <>
      <Navbar />

      {/* ONLY FOR /coworking */}
      {!city && (
        <>
          {/* BACKGROUND SECTION */}
          <section
            className="relative h-[300px] flex items-center justify-center text-white"
            style={{
              backgroundImage: `url(${coworkingImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative text-center max-w-3xl px-4">
              <h1 className="text-4xl font-bold mb-4">
                Discover Premium Coworking Spaces
              </h1>
              <p className="text-lg text-gray-200">
                Flexible, fully-equipped coworking offices in Gurgaon designed
                for startups, teams & enterprises.
              </p>
            </div>
          </section>

          {/* FEATURES */}
          <Features features={coworkingFeatures} />
        </>
      )}

      {/* LISTINGS */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-left">
            {heading}
          </h2>

          {/* LOCATION FILTER – ONLY ON /coworking/:city */}
          {city && (
  <div className="mb-6 overflow-x-auto">
    <div className="flex gap-2 whitespace-nowrap pb-1">
      {locations.map((loc) => (
        <button
          key={loc}
          onClick={() => setSelectedLocation(loc)}
          className={`px-3 py-1.5 rounded-full border text-xs font-medium
            transition-all duration-200
            ${
              selectedLocation === loc
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-blue-500 hover:text-blue-600"
            }`}
        >
          {loc === "all" ? "All" : loc}
        </button>
      ))}
    </div>
  </div>
)}


          <ListingGrid listings={filteredSpaces} />
        </div>
      </section>

      <LeadForm />
      <Footer />
    </>
  );
}
