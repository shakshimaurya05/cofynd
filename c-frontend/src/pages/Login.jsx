import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCheckCircle, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import {Link} from 'react-router-dom'


export default function ListProperty() {
  return (
    <>
      <Navbar />

      <section
  className="min-h-screen flex items-center bg-yellow-100/80"
 
>
        <div className="max-w-7xl mx-auto px- py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold mb-4">
              List Your Property With Cofynd.
            </h1>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-500" />
                Zero Brokerage
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-500" />
                Genuine leads and quick deals
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-yellow-500" />
                PAN India Network
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col pl-28">

            {/* FORM CARD */}
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-1 text-center">
               Welcome back!
              </h2>
              <p className="text-sm text-gray-500 mb-6 text-center">
                Login into your account to manage your properties.
              </p>

              <form className="space-y-4">
                

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
  type="password"
  placeholder="Password"
  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
/>

                <button
                  type="submit"
                  className="w-full border-2 border-blue-600 text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-900 hover:text-white transition"
                >
                  Submit
                </button>

                <p className="text-sm text-center mt-4">
                 Don't have an Account?{" "}
                <Link to="/list-your-property" className="text-blue-600">
 Create one
</Link>
                </p>
              </form>
            </div>

            
            <div className="mt-6 bg-white shadow-md rounded-xl px-6 py-4 w-full max-w-md">
              <p className="font-medium mb-2">
                Need Assistance in Listing
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaPhoneAlt /> +91 935 528 9999
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaEnvelope /> hello@cofynd.com
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
