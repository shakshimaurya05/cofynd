import { useState, useEffect } from "react";
import {
  FaCompass,
  FaSearch,
  FaChevronDown,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

const cities = ["Delhi", "Noida", "Gurgaon", "Greater Noida"];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);

  // CLOSE DROPDOWN WHEN CLICKING ANYWHERE
  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">

        {/* LOGO */}
        <div className="flex items-center text-2xl font-bold text-blue-900 cursor-pointer">
          <FaCompass className="mr-2" />
          cofynd
        </div>

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center border rounded-full px-4 py-2 w-[420px] mx-8">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search coworking, coliving..."
            className="outline-none w-full text-sm"
          />
        </div>

        {/* MENU */}
        <div
          className="flex items-center gap-6 text-sm font-medium ml-auto"
          onClick={(e) => e.stopPropagation()}   
        >
          {["Coworking", "Coliving", "Virtual Office"].map((item) => (
            <div key={item} className="relative">
              <button
                onClick={() =>
                  setOpenMenu(openMenu === item ? null : item)
                }
                className="flex items-center gap-1 hover:text-blue-800"
              >
                {item}
                <FaChevronDown size={12} />
              </button>

              {/* DROPDOWN */}
              {openMenu === item && (
                <div className="absolute top-8 left-0 bg-white border rounded-md shadow-sm w-44">
                  {cities.map((city) => (
                    <div
                      key={city}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setOpenMenu(null)}
                    >
                      <FaMapMarkerAlt className="text-blue-700" />
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* CONTACT US */}
          <button className="border px-4 py-2 rounded-full hover:bg-gray-50">
            Contact Us
          </button>

          {/* LOGIN */}
          <button className="flex items-center gap-2 border px-4 py-2 rounded-full hover:bg-gray-50">
            <FaUser />
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
