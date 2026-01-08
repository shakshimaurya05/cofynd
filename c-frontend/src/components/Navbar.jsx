import { useState, useEffect } from "react";
import {
  FaCompass,
  FaSearch,
  FaChevronDown,
  FaMapMarkerAlt,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal";

const cities = ["Delhi", "Noida", "Gurgaon", "Greater Noida"];
const menus = ["Coworking", "Coliving", "Virtual Office"];

export default function Navbar() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);        // desktop
  const [mobileOpen, setMobileOpen] = useState(false);  // mobile toggle
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const handleNavigate = (type, city) => {
    const spaceType = type.toLowerCase().replace(" ", "-");
    const citySlug = city.toLowerCase().replace(" ", "-");
    navigate(`/${spaceType}/${citySlug}`);
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center text-2xl font-bold text-blue-900 cursor-pointer"
        >
          <FaCompass className="mr-2" />
          cofynd
        </div>

 
        <div className="flex items-center border rounded-full px-4 py-2 flex-1 max-w-md">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search coworking, coliving..."
            className="outline-none w-full text-sm"
          />
        </div>

        {/* DESKTOP MENU */}
        <div
          className="hidden md:flex items-center gap-6 text-sm font-medium ml-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {menus.map((item) => (
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

              {openMenu === item && (
                <div className="absolute top-8 left-0 bg-white border rounded-md shadow-sm w-44">
                  {cities.map((city) => (
                    <div
                      key={city}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleNavigate(item, city)}
                    >
                      <FaMapMarkerAlt className="text-blue-700" />
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => setShowContact(true)}
            className="border px-4 py-2 rounded-full hover:bg-gray-50"
          >
            Contact Us
          </button>

          <button className="flex items-center gap-2 border px-4 py-2 rounded-full hover:bg-gray-50">
            <FaUser />
            Login
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-xl"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setMobileDropdown(null);
          }}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">

          {menus.map((item) => (
            <div key={item} className="border-b pb-3">
              <button
                className="w-full flex justify-between items-center font-semibold"
                onClick={() =>
                  setMobileDropdown(
                    mobileDropdown === item ? null : item
                  )
                }
              >
                {item}
                <FaChevronDown
                  className={`transition-transform ${
                    mobileDropdown === item ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileDropdown === item && (
                <div className="mt-3 space-y-2 pl-4">
                  {cities.map((city) => (
                    <div
                      key={city}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                      onClick={() => handleNavigate(item, city)}
                    >
                      <FaMapMarkerAlt />
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              setShowContact(true);
              setMobileOpen(false);
            }}
            className="w-full border px-4 py-2 rounded-full"
          >
            Contact Us
          </button>

          <button className="w-full border px-4 py-2 rounded-full flex items-center justify-center gap-2">
            <FaUser />
            Login
          </button>
        </div>
      )}

      {/* CONTACT MODAL */}
      {showContact && (
        <ContactModal onClose={() => setShowContact(false)} />
      )}
    </nav>
  );
}
