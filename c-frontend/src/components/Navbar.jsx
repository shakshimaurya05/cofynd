import { useState, useEffect } from "react";
import logo from "../assets/logos/mainLogo.png"
import { AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaChevronDown,
  FaMapMarkerAlt,

  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const handleNavigate = () => {
    navigate("/coworking/gurgaon");
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">

        {/* LOGO */}
       <div
  onClick={() => navigate("/")}
  className="flex items-center cursor-pointer"
>
  <img
    src={logo}  
    alt="CoworkSpaze Logo"
    className="h-10 w-auto scale-[3] mr-9"
  />
</div>


        {/* SEARCH */}
        <div className="hidden sm:flex items-center border rounded-full px-4 py-2 flex-1 max-w-md">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search coworking spaces..."
            className="outline-none w-full text-sm"
          />
        </div>

        {/* DESKTOP MENU */}
        <div
          className="hidden md:flex items-center gap-6 text-sm font-medium ml-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* EMAIL */}
         <a href="mailto:coworkspaze@gmail.com">
  coworkspaze@gmail.com |
</a>


          {/* COWORKING DROPDOWN */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenMenu(openMenu === "coworking" ? null : "coworking")
              }
              className="flex items-center gap-1 hover:text-blue-800"
            >
              Coworking
              <FaChevronDown size={12} />
            </button>

            {openMenu === "coworking" && (
              <div className="absolute top-8 left-0 bg-white border rounded-md shadow-sm w-44">
                <div
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleNavigate}
                >
                  <FaMapMarkerAlt className="text-blue-700" />
                  Gurugram
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowContact(true)}
            className="border px-4 py-2 rounded-full hover:bg-gray-50"
          >
            Contact Us
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-xl ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">

          <div className="font-semibold">Coworking</div>

          <div
            className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer pl-2"
            onClick={handleNavigate}
          >
            <FaMapMarkerAlt />
            Gurugram
          </div>

          <button
            onClick={() => {
              setShowContact(true);
              setMobileOpen(false);
            }}
            className="w-full border px-4 py-2 rounded-full"
          >
            Contact Us
          </button>

          

          <div className="text-center text-sm text-gray-500">
            coworkspaze@gmail.com
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      <AnimatePresence>
      {showContact && (
        <ContactModal onClose={() => setShowContact(false)} />
      )}
      </AnimatePresence>
    </nav>
  );
}
