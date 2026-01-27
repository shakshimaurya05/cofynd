import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import GetQuote from "../components/getQuote";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { fetchSpaceById } from "../api/spaces";

export default function ShowCard() {
  const { id } = useParams();
  const [spaceData, setSpaceData] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    fetchSpaceById(id)
      .then((data) => setSpaceData(data))
      .catch((err) => console.error("Error loading space:", err));
  }, [id]);

  if (!spaceData) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-500">Loading space details...</p>
        </div>
        <Footer />
      </>
    );
  }

  // Create seating plans 
  const plans = [];

  if (spaceData.pricing?.dedicatedSeat) {
    plans.push({
      title: "Dedicated Desk",
      desc:
        "Fixed workstation in a shared workspace with all amenities included.",
      price: spaceData.pricing.dedicatedSeat,
    });
  }

  if (spaceData.pricing?.cabinSeat) {
    plans.push({
      title: "Private Cabin",
      desc:
        "Fully furnished private office ideal for teams and growing startups.",
      price: spaceData.pricing.cabinSeat,
    });
  }

  return (
    <>
      <Navbar />

      <section className="pt-20 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              {spaceData.companyName}
            </h1>

            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <FaMapMarkerAlt />
              <span>{spaceData.address}</span>
            </div>
          </motion.div>

          {/* IMAGE GALLERY */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* BIG IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 rounded-3xl overflow-hidden cursor-pointer"
            >
              <img
                src={spaceData.images?.[0]}
                alt={spaceData.companyName}
                onClick={() => setActiveImage(spaceData.images?.[0])}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>

            {/* SMALL IMAGES */}
            <div className="grid grid-cols-2 gap-4">
              {spaceData.images?.slice(1, 5).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={img}
                    alt="Workspace"
                    onClick={() => setActiveImage(img)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </div>
{/* SEATING PLANS */}
{plans.length > 0 && (
  <div className="mt-20 space-y-8">
    <h2 className="text-3xl font-semibold">
      Seating Plans
    </h2>

    {plans.map((plan, i) => {
      const planImage =
        spaceData.images?.[i + 1] || spaceData.images?.[0];

      return (
        <motion.div
          key={plan.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[200px]">
            
            {/* LEFT IMAGE */}
            <div className="md:col-span-1 h-[220px] md:h-full overflow-hidden">
              <img
                src={planImage}
                alt={plan.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-3 px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold">
                  {plan.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 max-w-md">
                  {plan.desc}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-xl">
                  ₹{plan.price.toLocaleString()} / seat / month
                </p>

                <a
                  href="#get-quote"
                  className="inline-block mt-4 bg-blue-600 text-white px-7 py-3 text-sm rounded-full hover:bg-blue-700 transition"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
)}

          {/* GET QUOTE */}
          <div id="get-quote" className="mt-24 py-20 bg-gray-100">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center px-4"
            >
              <GetQuote />
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMAGE MODAL */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <motion.img
            src={activeImage}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-[90%] max-h-[90%] rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </>
  );
}