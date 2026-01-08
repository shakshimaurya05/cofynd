import wework from "../assets/logos/wework.png";
import awfis from "../assets/logos/awfis.png";
import innov8 from "../assets/logos/innov8.png";
import springboard from "../assets/logos/springboard.jpg";
import instaoffice from "../assets/logos/instaoffice.jpg";
import indigube from "../assets/logos/Indiqube.jpg";
import bhive from "../assets/logos/bhive.png";
import {
  FaBuilding,
  FaFileInvoice,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUserTie,
  FaHandshake,
  FaPhoneAlt,
} from "react-icons/fa";

import officeImg from "../assets/hero1.jpg";

const logos = [
  wework,
  awfis,
  innov8,
  springboard,
  instaoffice,
  indigube,
  bhive,
];

export default function FeaturedAndCTA() {
  return (
    <section className="bg-white">

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <div className="inline-flex items-center gap-3 mb-10">
            <h2 className="text-2xl font-semibold">
              Featured Coworking
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="brand"
                className="h-16"
              />
            ))}
          </div>

        </div>
      </div>


      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="relative bg-[#FFF7E6] rounded-3xl overflow-hidden flex flex-col md:flex-row">

            <div className="p-10 md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Book Your Virtual Office{" "}
                <span className="text-yellow-500">with CoFynd</span>
              </h2>

              <div className="grid grid-cols-2 gap-6 mt-8 text-sm text-gray-700">
                 <div className="flex items-center gap-2">
    <FaBuilding className="text-black-500 text-sm" />
    <span>Company Registration</span>
  </div>
                <div className="flex items-center gap-2">
    <FaFileInvoice className="text-black-500 text-sm" />
    <span>GST Registration</span>
  </div>

  <div className="flex items-center gap-2">
    <FaMapMarkerAlt className="text-black-500 text-sm" />
    <span>Business Address</span>
  </div>

  <div className="flex items-center gap-2">
    <FaEnvelope className="text-black-500 text-sm" />
    <span>Mailing Address</span>
  </div>
               <div className="flex items-center gap-2">
    <FaUserTie className="text-black-500 text-sm" />
    <span>Reception Services</span>
  </div>

  <div className="flex items-center gap-2">
    <FaHandshake className="text-black-500 text-sm" />
    <span>Meeting Room Access</span>
  </div>
              </div>

              <div className="mt-8 text-sm text-gray-700 space-y-2">
  <div className="flex items-center gap-2">
    <FaPhoneAlt className="text-black-500 text-sm" />
    <span>+91 9311 32 8049</span>
  </div>

  <div className="flex items-center gap-2">
    <FaEnvelope className="text-black-500 text-sm" />
    <span>hello@cofynd.com</span>
  </div>
</div>

            </div>

           
            <div className="md:w-1/2">
              <img
                src={officeImg}
                alt="Virtual Office"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
