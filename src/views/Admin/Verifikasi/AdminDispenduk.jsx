//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";
//import pagination component
import Pagination from "../../../components/general/Pagination";

export default function AdminDispenduk() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mb-4 mt-4">
          <p>admin dispenduk</p>
        </div>
      </main>
    </LayoutAdmin>
  );
}
