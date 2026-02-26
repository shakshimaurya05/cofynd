import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import GetQuote from "./getQuote.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function ListingCard({ item }) {

  const navigate=useNavigate();
const [showQuote, setShowQuote] = useState(false);

  return (
    <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  loading="eager"
  decoding="async"
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  onClick={() => navigate(`/space/${item._id}`)}
      className="cursor-pointer"
  
>

    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 
                    shadow-[0_8px_30px_rgba(0,0,0,0.05)] 
                    hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                    transition-all duration-300 hover:-translate-y-1">
    <div className="overflow-hidden">
     <img
  src={item.image}
  alt={item.name}
  className="h-48 w-full object-cover"
/>
</div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <FaMapMarkerAlt size={12} />
          {item.location}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="font-semibold">
            ₹{item.pricePerMonth}/month
          </p>

          <button   onClick={(e) => {
    e.stopPropagation(); 
    setShowQuote(true);
  }}className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full">
            Get Quote
          </button>
        </div>
      </div>
    </div>
    {showQuote && (
  <div
    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 "
    onClick={() => setShowQuote(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative"
    >
      <GetQuote spaceTitle={item.name} spaceLocation={item.location} />

      {/* Close button */}
      <button
        onClick={() => setShowQuote(false)}
        className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
      >
         <FaTimes size={14} />
      </button>
    </div>
  </div>
)}

    </motion.div>
  );
}
