import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaCheckCircle, FaEnvelope } from "react-icons/fa";

export default function ContactModal({ onClose }) {
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    spaceType: "",
    city: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        spaceType: form.spaceType || "general",
        city: form.city || "india",
      }),
    });

    setShowSuccess(true);
  };

  return (
    <>
    
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />


      <motion.div
        className="fixed inset-y-0 right-0 z-[1000] w-full max-w-xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="h-full bg-white/10 backdrop-blur-xl border-l border-white/30 text-white relative">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white"
          >
            <FaTimes size={18} />
          </button>

          <div className="h-full overflow-y-auto p-8 flex flex-col">

            {/* HEADER */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Let’s Find the Right Workspace for You
              </h2>
              <p className="text-sm text-white/70">
                Share your requirements and our experts will suggest the
                best-fit options tailored to your needs.
              </p>
            </div>

            {/* FEATURES */}
            <div className="space-y-3 mb-8 text-sm">
              {[
                "Personalized workspace recommendations",
                "Access to verified spaces",
                "Transparent pricing & flexible plans",
                "Free expert assistance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-white" />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-auto">
              <input
                placeholder="Full Name"
                className="w-full bg-transparent border border-white/40 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-white"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Email Address"
                className="w-full bg-transparent border border-white/40 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-white"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                placeholder="Mobile Number"
                className="w-full bg-transparent border border-white/40 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-white"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  className="bg-transparent border border-white/40 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                  onChange={(e) =>
                    setForm({ ...form, spaceType: e.target.value })
                  }
                >
                  <option value="" className="text-black">
                    Space Type
                  </option>
                  <option value="coworking" className="text-black">
                    Coworking
                  </option>
                </select>

                <select
                  className="bg-transparent border border-white/40 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                >
                  <option value="" className="text-black">
                    Preferred City
                  </option>
                  <option value="gurgaon" className="text-black ">
                    Gurugram
                  </option>
                </select>
              </div>

              <button className="w-full border border-white rounded-lg py-2 text-white font-medium hover:bg-yellow-500 hover:text-black transition">
                Get Recommendations
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-6 flex items-center gap-2 text-sm text-white/70">
              <FaEnvelope />
              <span>coworkspaze@gmail.com.com</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SUCCESS */}
      {showSuccess && (
        <motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="border border-white/40 bg-white/10 backdrop-blur-xl text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-semibold mb-2">
              Request Submitted
            </h3>
            <p className="text-white/70 mb-6">
              Our team will connect with you shortly.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
