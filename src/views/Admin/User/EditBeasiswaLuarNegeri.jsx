import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import Loading from "../../../components/general/Loading";

export default function EditBeasiswaLuarNegeri() {
  document.title = "Bioadata - Beasiswa";

  //navigata
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const [isLoading, setLoading] = useState(false);

  const [idLuarNegeri, setIdLuarNegeri] = useState("");
  console.log(idLuarNegeri);
  const [ipk, setIpk] = useState("");
  const [imagetranskrip, setImagetranskrip] = useState("");
  const [imageijazah, setImageijazah] = useState("");
  const [statusFinish, setStatusFinish] = useState("");

  const handleGPAChange = (event) => {
    setIpk(event.target.value);
  };

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
      setIdLuarNegeri(response.data.data.luar_negeri.id);
      setIpk(response.data.data.luar_negeri.ipk);
      setStatusFinish(response.data.data.status_finish);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  // update bidang akademiks
  const updateLuarNegeri = async (e) => {
    e.preventDefault();
    setLoading(true);
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("ipk", ipk);
    formData.append("imageipk", imagetranskrip);
    formData.append("imagetranskrip", imageijazah);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/users/luarNegeris/${idLuarNegeri}}`, formData, {
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
                        Luar Negeri
                      </h6>
                      <hr />
                      <form onSubmit={updateLuarNegeri}>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              IPK Minimum 3.4 Harus Menggunakan titik (.)
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              max="4"
                              className="form-control"
                              value={ipk}
                              onChange={handleGPAChange}
                              placeholder="Enter IPK(Indeks Prestasi Kumulatif) Minimum 3.4"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Transkip nilai IPK ? GPA pada semester terakhir
                                yang sudah dijalani
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                accept="application/pdf"
                                onChange={(e) =>
                                  setImagetranskrip(e.target.files[0])
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Perguruan Tinggi yang diakui oleh Kementerian
                                Pendidikan, Kebudayaan, Riset dan Teknologi Pada
                                link berikut ini : (Upload Screenshoot)
                                <br />
                                <a
                                  target="_blank"
                                  href="https://ijazahln.kemdikbud.go.id/ijazahln/pencarian/pencarian-pt.html"
                                >
                                  https://ijazahln.kemdikbud.go.id/ijazahln/pencarian/pencarian-pt.html
                                </a>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                accept="application/pdf"
                                onChange={(e) =>
                                  setImageijazah(e.target.files[0])
                                }
                              />
                            </div>
                          </div>
                        </div>
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
