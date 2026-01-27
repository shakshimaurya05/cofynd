import { motion } from "framer-motion";
import {
  FaBuilding,
  FaPrint,
  FaEnvelope,
  FaUserTie,
  FaHandshake,
  FaPhoneAlt,
} from "react-icons/fa";

import officeImg from "../assets/hero3.webp";

export default function FeaturedAndCTA() {
  return (
    <section className="bg-white">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">

          {/* SIMPLE MOTION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-[#F6F7F9] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
          >

            {/* LEFT CONTENT */}
            <div className="p-10 md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Book Your Workspace{" "}
                <span className="text-yellow-500">With Cowork Spaze</span>
              </h2>

              <div className="grid grid-cols-2 gap-6 mt-8 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaBuilding />
                  <span>Fully Furnished Offices</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaHandshake />
                  <span>High-Speed Internet</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaUserTie />
                  <span>Flexible Seating Plans</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaPrint />
                  <span>Printer</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaHandshake />
                  <span>Meeting Rooms & Cabins</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaUserTie />
                  <span>Managed Office Support</span>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-sm" />
                  <span>+91 9311 32 8049</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-sm" />
                  <span>coworkspaze@gmail.com</span>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="md:w-1/2">
              <img
                src={officeImg}
                alt="Workspace"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
