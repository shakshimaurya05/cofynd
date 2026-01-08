import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function CityActionModal({ city, onClose }) {
  const navigate = useNavigate();

  const options = [
    { label: "Coworking", path: "coworking" },
    { label: "Coliving", path: "coliving" },
    { label: "Virtual Office", path: "virtual-office" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-md p-8 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <FaTimes />
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-2">
          Find Spaces in {city.toUpperCase()}
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Choose what you are looking for
        </p>

        {/* OPTIONS */}
        <div className="grid grid-cols-3 gap-4">
          {options.map((opt) => (
            <button
              key={opt.path}
              onClick={() => navigate(`/${opt.path}/${city.toLowerCase()}`)}
              className="border rounded-xl py-4 text-sm font-medium hover:bg-blue-50 hover:border-blue-500"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
