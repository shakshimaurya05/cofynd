import wework from "../assets/logos/wework.png";
import awfis from "../assets/logos/awfis.png";
import innov8 from "../assets/logos/innov8.png";
import springboard from "../assets/logos/springboard.jpg";
import indigube from "../assets/logos/Indiqube.jpg";
import coworks from "../assets/logos/coworks.png";
import fume from "../assets/logos/fume.png";
import altrade from "../assets/logos/altrade.png";
import "../index.css"
const logos = [wework,awfis,coworks, innov8, springboard, indigube, fume, altrade];

export default function FeaturedCoworking() {
  return (
    <section className="bg-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 tracking-tight">
          Featured Coworking
        </h2>

        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((logo, i) => (
            <img
  key={i}
  src={logo}
  alt="company"
  className="h-14 md:h-16 object-contain opacity-90"
/>

            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
