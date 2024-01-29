//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";
import ModalLuarNegeri from "../../../components/general/ModalLuarNegeri";

export default function LuarNegeri() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  //navigata
  const navigate = useNavigate();

  const [ipk, setIpk] = useState("");
  const [transkrip, setTranskrip] = useState("");
  const [imageipk, setImageipk] = useState("");
  const [isLoading, setLoading] = useState(false);

  //token from cookies
  const token = Cookies.get("token");

  const [users, setUsers] = useState("");
  const [step, setStep] = useState("");

  const [errors, setErros] = useState([]);

  const handleFileTranskip = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (imageData.size > maxSize) {
        toast.error("Ukuran file melebihi batas (2MB)", {
          duration: 5000,
          position: "top-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        setTranskrip(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setTranskrip("");

      toast.error(
        "Format File Bukti Perguruan Tinggi yang diakui oleh Kementerian Pendidikan Tidak Cocok Harus PDF",
        {
          duration: 5000,
          position: "top-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
      return;
    }
    setTranskrip(imageData);
  };

  const handleFileIpk = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (imageData.size > maxSize) {
        toast.error("Ukuran file melebihi batas (2MB)", {
          duration: 5000,
          position: "top-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        setImageipk(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setImageipk("");

      toast.error(
        "Format File Transkip Nilai IPK Tidak Cocok Harus PDF",
        {
          duration: 5000,
          position: "top-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
      return;
    }
    setImageipk(imageData);
  };

  //hook useEffect
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
      setUsers(response.data.data.status_pendaftar);
      setStep(response.data.data.step);
    });
  }, []);

  const storeLuarNegeri = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("ipk", ipk);
    formData.append("imagetranskrip", transkrip);
    formData.append("imageipk", imageipk);
    
    await Api.post("/api/admin/luarnegeri", formData, {
      //header
      headers: {
        //header
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/mahasiswa");
      })
      .catch((error) => {
        //set error message to state "errors"
        setLoading(false);
        setErros(error.response.data);
      });
  };

  return (
    <LayoutAdmin>
      <main>
        <ModalLuarNegeri />
        <div className="container-fluid mb-5 mt-5">
          <div className="col-md-3 col-12 mb-2">
            <Link
              to="/admin/mahasiswa"
              className="btn btn-md btn-primary border-0 shadow w-100"
              type="button"
            >
              <i className="fa-solid fa-backward"></i> Kembali
            </Link>
          </div>
          {users === 1 ? (
            <div className="alert alert-danger" role="alert">
              Anda Sudah Terdaftar di Beasiswa
            </div>
          ) : step === 1 ? (
            <div className="alert alert-danger" role="alert">
              Anda Belum Menyelesaikan step 2 di Data Perguruan Tinggi Anda
            </div>
          ) : (
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded shadow-sm border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-shield-alt"></i> Beasiswa Disporapar
                      Akademik
                    </h6>
                    <hr />
                    <form onSubmit={storeLuarNegeri}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Indeks Prestasi Kumulatif (IPK Menggunakan TITIK .) / Grade Point
                              Average (GPA) / Yang dipersamakan
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              value={ipk}
                              onChange={(e) => setIpk(e.target.value)}
                              placeholder="Indeks Prestasi Kumulatif (IPK) / Grade Point Average (GPA) / Yang dipersamakan"
                            />
                          </div>
                          {errors.ipk && (
                            <div className="alert alert-danger">
                              {errors.ipk[0]}
                            </div>
                          )}
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
                              onChange={handleFileIpk}
                            />
                          </div>
                          {errors.imageipk && (
                            <div className="alert alert-danger">
                              {errors.imageipk[0]}
                            </div>
                          )}
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
                              onChange={handleFileTranskip}
                            />
                          </div>
                          {errors.imagetranskrip && (
                            <div className="alert alert-danger">
                              {errors.imagetranskrip[0]}
                            </div>
                          )}
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
                        <button type="reset" className="btn btn-md btn-warning">
                          <i className="fa fa-redo"></i> Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </LayoutAdmin>
  );
}
