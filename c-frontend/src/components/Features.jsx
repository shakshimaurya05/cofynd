import { motion } from "framer-motion";
export default function Features({ features }) {
  return (
    <section className="bg-[#FAFAFA]  py-16">
     
         <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
   className="max-w-7xl mx-auto px-4"
>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((item, index) => (
            <div key={index}>
             
              <div className="mb-4">
                {item.icon}
              </div>

             
              <h3 className="font-semibold text-lg text-gray-900">
                {item.title}
              </h3>

         
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}