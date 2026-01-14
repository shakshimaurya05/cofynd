import propertyImg from "../assets/cards/coworking.jpg";
import { useState } from "react";

export default function LeadForm() {
   const [showSuccess, setShowSuccess] = useState(false);
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-white rounded-3xl 
shadow-[0_10px_30px_rgba(0,0,0,0.08)] 
border border-gray-100 
p-8 md:p-12 
flex flex-col md:flex-row items-center gap-12 bg-gradient-to-b from-white to-gray-50
">


        
          <div className="md:w-2/3 w-full">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Let us find your perfect Property
            </h2>
            <p className="text-gray-500 mt-2">
              Connect to a CoFynd Space Expert now
            </p>

        
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

              <input
                type="text"
                placeholder="Name*"
                className="border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="email"
                placeholder="Email*"
                className="border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="tel"
                placeholder="+91  Phone*"
                className="border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-yellowring-yellow-400"
              />

              <select className="border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Type Of Space</option>
                <option>Coworking</option>
                <option>Coliving</option>
                <option>Virtual Office</option>
              </select>

              <select className="border rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400">
                <option>Select City*</option>
                <option>Delhi</option>
                <option>Gurugram</option>
                <option>Noida</option>
                <option>Greater Noida</option>
              </select>

              <button className="bg-yellow-400 hover:bg-yellow-500 transition text-black font-medium rounded-full px-6 py-3"  type="button"
  onClick={() => setShowSuccess(true)}>
                Submit
              </button>

            </div>
          </div>

          
          <div className="md:w-1/3 w-full flex justify-center">
            <div className="w-64 h-64 rounded-full border-8 border-purple-100 overflow-hidden">
              <img
                src={propertyImg}
                alt="Property"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
      {showSuccess && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl">
      <h3 className="text-2xl font-semibold mb-3">
        Thank you!
      </h3>
      <p className="text-gray-600 mb-6">
        Our team will contact you shortly.
      </p>

      <button
        onClick={() => setShowSuccess(false)}
        className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full font-medium"
      >
        Close
      </button>
    </div>
  </div>
)}

    </section>
  );
}
