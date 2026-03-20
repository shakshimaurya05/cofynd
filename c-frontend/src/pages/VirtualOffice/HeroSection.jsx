import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useState } from "react";

import heroBg from "../../assets/hero11.png";

export default function HeroSection({ city }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: city, 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase()]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData); 
  };

  return (
    <>
      <Navbar />

      <section
        className="relative w-full min-h-[90vh] flex items-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    
        <div className="relative max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center text-white">

          {/* LEFT */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.1,
              ease: [0.25, 0.8, 0.25, 1],
            }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-5 leading-snug">
              Virtual Office in {city}
            </h1>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Get a premium business address in{" "}
              <span className="text-white font-medium">{city}</span> for GST
              registration, company incorporation, and professional branding —
              without paying high office rent.
              <br /><br />
              Ideal for startups, freelancers, and growing businesses looking
              to establish credibility while keeping costs low.
              Enjoy mail handling, professional business support, and a prime
              location that gives your business a competitive edge. Whether
              you're a startup, freelancer, or expanding company, this is the
              smartest way to scale affordably.
            </p>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.3,
              delay: 0.2,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl max-w-md w-full mx-auto"
          >
            <h3 className="text-xl font-medium mb-5 text-white">
              Get a Quote
            </h3>

            <input
              placeholder="Name"
              onChange={handleChange}
              className="w-full mb-4 p-3 rounded bg-white/20 text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              placeholder="Email"
              onChange={handleChange}
              className="w-full mb-4 p-3 rounded bg-white/20 text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              placeholder="Phone"
              onChange={handleChange}
              className="w-full mb-5 p-3 rounded bg-white/20 text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-base font-semibold py-3 rounded-md transition duration-300"
            >
              Get Quote →
            </button>

            <p className="text-xs text-gray-300 mt-4">
              No spam. 100% secure.
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
}