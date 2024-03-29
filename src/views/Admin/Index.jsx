//import layout
import Cookies from "js-cookie";
import LayoutAdmin from "../../layouts/Admin";
import { useEffect, useState } from "react";
import Api from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
//import permissions
import hasAnyPermission from "../../utils/Permissions";
import toast from "react-hot-toast";

export default function Dashboard() {
  document.title = "Dashboard - Beasiswa";

  //navigata
  const navigate = useNavigate();

  const [nim, setNim] = useState("");
  const [ktm, setKtm] = useState("");
  const [universitas, setUniversitas] = useState("");
  const [alamatuniv, setAlamatuniv] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [imageaktifkampus, setImageaktifkampus] = useState("");
  const [imagesuratpernyataan, setImagesuratpernyataan] = useState("");
  const [imageakrekampus, setImageakrekampus] = useState("");
  const [imagesuratbeasiswa, setImagesuratbeasiswa] = useState("");
  const [pilihuniversitas, setPilihuniversitas] = useState("");
  const [jenisuniversitas, setJenisuniversitas] = useState("");
  const [jeniskota, setJeniskota] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [errors, setErros] = useState([]);
  const [users, setUsers] = useState(0);

  const [usersbyid, setUsersByid] = useState("");
  const [step, setStep] = useState("");

  //token from cookies
  const token = Cookies.get("token");

  //hook useEffect
  useEffect(() => {
    //fetch api
    Api.get("/api/admin/dashboard", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setUsers(response.data.data.users);
    });
  }, []);

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
      setUsersByid(response.data.data.id);
      setStep(response.data.data.step);
    });
  }, []);

  //get data user from cookies
  const user = JSON.parse(Cookies.get("user"));

  const handleFileKtm = (e) => {
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
        setKtm(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setKtm("");

      toast.error("Format File KTM Tidak Cocok Harus PDF", {
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
    setKtm(imageData);
  };

  const handleFileAktifKuliah = (e) => {
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
        setImageaktifkampus(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setImageaktifkampus("");

      toast.error("Format File Surat Aktif Kulia Tidak Cocok Harus PDF", {
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
    setImageaktifkampus(imageData);
  };

  const handleFileSuratPernyataan = (e) => {
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
        setImagesuratpernyataan(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setImagesuratpernyataan("");

      toast.error("Format File Surat Pernyataan Tidak Cocok Harus PDF", {
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
    setImagesuratpernyataan(imageData);
  };

  const handleFileAkre = (e) => {
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
        setImageakrekampus(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setImageakrekampus("");

      toast.error(
        "Format File Surat Akredetasi Universitas Tidak Cocok Harus PDF",
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
    setImageakrekampus(imageData);
  };

  const handleFileSuratBeasiswa = (e) => {
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
        setImagesuratbeasiswa(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setImagesuratbeasiswa("");

      toast.error(
        "Format File Surat Pernyataan Tidak Menerima Beasiwa Lain Tidak Cocok Harus PDF",
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
    setImagesuratbeasiswa(imageData);
  };

  const handleshowhidePilih = (event) => {
    const getType = event.target.value;
    setPilihuniversitas(getType);
  };

  const handleshowhideJenis = (event) => {
    const getType = event.target.value;
    setJenisuniversitas(getType);
  };

  const handleshowKota = (event) => {
    const getType = event.target.value;
    setJeniskota(getType);
  };

  const updateUsers = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nim", nim);
    formData.append("ktm", ktm);
    formData.append("universitas", universitas);
    formData.append("alamat_univ", alamatuniv);
    formData.append("jurusan", jurusan);
    formData.append("imageaktifkampus", imageaktifkampus);
    formData.append("imagesuratpernyataan", imagesuratpernyataan);
    formData.append("imageakrekampus", imageakrekampus);
    formData.append("imagesuratbeasiswa", imagesuratbeasiswa);
    formData.append("pilih_universitas", pilihuniversitas);
    formData.append("jenis_universitas", jenisuniversitas);
    formData.append("_method", "PUT");

    await Api.post(`/api/users/${usersbyid}`, formData, {
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
        <div className="container-fluid px-4 mb-4 mt-3">
          <div className="alert alert-success" role="alert">
            Selamat Datang <b>{user.name}</b>
          </div>

          {hasAnyPermission(["mahasiswa.index"]) && (
            <>
              <hr />
              {step === 1 ? (
                <div className="row">
                  <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm border-top-success">
                      <div className="card-body">
                        <h6>
                          <i className="fa fa-shield-alt"></i> Lengkapi Data
                          Perguruan Tinggi Anda
                        </h6>
                        <hr />
                        <form onSubmit={updateUsers}>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  NIM (No Induk Mahasiswa)
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={nim}
                                  onChange={(e) => setNim(e.target.value)}
                                  placeholder="Enter NIM"
                                />
                              </div>
                              {errors.nim && (
                                <div className="alert alert-danger">
                                  {errors.nim[0]}
                                </div>
                              )}
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Upload KTM (Kartu Induk Mahasiswa) pdf dan
                                  maksimal 2MB
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={handleFileKtm}
                                />
                              </div>
                              {errors.ktm && (
                                <div className="alert alert-danger">
                                  {errors.ktm[0]}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Universitas
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={universitas}
                                  onChange={(e) =>
                                    setUniversitas(e.target.value)
                                  }
                                  placeholder="Enter Nama Universitas"
                                />
                              </div>
                              {errors.universitas && (
                                <div className="alert alert-danger">
                                  {errors.universitas[0]}
                                </div>
                              )}
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Jurusan
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={jurusan}
                                  onChange={(e) => setJurusan(e.target.value)}
                                  placeholder="Enter Nama Jurusan"
                                />
                              </div>
                              {errors.jurusan && (
                                <div className="alert alert-danger">
                                  {errors.jurusan[0]}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Alamat Universitas
                                </label>
                                <textarea
                                  type="text"
                                  className="form-control"
                                  value={alamatuniv}
                                  onChange={(e) =>
                                    setAlamatuniv(e.target.value)
                                  }
                                  placeholder="Enter Alamat Universitas"
                                  rows="4" // Set the number of visible text lines
                                  cols="50"
                                />
                              </div>
                              {errors.alamat_univ && (
                                <div className="alert alert-danger">
                                  {errors.alamat_univ[0]}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Upload Surat Aktif Kuliah pdf dan maksimal 2MB
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={handleFileAktifKuliah}
                                />
                              </div>
                              {errors.imageaktifkampus && (
                                <div className="alert alert-danger">
                                  {errors.imageaktifkampus[0]}
                                </div>
                              )}
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Upload Surat Pernyataan Bermaterai pdf dan
                                  maksimal 2MB
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={handleFileSuratPernyataan}
                                />
                              </div>
                              {errors.imagesuratpernyataan && (
                                <div className="alert alert-danger">
                                  {errors.imagesuratpernyataan[0]}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Upload Akredetasi Dari Universitas pdf dan
                                maksimal 2MB
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                onChange={handleFileAkre}
                              />
                            </div>
                            {errors.imageakrekampus && (
                              <div className="alert alert-danger">
                                {errors.imageakrekampus[0]}
                              </div>
                            )}
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Pilih Universitas Dalam Negeri / Luar Negeri
                              </label>
                              <select
                                className="form-select"
                                value={pilihuniversitas}
                                onChange={handleshowhidePilih}
                              >
                                <option value="">
                                  -- Pilih Universitas Dalam Negeri / Luar
                                  Negeri --
                                </option>
                                <option value="Dalam">Dalam Negeri</option>
                                <option value="Luar">Luar Negeri</option>
                              </select>
                            </div>
                            {errors.pilih_universitas && (
                              <div className="alert alert-danger">
                                {errors.pilih_universitas[0]}
                              </div>
                            )}
                          </div>
                          {pilihuniversitas === "Dalam" && (
                            <>
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label className="form-label fw-bold">
                                    Upload Surat Tidak Menerima Beasiswa Lain dan
                                    maksimal 2MB
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileSuratBeasiswa}
                                  />
                                </div>
                                {errors.imagesuratbeasiswa && (
                                  <div className="alert alert-danger">
                                    {errors.imagesuratbeasiswa[0]}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label className="form-label fw-bold">
                                    Pilih Sidoarjo atau Luar Sidoarjo
                                  </label>
                                  <select
                                    className="form-select"
                                    value={jeniskota}
                                    onChange={handleshowKota}
                                  >
                                    <option value="">
                                      -- Pilih Sidoarjo atau Luar Sidoarjo --
                                    </option>
                                    <option value="sidoarjo">Sidoarjo</option>
                                    <option value="luar">Luar Sidoarjo</option>
                                  </select>
                                </div>
                                {errors.jenis_universitas && (
                                  <div className="alert alert-danger">
                                    {errors.jenis_universitas[0]}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label className="form-label fw-bold">
                                    Pilih Universitas Negeri / Swasta
                                  </label>
                                  <select
                                    className="form-select"
                                    value={jenisuniversitas}
                                    onChange={handleshowhideJenis}
                                  >
                                    <option value="">
                                      -- Pilih Universitas PTN / PTS --
                                    </option>
                                    <option value="Negeri">
                                      PTN (Perguruan Tinggi Negeri)
                                    </option>
                                    <option value="Swasta">
                                      PTS (Perguruan Tinggi Swasta)
                                    </option>
                                  </select>
                                </div>
                                {errors.jenis_universitas && (
                                  <div className="alert alert-danger">
                                    {errors.jenis_universitas[0]}
                                  </div>
                                )}
                              </div>
                            </>
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
                  </div>
                </div>
              ) : (
                <div className="alert alert-danger" role="alert">
                  Anda Sudah Menyelesaikan tahap Input Data Mahasiswa di
                  Beasiswa Silahkan Ke Menu Kategori Beasiswa Untuk Memilih
                  SALAH SATU DARI BEBERAPA BEASISWA Kab.Sidoarjo
                </div>
              )}
            </>
          )}

          {/* KUSUS ADMIN */}
          {hasAnyPermission(["permissions.index"]) && (
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <strong>{users}</strong> Users
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <Link
                      className="small text-white stretched-link"
                      to="/admin/users"
                    >
                      View Details
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
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
