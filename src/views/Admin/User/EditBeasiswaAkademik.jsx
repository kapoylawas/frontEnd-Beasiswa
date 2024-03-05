import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function EditBeasiswaAkademik() {
  document.title = "Bioadata - Edit Beasiswa Akademik";

  //navigata
  const navigate = useNavigate();
  //token from cookies
  const token = Cookies.get("token");

  const [idAkademiks, setIdAkademiks] = useState();
  console.log("id akademik => ",idAkademiks);

  useEffect(() => {
    //fetch api
    Api.get("/api/admin/users/byid", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setIdAkademiks(response.data.data.akademik.id)
    });
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <p>edit Beasiswa Akademik</p>
        </div>
      </main>
    </LayoutAdmin>
  );
}
