//import layout
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
//import component loading
import Loading from "../../../components/general/Loading";

export default function KesraIndex() {
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
            PILIH SALAH SATU DARI BEBERAPA BEASISWA. Mahasiswa yang memiliki
            prestasi, baik tingkat Internasional, Nasional, Provinsi dan
            Kabupaten dan/atau aktif di bidang keagamaan
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
              ) : (
                <>
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 rounded shadow-sm">
                      <div className="card-body text-center">
                        <img
                          src="https://santrikoding.com/images/menu-icons/book-bundles.webp"
                          className="rounded"
                          style={{ width: "60px" }}
                        />
                        <hr />
                        <h6 className="text-wrap mb-3 font-weight-bold text-dark">
                          <ol>
                            <li>
                              Hafal minimal 10 (sepuluh) juz A1-Qur'an :
                              Sertifikat / SK .
                            </li>
                            <li>
                              Pernah mengikuti kejuaraan MTQ : Sertifikat / SK .
                            </li>
                            <li>
                              Prestasi lain di bidang keagamaan : sertifikat
                              atau surat keterangan dan/atau bentuk lain yang
                              dipersamakan .
                            </li>
                          </ol>
                        </h6>
                        <div className="d-grid">
                          <Link
                            to="/admin/kesra/a"
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
                        />
                        <hr />
                        <h6 className="text-wrap mb-3 font-weight-bold text-dark">
                          <ol>
                            <li>
                              Santriwan dan Santriwati yang berkuliah dan
                              menetap di Pondok Pesantren : Surat Ket Ponpes.
                            </li>
                            <li>
                              Ustadz/ustadzah sebagai guru ngaji di TPA/TPQ/
                              Madin : Surat Rekomendasi Kepala TPQ atau Madrasah
                              Diniyah .
                            </li>
                          </ol>
                        </h6>
                        <div className="d-grid">
                          <Link
                            to="/admin/kesra/b"
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
                        />
                        <hr />
                        <h6 className="text-wrap mb-3 font-weight-bold text-dark">
                          <ol>
                            <li>
                              Jajaran pengurus harian (Ketua, Wakil Ketua,
                              Sekretaris, Bendahara) aktifis organisasi
                              keagamaan tingkat Kabupaten/ Kecamatan dan/ atau
                              perguruan tinggi.
                            </li>
                          </ol>
                        </h6>
                        <div className="d-grid">
                          <Link
                            to="/admin/kesra/c"
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
                        />
                        <hr />
                        <h6 className="text-center mb-3 font-weight-bold text-dark">
                          <ol>
                            <li>
                              (Khusus Non Muslim) tercatat sebagai
                              pengurus/aktifis atau mempunyai piagam kejuaraan
                              bidang keagamaan.
                              <br></br>
                              <br></br>
                            </li>
                          </ol>
                        </h6>
                        <div className="d-grid">
                          <Link
                            to="/admin/kesra/d"
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
