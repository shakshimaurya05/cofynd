import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// import your images
import delhi from "../../assets/cities/delhi.jpg";
import mumbai from "../../assets/cities/mumbai.jpg";
import bangalore from "../../assets/cities/banglore.jpg";
import hyderabad from "../../assets/cities/hyderabad.webp";
import pune from "../../assets/cities/pune.jpg";
import chennai from "../../assets/cities/chennai.jpg";
import noida from "../../assets/cities/noida.avif";
import gurgaon from "../../assets/cities/gurgaon.jpg";

const cities = [
  { name: "Delhi", img: delhi },
  { name: "Mumbai", img: mumbai },
  { name: "Bangalore", img: bangalore },
  { name: "Hyderabad", img: hyderabad },
  { name: "Pune", img: pune },
  { name: "Chennai", img: chennai },
  { name: "Noida", img: noida },
  { name: "Gurgaon", img: gurgaon },
];

export default function CitiesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50 px-6">

      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-14">
        Explore Top Cities
      </h2>

      {/* Grid */}
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {cities.map((city, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() =>
              navigate(`/virtual-office/${city.name.toLowerCase()}`)
            }
            className="relative h-56 rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
          >
            {/* Background Image */}
            <img
              src={city.img}
              alt={city.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>

            {/* City Name */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold transition-all duration-300 group-hover:top-1/2 group-hover:bottom-auto group-hover:-translate-y-1/2">
              {city.name}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}