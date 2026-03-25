import { motion } from "framer-motion";
import { MapPin, FileText, Rocket } from "lucide-react";
import { useState } from "react";
import QuoteModal from "./QuoteModal";
const steps = [
  {
    title: "Choose Location",
    desc: "Select a prime business location for your company.",
    icon: <MapPin size={26} />,
  },
  {
    title: "Submit Documents",
    desc: "Upload your documents quickly and securely.",
    icon: <FileText size={26} />,
  },
  {
    title: "Start Business",
    desc: "Get your virtual office completely ready and go live.",
    icon: <Rocket size={26} />,
  },
];

export default function StepsSection() {
   const [open, setOpen] = useState(false);
  return (
    <section className="bg-gray-100 py-16 px-6 text-center">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-12">
        Virtual Office Setup in 3 Easy Steps
      </h2>

      <div className="relative max-w-5xl mx-auto">

        {/* Connecting Line */}
        <div className="hidden md:block absolute bottom-6 left-0 w-full h-[2px] bg-gray-300"></div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative"
            >
              {/* CARD */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                
                {/* Icon */}
                <div className="text-blue-600 mb-3 flex justify-center">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600">
                  {step.desc}
                </p>
              </div>

              {/* CIRCLE STEP NUMBER */}
              <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-md z-10">
                {i + 1}
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      <div className="mt-16">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300" onClick={() => setOpen(true)}>
          Get Your Setup Today →
        </button>

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