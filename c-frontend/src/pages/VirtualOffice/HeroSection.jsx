import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import API_URL from "../../config";

import heroBg from "../../assets/hero11.png";

export default function HeroSection({ city }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: city,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      city,
    }));
  }, [city]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/virtual-office/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "virtual-office",
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city,
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center text-white">
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
              registration, company incorporation, and professional branding -
              without paying high office rent.
              <br />
              <br />
              Ideal for startups, freelancers, and growing businesses looking
              to establish credibility while keeping costs low. Enjoy mail
              handling, professional business support, and a prime location
              that gives your business a competitive edge. Whether you're a
              startup, freelancer, or expanding company, this is the smartest
              way to scale affordably.
            </p>
          </motion.div>

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

            {error && (
              <div className="mb-4 rounded bg-red-500/20 p-3 text-sm text-red-100">
                {error}
              </div>
            )}

            <input
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
              className="w-full mb-4 p-3 rounded bg-white/20 text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full mb-4 p-3 rounded bg-white/20 text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              name="phone"
              value={formData.phone}
              placeholder="Phone"
              onChange={handleChange}
              className="w-full mb-5 p-3 rounded bg-white/20 text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-70 text-black text-base font-semibold py-3 rounded-md transition duration-300"
            >
              {loading ? "Submitting..." : "Get Quote ->"}
            </button>

            <p className="text-xs text-gray-300 mt-4">
              No spam. 100% secure.
            </p>
          </motion.div>
        </div>
      </section>

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">
              Thank you!
            </h3>
            <p className="mb-6 text-gray-600">
              We received your virtual office inquiry for {city}. Our team will
              connect with you shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="rounded-full bg-yellow-400 px-6 py-2 font-medium text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
