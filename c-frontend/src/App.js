import { Routes, Route } from "react-router-dom";
import ListProperty from "./pages/ListProperty";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Coworking from "./pages/Coworking";
import AdminLeads from "./pages/AdminLead"
import Login from "./pages/Login"
import ShowCard from "./pages/ShowCard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
     <Route path="/coworking" element={<Coworking />} />
<Route path="/coworking/:city" element={<Coworking />} />

<Route path="/list-your-property" element={<ListProperty/>}/>

<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/admin/leads" element={<AdminLeads />} />
<Route path="/space/:id" element={<ShowCard />} />
    </Routes>
  );
}

export default App;
