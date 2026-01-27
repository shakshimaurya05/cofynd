import { motion } from "framer-motion";
import Explore from "../assets/exploreSpaces.png";
import Enquiry from "../assets/sendEnquiry.png";
import Deal from "../assets/handShake.png";
const steps = [
  {
    id: 1,
    title: "Explore Spaces",
    description:
      "Browse and discover available spaces that match your needs and preferences.",
    image: Explore,
    animation: { x: -80, opacity: 0 },
  },
  {
    id: 2,
    title: "Send Enquiry",
    description:
      "Send a quote request or ask for consultation for the space you like.",
    image:Enquiry,
    animation: { y: 80, opacity: 0 },
  },
  {
    id: 3,
    title: "We Close the Deal",
    description:
      "We connect with you, call the leads, arrange visits, and close the deal.",
    image: Deal,
    animation: { x: 80, opacity: 0 },
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={step.animation}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4}}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              {/* Image */}
              <img
                src={step.image}
                alt={step.title}
                className="w-40 h-40 object-contain mb-6"
              />

              {/* Text */}
              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
