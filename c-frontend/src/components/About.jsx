import { motion } from "framer-motion";
import aboutImg from "../assets/hero1.webp";
import logo from "../assets/logos/mainLogo.png"
export default function AboutCoworkSpaze() {
  return (
    <section className="bg-[#FAFAFA] py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-16 items-center">


        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" , delay: 0.2}}
          viewport={{ once: true }}
          className="max-w-3xl"
        >

          {/* LOGO */}
          <img
            src={logo}
            alt="CoworkSpaze"
            className="h-20 mb-6"
          />

          {/* HEADLINE */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Finding the right coworking space should not be complicated
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
           At <b>CoworkSpaze</b>, we help startups, freelancers, and growing teams discover the best coworking spaces near you, all in one place. From flexible desks to fully managed offices, we connect you with verified spaces that match your budget and work style.
            <br /><br />
          Browse verified listings, schedule free visits, and move in with confidence, we’ll handle the rest.
          </p>

        </motion.div>
         <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-[6px] border-blue shadow-xl">
            <img
              src={aboutImg}
              alt="Coworking Space Gurgaon"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
