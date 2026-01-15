import { useState } from "react";
import {
  FaTimes,
  FaCheckCircle,
  FaEnvelope
} from "react-icons/fa";

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
        spaceType: form.spaceType || "contact",
        city: form.city || "general",
      }),
    });

    setShowSuccess(true);
  };

  return (
    <>
      {/* MODAL */}
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <FaTimes size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white">
              <h2 className="text-xl font-semibold mb-2">
                Find Your Perfect Space Now!
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Our space experts will provide customized quotes with detailed
                inventory as per your needs.
              </p>

              <div className="space-y-3 text-sm">
                {[
                  "Customized Space",
                  "Prime Locations",
                  "Expert Guided Tours",
                  "Flexible Terms",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <FaCheckCircle className="text-blue-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="p-8">
              <h2 className="text-xl font-semibold mb-1">
                Yes, I am Interested!
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Fill your details for a customized quote
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  placeholder="Name*"
                  className="w-full border rounded-lg px-4 py-2"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  placeholder="Email*"
                  className="w-full border rounded-lg px-4 py-2"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <input
                  placeholder="+91 Phone*"
                  className="w-full border rounded-lg px-4 py-2"
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    className="border rounded-lg px-3 py-2 text-sm"
                    onChange={(e) =>
                      setForm({ ...form, spaceType: e.target.value })
                    }
                  >
                    <option value="">Type Of Space</option>
                    <option value="coworking">Coworking</option>
                    <option value="coliving">Coliving</option>
                    <option value="virtual-office">Virtual Office</option>
                  </select>

                  <select
                    className="border rounded-lg px-3 py-2 text-sm"
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                  >
                    <option value="">Select City</option>
                    <option value="delhi">Delhi</option>
                    <option value="noida">Noida</option>
                    <option value="gurgaon">Gurugram</option>
                  </select>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                  Submit
                </button>
              </form>

              <div className="mt-5 flex items-center gap-3 text-sm text-gray-600">
                <FaEnvelope />
                <span>hello@cofynd.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-semibold mb-2">Thank you!</h3>
            <p className="text-gray-600 mb-6">
              Our team will contact you shortly.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
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
