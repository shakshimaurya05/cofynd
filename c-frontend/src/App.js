import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const Home = lazy(() => import("./pages/Home"));
const Coworking = lazy(() => import("./pages/Coworking"));
const ListProperty = lazy(() => import("./pages/ListProperty"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const ShowCard = lazy(() => import("./pages/ShowCard"));
const VirtualOfficePage = lazy(() => import("./pages/VirtualOffice/VirtualOficePage"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coworking" element={<Coworking />} />
          <Route path="/coworking/:city" element={<Coworking />} />
          <Route path="/list-your-property" element={<ListProperty />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/space/:id" element={<ShowCard />} />
          <Route path="/virtual-office/:city" element={<VirtualOfficePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
