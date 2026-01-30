import propertyImg from "../assets/hero1.webp";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    spaceType: "",
    city: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false); //  important

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (loading) return; //  prevent double click

    setLoading(true);
    setShowSuccess(true);

    try {
      await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        spaceType: "",
        city: "",
      });
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FAFAFA] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow p-8 md:p-12 flex flex-col md:flex-row gap-12"
        >
          {/* LEFT */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold">
              Let’s help you find the perfect property
            </h2>
            <p className="text-gray-500 mt-2">
              Connect with a Cowork Spaze Expert today
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name*"
                className="border rounded-full px-5 py-3"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                className="border rounded-full px-5 py-3"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone*"
                className="border rounded-full px-5 py-3"
              />

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-full px-5 py-3"
              >
                <option value="">Select City</option>
                <option value="gurgaon">Gurugram</option>
              </select>

              <button
                disabled={loading}
                onClick={handleSubmit}
                className={`rounded-full px-6 py-3 text-white transition
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#084B87] hover:bg-blue-500"
                  }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-purple-100">
              <img
                src={propertyImg}
                alt="Property"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-semibold mb-3">
              Thank you!
            </h3>
            <p className="text-gray-600 mb-6">
              Our team will contact you shortly.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-orange-400 px-6 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
