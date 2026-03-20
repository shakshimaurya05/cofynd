import { motion } from "framer-motion";
import { Briefcase, MapPin, IndianRupee, Zap } from "lucide-react";
import { useState } from "react";
import QuoteModal from "./QuoteModal";
const benefits = [
  {
    title: "GST Registration",
    desc: "Use a valid business address for GST and company registration without needing a physical office.",
    icon: <Briefcase size={28} />,
  },
  {
    title: "Professional Address",
    desc: "Enhance your brand image with a premium address in prime business locations.",
    icon: <MapPin size={28} />,
  },
  {
    title: "Low Cost Setup",
    desc: "Avoid high rentals and operational costs while maintaining a strong business presence.",
    icon: <IndianRupee size={28} />,
  },
  {
    title: "Business Flexibility",
    desc: "Operate your business from anywhere while maintaining a credible office presence.",
    icon: <Zap size={28} />,
  },
];

export default function BenefitsSection() {
   const [open, setOpen] = useState(false);
  return (
    <section className="bg-blue-950 py-20 px-6">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14 text-white">
        Benefits of Virtual Office
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {benefits.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5, // faster entry
              delay: i * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true }}

            // ⚡ INSTANT hover (no delay feel)
            whileHover={{
              scale: 1.07,
              rotateX: 6,
              rotateY: -6,
              transition: { duration: 0.15 }, // VERY FAST
            }}

            className="bg-white p-6 rounded-2xl shadow-md text-center cursor-pointer will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Icon */}
            <div className="mb-4 text-blue-600 flex justify-center">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

    
      <div className="text-center mt-14">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg shadow-md" onClick={() => setOpen(true)}
        >
          Get Your Virtual Office →
        </motion.button>
          {open && (
                <QuoteModal
                  city="Noida"
                  onClose={() => setOpen(false)}
                />
              )}
      </div>

    </section>
  );
}