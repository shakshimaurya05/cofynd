import { FaTimes, FaCheckCircle, FaEnvelope} from "react-icons/fa";

export default function ContactModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      {/* MODAL CARD */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="p-8 bg-gradient-to-br from-blue-50 to-white">
            <h2 className="text-xl font-semibold mb-2">
              Find Your Perfect Space Now!
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Our space experts will provide customized quotes with detailed
              inventory as per your needs.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                Customized Space
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                Prime Locations
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                Expert Guided Tours
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                Flexible Terms
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium mb-2">
                Trusted by top companies
              </p>

              {/* LOGO PLACEHOLDER (TEXT ONLY) */}
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span>INOX</span>
                <span>Kotak</span>
                <span>Razorpay</span>
                <span>CredAble</span>
                <span>AccioJob</span>
                <span>Classplus</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (FORM) */}
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-1">
              Yes, I am Interested!
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill your details for a customized quote
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name*"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Email*"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="tel"
                placeholder="+91 Phone*"
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 gap-3">
                <select className="border rounded-lg px-3 py-2 text-sm text-gray-500">
                  <option>Type Of Space</option>
                  <option>Coworking</option>
                  <option>Coliving</option>
                  <option>Virtual Office</option>
                </select>

                <select className="border rounded-lg px-3 py-2 text-sm text-gray-500">
                  <option>Select City</option>
                  <option>Delhi</option>
                  <option>Noida</option>
                  <option>Gurugram</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
              >
                Submit
              </button>
            </form>

            {/* FOOTER CONTACT */}
            <div className="mt-5 flex items-center gap-3 text-sm text-gray-600">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                
                <FaEnvelope />
              </div>  
                       
              <span>hello@cofynd.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
