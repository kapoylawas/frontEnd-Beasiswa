//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";
import Loading from "../../../components/general/Loading";

export default function EditBeasiswaDinsos() {
  document.title = "Dinsos - Beasiswa Sidoarjo";

  //navigata
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const [idDinsos, setIdDinsos] = useState("");
  const [tipeDinsos, setTipeDinsos] = useState("");
  const [file, setFile] = useState("");
  const [statusFinish, setStatusFinish] = useState("");

  const [isLoading, setLoading] = useState(false);

  const handleshowhideTipeDinsos = (event) => {
    const getType = event.target.value;
    setTipeDinsos(getType);
  };

  // GET DATA DINSOS
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
      setIdDinsos(response.data.data.dinsos.id);
      setTipeDinsos(response.data.data.dinsos.tipe_daftar);
      setStatusFinish(response.data.data.status_finish);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  const updateDinsos = async (e) => {
    e.preventDefault();
    setLoading(true);
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("tipe_daftar", tipeDinsos);
    formData.append("imagesktm", file);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/users/dinsoses/${idDinsos}}`, formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/riwayat");
      })
      .catch((error) => {
        setLoading(false);
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mb-4 mt-3">
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
                        Kurang Mampu
                      </h6>
                      <hr />
                      <form onSubmit={updateDinsos}>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Semester
                            </label>
                            <select
                              className="form-select"
                              value={tipeDinsos}
                              onChange={handleshowhideTipeDinsos}
                              disabled
                            >
                              <option value="">
                                -- Pilih Salah Satu Terdaftar DTKS atau Tidak
                                Terdaftar DTKS --
                              </option>
                              <option value="1">
                                Terdaftar Data Terpadu Kesejahteraan Sosial
                                (DTKS)
                              </option>
                              <option value="2">
                                Tidak Terdaftar Data Terpadu Kesejahteraan
                                Sosial (DTKS)
                              </option>
                            </select>
                          </div>
                        </div>
                        {tipeDinsos === 1 ? null : (
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Data Terpadu Kesejahteraan Sosial (DTKS) atau
                                  Surat Keterangan Tidak Mampu (SKTM) dari Desa
                                  Sesuai yang dipilih PDF dan Maksimal 2MB
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  accept="application/pdf"
                                  onChange={(e) => setFile(e.target.files[0])}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-md btn-primary me-2"
                            disabled={isLoading}
                          >
                            {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                          </button>
                          <button
                            type="reset"
                            className="btn btn-md btn-warning"
                          >
                            <i className="fa fa-redo"></i> Reset
                          </button>
                        </div>
                      </form>
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
