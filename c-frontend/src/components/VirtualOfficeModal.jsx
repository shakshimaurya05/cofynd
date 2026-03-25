import { motion } from "framer-motion";

export default function VirtualOfficeModal({ cities, onClose, navigate }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* BACKDROP CLICK */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* MODAL */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white rounded-2xl p-9 w-[90%] max-w-4xl shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          Select Your City
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">

          {cities.map((city, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/virtual-office/${city.name.toLowerCase()}`);
                onClose();
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-10 h-10 object-contain"
                />
              </div>

              <p className="text-sm mt-2">{city.name}</p>
            </div>
          ))}

        </div>
      </motion.div>
    </div>
  );
}