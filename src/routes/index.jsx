//import react router dom
import { Routes, Route, Navigate } from "react-router-dom";

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
import AdminNonAkademik from "../views/Admin/Verifikasi/AdminNonAkademik";
import AdminLuarNegeri from "../views/Admin/Verifikasi/AdminLuarNegeri";
import UserIndex from "../views/Admin/User/Index";
import AdminKesra from "../views/Admin/Verifikasi/AdminKesra";
import AdminDinsos from "../views/Admin/Verifikasi/AdminDinsos";
import EditBeasiswa from "../views/Admin/User/EditBeasiswaAkademik";
import EditBeasiswaNonakademik from "../views/Admin/User/EditBeasiswaNonakademik";
import EditBeasiswaLuarNegeri from "../views/Admin/User/EditBeasiswaLuarNegeri";
import AdminDispenduk from "../views/Admin/Verifikasi/AdminDispenduk";
import AdminAkademik from "../views/Admin/Verifikasi/AdminAkademik";
import EditBeasiswaDinsos from "../views/Admin/User/EditBeasiswaDinsos";
import EditBeasiswaKesra from "../views/Admin/User/EditBeasiswaKesra";
import EditAkademik from "../views/Admin/Verifikasi/EditAkademik";
import EditNonAkademik from "../views/Admin/Verifikasi/EditNonAkademik";
import EditLuarnegeri from "../views/Admin/Verifikasi/EditLuarnegeri";
import EditDinsosDtks from "../views/Admin/Verifikasi/EditDinsosDtks";
import EditDinsosNoDtks from "../views/Admin/Verifikasi/EditDinsosNoDtks";
import AdminKesraB from "../views/Admin/Verifikasi/AdminKesraB";
import AdminKesraC from "../views/Admin/Verifikasi/AdminKesraC";
import AdminKesraD from "../views/Admin/Verifikasi/AdminKesraD";
import EditKesra from "../views/Admin/Verifikasi/EditKesra";
import EditKesraB from "../views/Admin/Verifikasi/EditKesraB";
import EditKesraC from "../views/Admin/Verifikasi/EditKesraC";
import EditKesraD from "../views/Admin/Verifikasi/EditKesraD";
import EditDispenduk from "../views/Admin/Verifikasi/EditDispenduk";
import AdminDispendukAkademik from "../views/Admin/Verifikasi/AdminDispendukAkademik";
import EditDispendukAkademik from "../views/Admin/Verifikasi/EditDispendukAkademik";
import AdminDispendukNonAkademik from "../views/Admin/Verifikasi/AdminDispendukNonAkademik";
import EditDispendukNonAkademik from "../views/Admin/Verifikasi/EditDispendukNonAkademik";
import AdminDispendukLuarNegeri from "../views/Admin/Verifikasi/AdminDispendukLuarNegeri";
import EditDispendukLuarNegeri from "../views/Admin/Verifikasi/EditDispendukLuarNegeri";
import AdminDispendukDinsos from "../views/Admin/Verifikasi/AdminDispendukKesra";
import AdminDispendukKesra from "../views/Admin/Verifikasi/AdminDispendukKesra";
import EditDispendukKesra from "../views/Admin/Verifikasi/EditDispendukKesra";

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/login" */}
      <Route path="/login" element={<Login />} />
      {/* route "/forbidden" */}
      <Route path="/forbidden" element={<Forbidden />} />

      {/* {<Route path="*" element={<Navigate to="/" />} />} */}

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

      {/* private route "/admin/biodata" */}
      <Route
        path="/admin/biodata"
        element={
          <PrivateRoutes>
            <UserIndex />
          </PrivateRoutes>
        }
      />

      {/* edit akademik */}
      <Route
        path="/admin/editBeasiswaAkademik"
        element={
          <PrivateRoutes>
            <EditBeasiswa />
          </PrivateRoutes>
        }
      />

      {/* edit non akademik */}
      <Route
        path="/admin/editBeasiswaNonkademik"
        element={
          <PrivateRoutes>
            <EditBeasiswaNonakademik />
          </PrivateRoutes>
        }
      />

      {/* edit luar negeri */}
      <Route
        path="/admin/EditBeasiswaLuarNegeri"
        element={
          <PrivateRoutes>
            <EditBeasiswaLuarNegeri />
          </PrivateRoutes>
        }
      />

      {/* edit dinsos */}
      <Route
        path="/admin/EditBeasiswaDinsos"
        element={
          <PrivateRoutes>
            <EditBeasiswaDinsos />
          </PrivateRoutes>
        }
      />

      {/* edit kesra */}
      <Route
        path="/admin/EditBeasiswaKesra"
        element={
          <PrivateRoutes>
            <EditBeasiswaKesra />
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

      {/* private route "/admin/editAkademik" */}
      <Route
        path="/admin/editAkademik/:id"
        element={
          <PrivateRoutes>
            <EditAkademik />
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

      {/* private route "/admin/editNonAkademik" */}
      <Route
        path="/admin/editNonAkademik/:id"
        element={
          <PrivateRoutes>
            <EditNonAkademik />
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

      <Route
        path="/admin/editLuarNegeri/:id"
        element={
          <PrivateRoutes>
            <EditLuarnegeri />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminKesra"
        element={
          <PrivateRoutes>
            <AdminKesra />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/editKesra/:id"
        element={
          <PrivateRoutes>
            <EditKesra />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminKesraB"
        element={
          <PrivateRoutes>
            <AdminKesraB />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/editKesraB/:id"
        element={
          <PrivateRoutes>
            <EditKesraB />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminKesraC"
        element={
          <PrivateRoutes>
            <AdminKesraC />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/editKesraC/:id"
        element={
          <PrivateRoutes>
            <EditKesraC />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminKesraD"
        element={
          <PrivateRoutes>
            <AdminKesraD />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/editKesraD/:id"
        element={
          <PrivateRoutes>
            <EditKesraD />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminDinsos"
        element={
          <PrivateRoutes>
            <AdminDinsos />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/editDinsosDtks/:id"
        element={
          <PrivateRoutes>
            <EditDinsosDtks />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/editDinsosNoDtks/:id"
        element={
          <PrivateRoutes>
            <EditDinsosNoDtks />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminDispenduk"
        element={
          <PrivateRoutes>
            <AdminDispenduk />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminDispendukAkademik"
        element={
          <PrivateRoutes>
            <AdminDispendukAkademik />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminDispendukNonAkademik"
        element={
          <PrivateRoutes>
            <AdminDispendukNonAkademik />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminDispendukLuarNegeri"
        element={
          <PrivateRoutes>
            <AdminDispendukLuarNegeri />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/adminDispendukKesra"
        element={
          <PrivateRoutes>
            <AdminDispendukKesra />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/editDispenduk/:id"
        element={
          <PrivateRoutes>
            <EditDispenduk />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/editDispendukAkademik/:id"
        element={
          <PrivateRoutes>
            <EditDispendukAkademik />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/editDispendukNonAkademik/:id"
        element={
          <PrivateRoutes>
            <EditDispendukNonAkademik />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/EditDispendukLuarNegeri/:id"
        element={
          <PrivateRoutes>
            <EditDispendukLuarNegeri />
          </PrivateRoutes>
        }
      />

      <Route
        path="/admin/EditDispendukKesra/:id"
        element={
          <PrivateRoutes>
            <EditDispendukKesra />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
