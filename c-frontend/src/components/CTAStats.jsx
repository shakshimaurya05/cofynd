

export default function CTAStats() {
 
  return (
    <>
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Workspaces shape the way we work

              </h2>
              <p className="mt-4 text-blue-100 text-lg">
                We help you find one that truly fits
              </p>
            </div>

            
          </div>
          <div className="max-w-7xl text-white mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-8 mt-6">
          <div>
            <h3 className="text-4xl font-bold">200+</h3>
            <p className="text-blue-200">Live Spaces</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">150+</h3>
            <p className="text-blue-200">Locations</p>
          </div>
      
         <div>
            <h3 className="text-4xl font-bold">20+</h3>
            <p className="text-blue-200">Year of Experience</p>
          </div>
        </div>
        </div>
      </section>
      

    </>
  );
}