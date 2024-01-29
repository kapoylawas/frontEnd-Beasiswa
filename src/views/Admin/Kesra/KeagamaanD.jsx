import { useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import ModalKesra from "../../../components/general/ModalKesra";

export default function KeagamanD() {
  document.title = "Kesra - Beasiswa Sidoarjo";

  //token from cookies
  const token = Cookies.get("token");

  //navigate
  const navigate = useNavigate();

  return (
    <LayoutAdmin>
      <main>
        <ModalKesra />
      </main>
    </LayoutAdmin>
  );
}
