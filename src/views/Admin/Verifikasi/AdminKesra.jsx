//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";

export default function AdminKesra() {
  document.title = "Kesra - Beasiswa Sidoarjo";

  //navigata
  const navigate = useNavigate();

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mb-4 mt-3">
        <p>kesra</p>
        </div>
      </main>
    </LayoutAdmin>
  );
}
