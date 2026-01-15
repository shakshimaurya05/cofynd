import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function ListProperty() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    spaceType: "",
    city: "",
    location: "",
    pricePerMonth: "",
    rating: "",
    amenities: "",
    image: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Data:", formData); 
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-8">
            Property Details
          </h1>
           <p className="text-sm text-gray-500 text-center mb-6">
                Fill the form and our team will contact you
              </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Property Name"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              className="w-full border rounded-lg px-4 py-2"
              rows="4"
              onChange={handleChange}
              required
            />

            <select
              name="spaceType"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
              required
            >
              <option value="">Select Space Type</option>
              <option value="coworking">Coworking</option>
              <option value="coliving">Coliving</option>
              <option value="virtual-office">Virtual Office</option>
            </select>

            <select
              name="city"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              <option value="delhi">Delhi</option>
              <option value="gurgaon">Gurgaon</option>
              <option value="noida">Noida</option>
              <option value="greater-noida">Greater Noida</option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="Location / Area"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="pricePerMonth"
              placeholder="Price per Month (₹)"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              step="0.1"
              max="5"
              min="1"
              name="rating"
              placeholder="Rating (1–5)"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
            />

            <input
              type="text"
              name="amenities"
              placeholder="Amenities (comma separated)"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL (for now)"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-medium"
            >
              Submit Property
            </button>
          </form>

          {submitted && (
            <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-lg">
              Property submitted successfully
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
