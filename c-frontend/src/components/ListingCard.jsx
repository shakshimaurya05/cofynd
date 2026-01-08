import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
const images = require.context(
   "../assets/listings",
  true,
  /\.(png|jpe?g|webp|avif)$/
);

export default function ListingCard({ item }) {
  const imageSrc = images(
    `./${item.spaceType}/${item.image}`
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 
                    shadow-[0_8px_30px_rgba(0,0,0,0.05)] 
                    hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                    transition-all duration-300 hover:-translate-y-1">
    <div className="overflow-hidden">
      <img
          src={imageSrc}
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

        <div className="flex items-center gap-1 mt-2">
          <FaStar className="text-yellow-400" size={14} />
          <span className="text-sm">{item.rating}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="font-semibold">
            ₹{item.pricePerMonth}/month
          </p>

          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}
