import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import Loading from "../../../components/general/Loading";

export default function EditBeasiswaAkademik() {
  document.title = "Bioadata - Edit Beasiswa Akademik";

  //navigata
  const navigate = useNavigate();
  //token from cookies
  const token = Cookies.get("token");

  const [dataUser, setDataUser] = useState("");
  const [idAkademiks, setIdAkademiks] = useState("");
  const [semester, setSemester] = useState("");
  const [akredetasi, setAkredetasi] = useState("");
  const [ipk, setIpk] = useState("");
  const [progamPendidikan, setProgamPendidikan] = useState("");
  const [imagetranskrip, setImagetranskrip] = useState("");
  const [imagebanpt, setImagebanpt] = useState("");
  const [statusFinish, setStatusFinish] = useState("");

  const [isLoading, setLoading] = useState(false);

  const handleshowhideSemester = (event) => {
    const getType = event.target.value;
    setSemester(getType);
  };
  const handleshowhideAkreditasi = (event) => {
    const getType = event.target.value;
    setAkredetasi(getType);
  };
  const handleshowhideProgamPendidikan = (event) => {
    const getType = event.target.value;
    setProgamPendidikan(getType);
  };

  const handleGPAChange = (event) => {
    setIpk(event.target.value);
  };

  // GET DATA AKADEMIK
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
      setIdAkademiks(response.data.data.akademik.id);
      setSemester(response.data.data.akademik.semester);
      setAkredetasi(response.data.data.akademik.akredetasi_kampus);
      setDataUser(response.data.data.akademik);
      setIpk(response.data.data.akademik.ipk);
      setProgamPendidikan(response.data.data.akademik.progam_pendidikan);
      setStatusFinish(response.data.data.status_finish);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  // update bidang akademiks
  const updateBidangAkademiks = async (e) => {
    e.preventDefault();
    setLoading(true);
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("ipk", ipk);
    formData.append("semester", semester);
    formData.append("akredetasi_kampus", akredetasi);
    formData.append("progam_pendidikan", progamPendidikan);
    formData.append("imagetranskrip", imagetranskrip);
    formData.append("imagebanpt", imagebanpt);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/users/akademiks/${idAkademiks}}`, formData, {
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
                        Akademik
                      </h6>
                      <hr />
                      <form onSubmit={updateBidangAkademiks}>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Semester
                            </label>
                            <select
                              className="form-select"
                              value={semester}
                              onChange={handleshowhideSemester}
                            >
                              <option value="">-- Pilih Semester --</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Akreditasi Universitas
                            </label>
                            <select
                              className="form-select"
                              value={akredetasi}
                              onChange={handleshowhideAkreditasi}
                            >
                              <option value="">
                                -- Pilih Akreditasi Universitas --
                              </option>
                              <option value="1">Unggul</option>
                              <option value="2">Baik Sekali</option>
                              <option value="3">Baik</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Jenis Progam Pendidikan
                            </label>
                            <select
                              className="form-select"
                              value={progamPendidikan}
                              onChange={handleshowhideProgamPendidikan}
                            >
                              <option value="">
                                -- Pilih Progam Pendidikan --
                              </option>
                              <option value="non">Jurusan Non Eksakta</option>
                              <option value="eksakta">
                                Sosial Dan Jurusan Eksakta/Sains
                              </option>
                            </select>
                          </div>
                        </div>
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
                                Transkrip Nilai Pada Semester Akhir Yang
                                Ditempuh PDF dan Maksimal 2MB
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
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Bukti Akredetasi Dari BANPT PDF dan Maksimal 2MB
                              (Upload Screenshoot) Link DIBAWAH :
                              <br />
                              <a
                                target="_blank"
                                href="https://www.banpt.or.id/bianglala/bianglala.php"
                              >
                                https://www.banpt.or.id/bianglala/bianglala.php
                              </a>
                              <br />
                              <a
                                target="_blank"
                                href="https://www.banpt.or.id/direktori/institusi/pencarian_institusi.php"
                              >
                                https://www.banpt.or.id/direktori/institusi/pencarian_institusi.php
                              </a>
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              accept="application/pdf"
                              onChange={(e) => setImagebanpt(e.target.files[0])}
                            />
                          </div>
                        </div>
                        <div>
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
