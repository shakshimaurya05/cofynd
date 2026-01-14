import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-10">Leads</h1>

          {loading && <p>Loading leads...</p>}

          {!loading && leads.length === 0 && (
            <p>No leads found.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leads.map((lead) => (
              <div
                key={lead._id}
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
