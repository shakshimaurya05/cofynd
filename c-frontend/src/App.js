import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Coworking from "./pages/Coworking";
import Coliving from "./pages/Coliving";
import VirtualOffice from "./pages/VirtualOffice";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coworking" element={<Coworking />} />
      <Route path="/coliving" element={<Coliving />} />
      <Route path="/virtual-office" element={<VirtualOffice />} />
    </Routes>
  );
}

export default App;
