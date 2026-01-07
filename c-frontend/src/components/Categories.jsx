import coworking from "../assets/cards/coworking.jpg";
import coliving from "../assets/cards/coliving.jpg";
import virtual from "../assets/cards/virtual.jpg";

const cards = [
  {
    title: "Coworking",
    subtitle: "Spaces",
    image: coworking,
  },
  {
    title: "Coliving",
    subtitle: "Spaces",
    image: coliving,
  },
  {
    title: "Virtual",
    subtitle: "Offices",
    image: virtual,
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-14 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative h-[180px] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition"
              />


              <div className="absolute inset-0 bg-white/3" />

          
              <div className="relative z-10 h-full flex items-center justify-center text-center">
                <h3 className="text-xl font-medium text-black-1000">
                  {card.title}
                  <br />
                  <span className="font-semibold">{card.subtitle}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
