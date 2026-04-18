import { useState, useEffect } from "react";
import logo from "../assets/logos/mainLogo2.png"
import { AnimatePresence } from "framer-motion";
import VirtualOfficeModal from "./VirtualOfficeModal";
import {
  FaSearch,
  FaChevronDown,
  FaMapMarkerAlt,

  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal";

import gurgaonImg from "../assets/cities/gurgaon.jpg"; 
import bangaloreImg from "../assets/cities/banglore.jpg"; 
import mumbaiImg from "../assets/cities/mumbai.jpg"; 
import hyderabadImg from "../assets/cities/hyderabad.webp"; 
import puneImg from "../assets/cities/pune.jpg"; 
import delhiImg from "../assets/cities/delhi.jpg"; 
import noidaImg from "../assets/cities/noida.avif"; 
import ahmedabadImg from "../assets/cities/ahemdabad.jpg"; 
import indoreImg from "../assets/cities/indore.jpg"; 
import chennaiImg from "../assets/cities/chennai.jpg"; 
import kochiImg from "../assets/cities/kochi.jpg"; 
import jaipurImg from "../assets/cities/jaipur.jpg"; 
import bhubaneswarImg from "../assets/cities/bhubhnasewar.jpg";
import coimbatoreImg from "../assets/cities/coimbatore.webp"; 
import chandigarhImg from "../assets/cities/chandigarh.jpg"; 
import goaImg from "../assets/cities/goa.jpg"; 
import kolkataImg from "../assets/cities/kolkata.webp";
import lucknowImg from "../assets/cities/lucknow.jpg";


const cities = [ { name: "Gurugram", img: gurgaonImg },
   { name: "Bangalore", img: bangaloreImg },
    { name: "Mumbai", img: mumbaiImg },
     { name: "Hyderabad", img: hyderabadImg }, 
     { name: "Pune", img: puneImg }, 
     { name: "Delhi", img: delhiImg }, 
     { name: "Noida", img: noidaImg }, 
     { name: "Ahmedabad", img: ahmedabadImg }, 
     { name: "Indore", img: indoreImg }, 
     { name: "Chennai", img: chennaiImg }, 
     { name: "Kochi", img: kochiImg }, 
     { name: "Jaipur", img: jaipurImg }, 
     { name: "Bhubaneswar", img: bhubaneswarImg }, 
     { name: "Coimbatore", img: coimbatoreImg }, 
     { name: "Chandigarh", img: chandigarhImg },
     { name: "Goa", img: goaImg }, 
     { name: "Lucknow", img:lucknowImg},
     { name: "Kolkata", img: kolkataImg }, ];

export default function Navbar() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
const [showVirtual, setShowVirtual] = useState(false);
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">

        {/* LOGO */}
<div
  onClick={() => navigate("/")}
  className="flex items-center cursor-pointer flex-shrink-0 h-10 pl-2"
>
  <img
    src={logo}
    alt="CoworkSpaze Logo"
    className="h-full w-auto object-contain scale-150"
  />
</div>


        {/* SEARCH */}
        <div className="hidden lg:flex items-center border rounded-full px-4 py-2 flex-1 max-w-md ml-4 sm:ml-9">
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
         <a href="mailto:info@coworkspaze.com">
  info@coworkspaze.com |
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
  onClick={() => setShowVirtual(true)}
  className="hover:text-blue-800"
>
  Virtual Office
</button>
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
    setShowVirtual(true);
    setMobileOpen(false); // close menu after click
  }}
  className="w-full text-left text-sm font-medium"
>
  Virtual Office
</button>

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
            info@coworkspaze.com
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      <AnimatePresence>
      {showContact && (
        <ContactModal onClose={() => setShowContact(false)} />
      )}
      </AnimatePresence>
      <AnimatePresence>
  {showVirtual && (
    <VirtualOfficeModal
      cities={cities}
      onClose={() => setShowVirtual(false)}
      navigate={navigate}
    />
  )}
</AnimatePresence>
    </nav>
  );
}
