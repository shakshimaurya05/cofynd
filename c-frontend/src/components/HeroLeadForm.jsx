import { useState } from "react";
import { motion } from "framer-motion";

export default function HeroLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    spaceType: "",
    city: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setShowSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        spaceType: "",
        city: "",
      });
    } catch (error) {
      console.error("Error submitting lead:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
        className="
          w-full max-w-md
          border border-white/30
          bg-white/10 backdrop-blur-xl
          rounded-2xl p-8
          text-white
          shadow-xl
        "
      >
  
        <h3 className="text-2xl font-semibold mb-2">
          Get Free Consultation
        </h3>
        <p className="text-sm text-white/70 mb-6">
          Our coworking experts will reach out shortly
        </p>

        <div className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name*"
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone*"
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none"
          />

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none"
          >
            <option value="">Select City</option>
            <option value="gurgaon">Gurugram</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-medium hover:bg-yellow-500 transition"
          >
            Submit
          </button>
        </div>
      </motion.div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-3">Thank you!</h3>
            <p className="text-gray-600 mb-6">
              Our team will contact you shortly.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-yellow-400 px-6 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
