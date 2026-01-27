import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero1.webp";
import { useEffect, useState, useMemo } from "react";
import HeroLeadForm from "./HeroLeadForm";

export default function Hero() {
  const navigate = useNavigate();
const texts = useMemo(() => [
  "200+ verified Coworking Spaces ",
  "Expert assistance ",
  "End-to-end support",
], []);

const [textIndex, setTextIndex] = useState(0);
const [displayText, setDisplayText] = useState("");
const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
  const currentText = texts[textIndex];
  let typingSpeed = isDeleting ? 40 : 80;

  const timeout = setTimeout(() => {
    if (!isDeleting) {
      // typing
      setDisplayText(currentText.substring(0, displayText.length + 1));

      if (displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1200); // pause before delete
      }
    } else {
      // deleting
      setDisplayText(currentText.substring(0, displayText.length - 1));

      if (displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, typingSpeed);

  return () => clearTimeout(timeout);
}, [displayText, isDeleting, textIndex, texts]);

  return (
    
    <section className="relative min-h-screen w-full overflow-hidden pt-24 pb-12">
      
     
     <motion.img
  src={heroImg}
  alt="Coworking Space Gurgaon"
  className="absolute inset-0 w-full h-full object-cover scale-110"
  initial={{ scale: 1.1, x: 0 }}
  animate={{ scale: 1.2, x: -40 }}
  transition={{
    duration: 25,
    ease: "linear",
    repeat: Infinity,
    repeatType: "mirror",
  }}
/>


      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

<div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center">

    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
      className="text-white"
    >
      <p className="uppercase tracking-widest text-sm text-yellow-400 mb-4">
        Workspaces Worth Working From
      </p>

      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Find the Perfect <br />
        Coworking Space in your City
      </h1>

      <p className="text-lg md:text-xl text-yellow-300 mt-6 h-[28px]">
        {displayText}
        <span className="animate-pulse">|</span>
      </p>

      <div className="mt-10 flex gap-4">
        <button
          onClick={() => navigate("/coworking")}
          className="bg-yellow-400 text-black px-8 py-3 rounded-full font-medium hover:bg-yellow-500 transition"
        >
          Explore Spaces
        </button>
      </div>
    </motion.div>

   
    <div className="flex justify-end mr-20">
      <HeroLeadForm />
    </div>

  </div>
</div>

    </section>
  );
}  