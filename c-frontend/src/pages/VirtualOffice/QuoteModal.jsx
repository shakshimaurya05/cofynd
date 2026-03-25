import { useState } from "react";
import { Check } from "lucide-react";

const citiesList = [
  "Gurugram", "Bangalore", "Mumbai", "Hyderabad",
  "Pune", "Delhi", "Noida", "Ahmedabad",
  "Indore", "Chennai", "Kochi", "Jaipur",
  "Bhubaneswar", "Coimbatore", "Chandigarh",
  "Goa", "Lucknow", "Kolkata"
];

export default function QuoteModal({ city, onClose }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: city || citiesList[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData); // ready for backend/mail
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl overflow-hidden w-[800px] grid md:grid-cols-2 shadow-2xl">

        {/* LEFT SIDE */}
        <div className="bg-yellow-100 p-8 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-6">
            Why Choose Our Virtual Office?
          </h3>

          <ul className="space-y-4 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <Check size={18} className="text-green-600" />
              Prime business address in top cities
            </li>
            <li className="flex items-center gap-2">
              <Check size={18} className="text-green-600" />
              GST & company registration support
            </li>
            <li className="flex items-center gap-2">
              <Check size={18} className="text-green-600" />
              Mail handling & business services
            </li>
            <li className="flex items-center gap-2">
              <Check size={18} className="text-green-600" />
              Affordable & flexible plans
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-8">

          <h3 className="text-lg font-semibold mb-5">
            Get Virtual Office in {formData.city}
          </h3>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full mb-3 p-3 border rounded"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full mb-3 p-3 border rounded"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full mb-4 p-3 border rounded"
          />

          {/* CITY DROPDOWN */}
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded"
          >
            {citiesList.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg"
          >
            Get Quote →
          </button>

          <button
            onClick={onClose}
            className="mt-4 text-sm text-gray-500"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}