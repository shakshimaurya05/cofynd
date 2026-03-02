import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Features from "../components/Features";
import ListingGrid from "../components/ListingGrid";
import LeadForm from "../components/LeadForm";

import coworkingImg from "../assets/hero2.webp";

import { useParams } from "react-router-dom";
import { fetchSpaces, fetchSpacesByLocation } from "../api/spaces";
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
  const [allLocations, setAllLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("all");

  const normalizeCity = (city) => {
    if (!city) return "gurugram";
    if (city.toLowerCase() === "gurgaon") return "gurugram";
    return city.toLowerCase();
  };

  const activeCity = normalizeCity(city);

  // Fetch all locations for the filter (no pagination limit)
  useEffect(() => {
    fetchSpaces({ city: activeCity, page: 1, limit: 1000 })
      .then((data) => {
        const uniqueLocations = [
          "all",
          ...new Set(
            (data.spaces || [])
              .map((item) => item.location)
              .filter(Boolean)
          ),
        ];
        setAllLocations(uniqueLocations);
      })
      .catch((err) => {
        console.error("Failed to fetch locations:", err);
        setAllLocations(["all"]);
      });
  }, [activeCity]);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    
    // Fetch based on selected location
    const fetchFn = selectedLocation === "all"
      ? () => fetchSpaces({ city: activeCity, page: 1, limit: 20 })
      : () => fetchSpacesByLocation({ city: activeCity, microLocation: selectedLocation, page: 1, limit: 20 });
    
    fetchFn()
      .then((data) => {
        setSpaces(data.spaces || []);
        setHasMore(data.pagination?.hasMore || false);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [activeCity, selectedLocation]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;
    
    // Load more based on selected location
    const fetchFn = selectedLocation === "all"
      ? () => fetchSpaces({ city: activeCity, page: nextPage, limit: 20 })
      : () => fetchSpacesByLocation({ city: activeCity, microLocation: selectedLocation, page: nextPage, limit: 20 });
    
    fetchFn()
      .then((data) => {
        setSpaces(prev => [...prev, ...(data.spaces || [])]);
        setPage(nextPage);
        setHasMore(data.pagination?.hasMore || false);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setSelectedLocation("all");
  }, [city]);

  const locations = allLocations;

  // No need to filter client-side since backend already returns filtered spaces
  const filteredSpaces = spaces;

  const heading = `Top Coworking Spaces in ${activeCity.replace("-", " ")}`;

  return (
    <>
      <Navbar />

      {!city && (
        <>
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
                Flexible, fully-equipped coworking offices for startups,
                teams & enterprises.
              </p>
            </div>
          </section>

          <Features features={coworkingFeatures} />
        </>
      )}

      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8">
            {heading}
          </h2>

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
          {loading && page === 1 && (
            <div className="text-center py-12 text-gray-500">
              Loading spaces...
            </div>
          )}
          {loading && page > 1 && (
            <div className="text-center py-8 text-gray-500">
              Loading more...
            </div>
          )}
          {!loading && filteredSpaces.length === 0 && page === 1 && (
            <p className="text-gray-500 text-center py-12">
              No spaces found.
            </p>
          )}
          {!loading && hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </section>

      <LeadForm />
      <Footer />
    </>
  );
}