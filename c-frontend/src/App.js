import { Routes, Route } from "react-router-dom";
import ListProperty from "./pages/ListProperty";
import Home from "./pages/Home";
import Coworking from "./pages/Coworking";
import Coliving from "./pages/Coliving";
import VirtualOffice from "./pages/VirtualOffice";
import AdminLeads from "./pages/AdminLead"
import Login from "./pages/Login"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
     <Route path="/coworking" element={<Coworking />} />
<Route path="/coworking/:city" element={<Coworking />} />

<Route path="/coliving" element={<Coliving />} />
<Route path="/coliving/:city" element={<Coliving />} />

<Route path="/virtual-office" element={<VirtualOffice />} />
<Route path="/virtual-office/:city" element={<VirtualOffice />} />
<Route path="/list-your-property" element={<ListProperty />} />
<Route path="/login" element={<Login />} />
<Route path="/admin/leads" element={<AdminLeads />} />
    </Routes>
  );
}

export default App;
