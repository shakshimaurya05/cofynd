import { useState } from "react";
import { motion } from "framer-motion";
import API_URL from "../config";

export default function HeroLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    spaceType: "",
    city: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!formData.city) {
      setError("City is required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

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
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
        className="
          w-full max-w-sm
          border border-white/30
          bg-white/10 backdrop-blur-xl
          rounded-xl p-6
          text-white
          shadow-xl
        "
      >
        <h3 className="text-xl font-semibold mb-2">
          Get Free Consultation
        </h3>
        <p className="text-xs text-white/70 mb-4">
          Our coworking experts will reach out shortly
        </p>

        <div className="space-y-3">

          {error && (
            <div className="text-red-300 text-sm">
              {error}
            </div>
          )}

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name*"
            className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2.5 text-white placeholder-white/60 text-sm focus:outline-none"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2.5 text-white placeholder-white/60 text-sm focus:outline-none"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone*"
            className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2.5 text-white placeholder-white/60 text-sm focus:outline-none"
          />

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none"
          >
            <option value="" className="text-black">
              Select City
            </option>
            <option value="Gurugram" className="text-black">
              Gurugram
            </option>
          </select>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`w-full py-2.5 rounded-lg font-medium text-sm transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-500"
              }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </motion.div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Thank you!
            </h3>
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