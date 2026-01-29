import { useState } from "react";

export default function GetQuote({ spaceTitle, spaceLocation }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    seats: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (loading) return; 

    setLoading(true);
    setShowSuccess(true); 

    try {
      await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "property-page-quote",
          spaceTitle,
          spaceLocation,
        }),
      });

      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "",
        seats: "",
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <div
        className="
          bg-gradient-to-b from-blue-50 to-blue-100
          rounded-2xl md:rounded-3xl
          p-4 md:p-6
          shadow-md
          max-w-md w-full
        "
      >
        {/* HEADER */}
        <h3 className="text-xl font-semibold text-center">
          Are you interested in this property?
        </h3>
        <p className="text-gray-600 text-sm mt-1 text-center">
          Fill your details for a customized quote
        </p>

        {/* FORM */}
        <div className="mt-6 space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name*"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 Phone*"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* TYPE & SEATS */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Type</option>
              <option value="dedicated-desk">Dedicated Desk</option>
              <option value="private-cabin">Private Cabin</option>
            </select>

            <select
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">No. of Seats</option>
              <option value="1-20">1 – 20</option>
              <option value="20-50">20 – 50</option>
              <option value="50-100">50 – 100</option>
              <option value="100+">100+</option>
            </select>
          </div>

          {/* CTA */}
          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`w-full py-3 rounded-xl font-medium transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {loading ? "Submitting..." : "Enquire Now"}
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-center border-t pt-4">
          <p className="text-sm font-medium">
            Connect with our space expert
          </p>
          <p className="text-sm text-blue-600">
            coworkspaze@gmail.com
          </p>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm">
            <h3 className="text-2xl font-semibold mb-3">
              Thank you!
            </h3>
            <p className="text-gray-600 mb-6">
              Our team will contact you shortly with a quote.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
