import { useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function UserIndex() {
  document.title = "Bioadata - Beasiswa";

  //navigata
  const navigate = useNavigate();

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <p>biodata</p>
        </div>
      </main>
    </LayoutAdmin>
  );
}
