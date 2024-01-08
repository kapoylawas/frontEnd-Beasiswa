//import layout
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function RiwayatIndex() {
  document.title = "Dashboard - Riwayat Pendaftar Beasiswa";

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5"></div>
      </main>
    </LayoutAdmin>
  );
}
