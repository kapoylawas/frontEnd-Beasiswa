import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import Loading from "../../../components/general/Loading";

export default function EditBeasiswaNonakademik() {
  document.title = "Bioadata - Beasiswa";

  //navigata
  const navigate = useNavigate();

  //token from cookies
  const token = Cookies.get("token");

  const [dataUser, setDataUser] = useState("");
  const [semester, setSemester] = useState("");
  const [statusFinish, setStatusFinish] = useState("");

  const [isLoading, setLoading] = useState(false);

  // GET DATA NON AKADEMIK
  useEffect(() => {
    setLoading(true);
    //fetch api
    Api.get("/api/admin/users/byid", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setSemester(response.data.data.nonakademik.semester);
      setStatusFinish(response.data.data.status_finish);
      setDataUser(response.data.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/riwayat"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              {isLoading ? (
                <div className="mt-5">
                  <Loading />
                </div>
              ) : statusFinish === 0 ? (
                <>
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-body">
                      <h6>
                        <i className="fa fa-pencil-alt"></i> Edit Data Beasiswa
                        Non Akademik
                      </h6>
                      <hr />
                      <form></form>
                    </div>
                  </div>
                </>
              ) : (
                <div className="alert alert-danger" role="alert">
                  Anda Sudah Menyelesaikan Pendaftaran Beasiswa Sidoarjo
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
