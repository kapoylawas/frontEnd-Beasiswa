//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";
import Loading from "../../../components/general/Loading";

export default function EditDinsosDtks() {
  //title page
  document.title = "Detail Akademik - Beasiswa";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //token from cookies
  const token = Cookies.get("token");

  const [errors, setErros] = useState([]);

  const [isLoading, setLoading] = useState(false);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/adminDinsos"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
