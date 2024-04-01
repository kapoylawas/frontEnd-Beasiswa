//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";
import ModalAkredetasi from "../../../components/general/ModalAkredetasi";

export default function Akademik() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  //navigata
  const navigate = useNavigate();

  const [ipk, setIpk] = useState("");
  const [semester, setSemester] = useState("");
  const [akreKampus, setAkreKampus] = useState("");
  const [progam, setProgam] = useState("");
  const [transkripNilai, setTranskripNilai] = useState("");
  // const [hasilAkhir, setHasilAkhir] = useState("");
  const [banpt, setBanpt] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [users, setUsers] = useState("");
  const [step, setStep] = useState("");

  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  const handleshowhideSemester = (event) => {
    const getType = event.target.value;
    setSemester(getType);
  };

  const handleshowhideProgam = (event) => {
    const getType = event.target.value;
    setProgam(getType);
  };

  const handleshowhideAkreditasi = (event) => {
    const getType = event.target.value;
    setAkreKampus(getType);
  };

  const handleGPAChange = (event) => {
    setIpk(event.target.value);
  };

  // handle onchange transkrip nilai
  const handleFileTranskripNilai = (e) => {
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
        setTranskripNilai(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setTranskripNilai("");

      toast.error("Format File Transkrip Nilai Tidak Cocok Harus PDF", {
        duration: 5000,
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setTranskripNilai(imageData);
  };

  // handel onchange keterangan hasil akhir
  // const handleHasilAkhir = (e) => {
  //   const imageData = e.target.files[0];

  //   if (imageData) {
  //     const maxSize = 2 * 1024 * 1024; // 2MB

  //     if (imageData.size > maxSize) {
  //       toast.error("Ukuran file melebihi batas (2MB)", {
  //         duration: 5000,
  //         position: "top-center",
  //         style: {
  //           borderRadius: "10px",
  //           background: "#333",
  //           color: "#fff",
  //         },
  //       });
  //     } else {
  //       setHasilAkhir(imageData);
  //     }
  //   }

  //   if (!imageData.type.match("pdf.*")) {
  //     setHasilAkhir("");

  //     toast.error("Format File Keterangan/Hasil Akhir Tidak Cocok Harus PDF", {
  //       duration: 5000,
  //       position: "top-center",
  //       style: {
  //         borderRadius: "10px",
  //         background: "#333",
  //         color: "#fff",
  //       },
  //     });
  //     return;
  //   }
  //   setHasilAkhir(imageData);
  // };

  const handleFileBanpt = (e) => {
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
        setBanpt(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setBanpt("");

      toast.error("Format File Bukti BANPT Tidak Cocok Harus PDF", {
        duration: 5000,
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setBanpt(imageData);
  };

  const storeAkademik = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate GPA
    if (parseFloat(ipk) < 3.4) {
      // Display toast message
      toast.error("IPK harus minimal 3.4", {
        position: "top-center",
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("ipk", ipk);
    formData.append("semester", semester);
    formData.append("akredetasi_kampus", akreKampus);
    formData.append("progam_pendidikan", progam);
    formData.append("imagetranskrip", transkripNilai);
    // formData.append("imageketerangan", hasilAkhir);
    formData.append("imagebanpt", banpt);

    await Api.post("/api/admin/akademiks", formData, {
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

  return (
    <LayoutAdmin>
      <main>
        <ModalAkredetasi />
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
                    <form onSubmit={storeAkademik}>
                      <div className="row">
                        <div className="col-md-6">
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
                          {errors.ipk && (
                            <div className="alert alert-danger">
                              {errors.ipk[0]}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Semester
                            </label>
                            <select
                              className="form-select"
                              value={semester}
                              onChange={handleshowhideSemester}
                            >
                              <option value="">-- Select Semester --</option>
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
                          {errors.semester && (
                            <div className="alert alert-danger">
                              {errors.semester[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row"></div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Akreditasi Universitas
                            </label>
                            <select
                              className="form-select"
                              value={akreKampus}
                              onChange={handleshowhideAkreditasi}
                            >
                              <option value="">
                                -- Select Akreditasi Universitas --
                              </option>
                              <option value="1">Unggul</option>
                              <option value="2">Baik Sekali</option>
                              <option value="3">Baik</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                            </select>
                          </div>
                          {errors.akredetasi_kampus && (
                            <div className="alert alert-danger">
                              {errors.akredetasi_kampus[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Bukti Akredetasi Dari BANPT
                              PDF dan Maksimal 2MB (Upload Screenshoot) Link DIBAWAH :
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
                              onChange={handleFileBanpt}
                            />
                          </div>
                          {errors.imagebanpt && (
                            <div className="alert alert-danger">
                              {errors.imagebanpt[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Program Pendidikan (Jurusan Non Eksakta/Sosial Dan
                              Jurusan Eksakta/Sains) *Wajib Pilih Salah Satu
                            </label>
                            <select
                              className="form-select"
                              value={progam}
                              onChange={handleshowhideProgam}
                            >
                              <option value="">
                                -- Select Program Pendidikan --
                              </option>
                              <option value="non">Jurusan Non Eksakta</option>
                              <option value="eksakta">
                                Sosial Dan Jurusan Eksakta/Sains
                              </option>
                            </select>
                          </div>
                          {errors.progam_pendidikan && (
                            <div className="alert alert-danger">
                              {errors.progam_pendidikan[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Transkrip Nilai Pada Semester Akhir Yang Ditempuh
                              PDF dan Maksimal 2MB
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleFileTranskripNilai}
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
