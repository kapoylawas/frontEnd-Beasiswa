//import react router dom
import { Routes, Route } from "react-router-dom";

//======================================================
// view admin
//======================================================

//import view login
import Login from "../views/Auth/Login";
import Forbidden from "../views/Auth/Forbidden";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../views/Admin/Index";
import Home from "../views/Web/Home/Index";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />
      {/* route "/forbidden" */}
      <Route path="/forbidden" element={<Forbidden />} />

      {/* private route "/admin/dashboard" */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />

      {/* route "/" */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}