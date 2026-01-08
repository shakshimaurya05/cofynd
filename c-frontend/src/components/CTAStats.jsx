import { useNavigate } from "react-router-dom";

export default function CTAStats() {
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Boost your Revenue, Visibility & Leads
              </h2>
              <p className="mt-4 text-blue-100 text-lg">
                with our platform for Coworking, Coliving & Office Spaces
              </p>
            </div>

            <div className="flex gap-4">
              <button  onClick={() => navigate("/list-your-property")} className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition">
                List Your Space
              </button>

              <button className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition">
                View Plans
              </button>
            </div>
            
          </div>
          <div className="max-w-7xl text-white mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-8 mt-6">
          <div>
            <h3 className="text-4xl font-bold">100,000+</h3>
            <p className="text-blue-200">Live Spaces</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">1,000+</h3>
            <p className="text-blue-200">Locations</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">25+</h3>
            <p className="text-blue-200">Cities</p>
          </div>
        </div>
        </div>
      </section>
      

    </>
  );
}