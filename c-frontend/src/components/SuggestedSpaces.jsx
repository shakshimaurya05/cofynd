import ListingCard from "./ListingCard";
import { useEffect, useState } from "react";
import { fetchSpaces } from "../api/spaces";
import { motion } from "framer-motion";

export default function SuggestedSpaces() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpaces({ city: "gurugram", limit: 12 })
      .then((data) => {
        setSpaces(data.spaces || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Suggested Spaces
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Explore our top recommended coworking spaces designed for productivity and comfort.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spaces.map((item) => (
            <ListingCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
