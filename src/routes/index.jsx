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
import Register from "../views/Web/register/Index";
import Info from "../views/Web/Info/Index";
import PermissionsIndex from "../views/Admin/Permissions/Index";
import RolesIndex from "../views/Admin/Roles/Index";
import RolesCreate from "../views/Admin/Roles/Create";
import RolesEdit from "../views/Admin/Roles/Edit";
import MahasiswaIndex from "../views/Admin/Mahasiswa/Index";
import Akademik from "../views/Admin/Dispora/Akademik";
import NonAkademik from "../views/Admin/Dispora/NonAkademik";
import RiwayatIndex from "../views/Admin/Riwayat/Index";
import KesraIndex from "../views/Admin/Kesra/Index";
import DinsosIndex from "../views/Admin/Dinsos/Index";
import LuarNegeri from "../views/Admin/Dispora/LuarNegeri";
import KeagamanA from "../views/Admin/Kesra/KeagamaanA";
import KeagamanB from "../views/Admin/Kesra/KeagamaanB";
import KeagamanC from "../views/Admin/Kesra/KeagamaanC";
import KeagamanD from "../views/Admin/Kesra/KeagamaanD";
import AdminAkademik from "../views/Admin/Verifikasi/adminAkademik";
import AdminNonAkademik from "../views/Admin/Verifikasi/AdminNonAkademik";
import AdminLuarNegeri from "../views/Admin/Verifikasi/AdminLuarNegeri";

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

      {/* private route "/admin/permissions" */}
      <Route
        path="/admin/permissions"
        element={
          <PrivateRoutes>
            <PermissionsIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/roles" */}
      <Route
        path="/admin/roles"
        element={
          <PrivateRoutes>
            <RolesIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/roles/create" */}
      <Route
        path="/admin/roles/create"
        element={
          <PrivateRoutes>
            <RolesCreate />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/roles/edit" */}
      <Route
        path="/admin/roles/edit/:id"
        element={
          <PrivateRoutes>
            <RolesEdit />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/mahasiswa" */}
      <Route
        path="/admin/mahasiswa"
        element={
          <PrivateRoutes>
            <MahasiswaIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/dispora/akademik" */}
      <Route
        path="/admin/dispora/akademik"
        element={
          <PrivateRoutes>
            <Akademik />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/dispora/nonakademik" */}
      <Route
        path="/admin/dispora/nonakademik"
        element={
          <PrivateRoutes>
            <NonAkademik />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/dispora/luarnegeri"
        element={
          <PrivateRoutes>
            <LuarNegeri />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/kesra" */}
      <Route
        path="/admin/kesra"
        element={
          <PrivateRoutes>
            <KesraIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/kesra/a"
        element={
          <PrivateRoutes>
            <KeagamanA />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/kesra/b"
        element={
          <PrivateRoutes>
            <KeagamanB />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/kesra/c"
        element={
          <PrivateRoutes>
            <KeagamanC />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/kesra/d"
        element={
          <PrivateRoutes>
            <KeagamanD />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/dinsos" */}
      <Route
        path="/admin/dinsos"
        element={
          <PrivateRoutes>
            <DinsosIndex />
          </PrivateRoutes>
        }
      />

      {/* private route "/admin/riwayat" */}
      <Route
        path="/admin/riwayat"
        element={
          <PrivateRoutes>
            <RiwayatIndex />
          </PrivateRoutes>
        }
      />

      {/* route "/" */}
      <Route path="/" element={<Home />} />

      {/* route "/Register" */}
      <Route path="/registers" element={<Register />} />

      {/* route "/Info" */}
      <Route path="/info" element={<Info />} />

      {/* MENU TIM ADMIN VERIFIKASI */}

      {/* private route "/admin/adminAkademik" */}
      <Route
        path="/admin/adminAkademik"
        element={
          <PrivateRoutes>
            <AdminAkademik />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminNonAkademik"
        element={
          <PrivateRoutes>
            <AdminNonAkademik />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminLuarNegeri"
        element={
          <PrivateRoutes>
            <AdminLuarNegeri />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
