import heroImg from "../assets/hero1.jpg";



export default function Hero() {
  const cities = ["Gurugram", "Noida", "Greater Noida", "Delhi"];

  return (
    <section className="bg-white min-h-[610px] overflow-hidden relative">

      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row">

        
          <div className="w-full md:w-1/2 pt-32">
            <h1 className=" text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Choose from <span className="text-yellow-400">1000+</span>{" "}
              spaces to <span className="text-blue-800">Work & Live</span>
            </h1>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-[450px]">
              {cities.map((city) => (
                <button
                  key={city}
                  className="border rounded-full px-6 py-3 text-base font-medium hover:bg-gray-100 min-w-[140px] whitespace-nowrap"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:block md:w-1/2" />
        </div>
      </div>

    
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="h-full overflow-hidden rounded-bl-[140px]">
          <img
            src={heroImg}
            alt="Hero"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

    </section>
  );
}
