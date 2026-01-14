import Navbar from "../components/Navbar";

const dummyLeads = [
  {
    id: 1,
    name: "Aditya Maurya",
    email: "aditya@gmail.com",
    phone: "+91 9876543210",
    city: "Delhi",
    spaceType: "Coworking",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9123456789",
    city: "Noida",
    spaceType: "Coliving",
  },
  {
    id: 3,
    name: "Sneha Verma",
    email: "sneha@gmail.com",
    phone: "+91 9988776655",
    city: "Gurugram",
    spaceType: "Virtual Office",
  },
];

export default function AdminLeads() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-10">
            Leads
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl shadow-sm p-6 border"
              >
                <h2 className="text-lg font-semibold text-gray-900">
                  {lead.name}
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  {lead.email}
                </p>

                <p className="text-sm text-gray-600">
                  {lead.phone}
                </p>

                <div className="flex gap-4 mt-4 text-sm">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    {lead.spaceType}
                  </span>

                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {lead.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
