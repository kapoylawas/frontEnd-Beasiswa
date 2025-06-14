//import layout
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
//import component loading
import Loading from "../../../components/general/Loading";

export default function MahasiswaIndex() {
  document.title = "Dashboard - Beasiswa";

  const [users, setUsers] = useState("");
  const [step, setStep] = useState("");
  const [tipeUniversitas, setTipeUniversitas] = useState("");
  const [isLoading, setLoading] = useState(false);

  //token from cookies
  const token = Cookies.get("token");

  //hook useEffect
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
      setUsers(response.data.data.status_pendaftar);
      setStep(response.data.data.step);
      setTipeUniversitas(response.data.data.pilih_universitas);
      setLoading(false);
    });
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <h5 className="text-center">
            PILIH SALAH SATU DARI BEBERAPA BEASISWA
          </h5>
          <hr color="green" />

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
              {isLoading ? (
                <Loading />
              ) : tipeUniversitas === "Luar" ? (
                <div className="col-md-6 mb-4">
                  <div className="card border-0 rounded shadow-sm">
                    <div className="card-body text-center">
                      <img
                        src="https://santrikoding.com/images/menu-icons/book-bundles.webp"
                        className="rounded"
                        style={{ width: "60px" }}
                        alt="Logo Pendaftaran Beasiswa"
                      />
                      <hr />
                      <h6 className="text-center mb-3 font-weight-bold text-dark">
                        Beasiswa Disporapar Akademik Luar Negeri.
                      </h6>
                      <div className="d-grid">
                        <Link
                          to="/admin/dispora/luarnegeri"
                          className="btn btn-primary btn-md shadow-custom border-0 btn-block font-weight-bold"
                        >
                          Daftar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 rounded shadow-sm">
                      <div className="card-body text-center">
                        <img
                          src="https://santrikoding.com/images/menu-icons/book-bundles.webp"
                          className="rounded"
                          style={{ width: "60px" }}
                          alt="Logo Pendaftaran Beasiswa"
                        />
                        <hr />
                        <h6 className="text-center mb-3 font-weight-bold text-dark">
                          Beasiswa prestasi bidang akademik.
                        </h6>
                        <div className="d-grid">
                          <Link
                            to="/admin/dispora/akademik"
                            className="btn btn-primary btn-md shadow-custom border-0 btn-block font-weight-bold"
                          >
                            Daftar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 rounded shadow-sm">
                      <div className="card-body text-center">
                        <img
                          src="https://santrikoding.com/images/menu-icons/book-bundles.webp"
                          className="rounded"
                          style={{ width: "60px" }}
                          alt="Logo Pendaftaran Beasiswa"
                        />
                        <hr />
                        <h6 className="text-center mb-3 font-weight-bold text-dark">
                          Beasiswa prestasi bidang non akademik.
                        </h6>
                        <div className="d-grid">
                          <Link
                            to="/admin/dispora/nonakademik"
                            className="btn btn-primary btn-md shadow-custom border-0 btn-block font-weight-bold"
                          >
                            Daftar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 rounded shadow-sm">
                      <div className="card-body text-center">
                        <img
                          src="https://santrikoding.com/images/menu-icons/book-bundles.webp"
                          className="rounded"
                          style={{ width: "60px" }}
                          alt="Logo Pendaftaran Beasiswa"
                        />
                        <hr />
                        <h6 className="text-center mb-3 font-weight-bold text-dark">
                          Beasiswa Prestasi Bidang Keagamaan.
                        </h6>
                        <div className="d-grid">
                          <Link
                            to="/admin/kesra"
                            className="btn btn-primary btn-md shadow-custom border-0 btn-block font-weight-bold"
                          >
                            Daftar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 rounded shadow-sm">
                      <div className="card-body text-center">
                        <img
                          src="https://santrikoding.com/images/menu-icons/book-bundles.webp"
                          className="rounded"
                          style={{ width: "60px" }}
                          alt="Logo Pendaftaran Beasiswa"
                        />
                        <hr />
                        <h6 className="text-center mb-3 font-weight-bold text-dark">
                          Beasiswa mahasiwa kurang mampu.
                        </h6>
                        <div className="d-grid">
                          <Link
                            to="/admin/dinsos"
                            className="btn btn-primary btn-md shadow-custom border-0 btn-block font-weight-bold"
                          >
                            Daftar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </LayoutAdmin>
  );
}
