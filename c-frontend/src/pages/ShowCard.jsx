import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import GetQuote from "../components/getQuote";

import heroImg from "../assets/listings/coworking/cowork1.avif";
import gallery1 from "../assets/listings/coworking/cowork2.avif";
import gallery2 from "../assets/listings/coworking/cowork3.avif";
import gallery3 from "../assets/listings/coworking/cowork4.avif";
import dedicatedImg from "../assets/listings/coworking/cowork5.avif";
import privateImg from "../assets/listings/coworking/cowork6.avif";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const spaceData = {
  name: "AltF Joy Tower",
  address: "AltF Joy Tower, Sector 62, Gurugram, Haryana 201309",
  images: [heroImg, gallery1, gallery2, gallery3],
  plans: [
    {
      title: "Dedicated Desk",
      desc:
        "Fixed workstation in a shared workspace with all amenities included.",
      price: "₹7,999 / seat / month",
      image: dedicatedImg,
    },
    {
      title: "Private Cabin",
      desc:
        "Fully furnished private office ideal for teams and growing startups.",
      price: "₹12,999 / seat / month",
      image: privateImg,
    },
  ],
};

export default function ShowCard() {
  const [activeImage, setActiveImage] = useState(null);

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
              {spaceData.name}
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
                src={spaceData.images[0]}
                alt="Workspace"
                onClick={() => setActiveImage(spaceData.images[0])}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>

            {/* SMALL IMAGES */}
            <div className="grid grid-cols-2 gap-4">
              {spaceData.images.slice(1).map((img, i) => (
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
          <div className="mt-20 space-y-6">
            <h2 className="text-3xl font-semibold">
              Seating Plans
            </h2>

            {spaceData.plans.map((plan, i) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-4">
                  {/* IMAGE */}
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="h-40 w-full object-cover"
                  />

                  {/* CONTENT */}
                  <div className="md:col-span-3 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                      <h3 className="text-lg font-semibold">
                        {plan.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 max-w-md">
                        {plan.desc}
                      </p>
                    </div>

                    <div className="text-right">
                      
                     <a
  href="#get-quote"
  className="
    w-full md:w-auto
    mt-4 md:mt-0
    text-center
    bg-blue-600 text-white
    px-6 py-3 text-sm
    rounded-full
    hover:bg-blue-700 transition
  "
>
  Enquire Now
</a>

                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* GET QUOTE SECTION */}
<div  id="get-quote" className="mt-24 py-20 bg-gray-100">
  <motion.div 
  initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.8,
      ease: "easeOut",
    }}
  className="flex justify-center px-4">
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
