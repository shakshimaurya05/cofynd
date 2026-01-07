import kotak from "../assets/logos/kotak.png";
import credible from "../assets/logos/credable.jpg";
import hector from "../assets/logos/hector.png";
import purple from "../assets/logos/purple.jpg";
import fyp from "../assets/logos/fyp.jpg";
import easebu from "../assets/logos/easebuzz.jpg";
import inox from "../assets/logos/inox.jpg"
import "../index.css"
const logos = [kotak,inox, credible, hector, purple, fyp, easebu];

export default function TrustedBy() {
  return (
    <section className="bg-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-center text-lg md:text-xl font-semibold mb-8">
          Trusted by more than <span className="font-bold">500+</span> Companies
        </h2>

        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="company"
                className="h-10 object-contain opacity-80"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
