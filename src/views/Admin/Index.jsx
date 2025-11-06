//import layout
import Cookies from "js-cookie";
import LayoutAdmin from "../../layouts/Admin";
import { useEffect, useState } from "react";
import Api from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
//import permissions
import hasAnyPermission from "../../utils/Permissions";
import toast from "react-hot-toast";
//import Surat from "../../../public/images/surat.docx";
import Logo from "../../../public/images/lock.svg";
import './Dashboard.css';


export default function Dashboard() {
  document.title = "Dashboard - Beasiswa";

  //navigata
  const navigate = useNavigate();

  const maintenance = false;

  const [nim, setNim] = useState("");
  const [ktm, setKtm] = useState("");
  const [universitas, setUniversitas] = useState("");
  const [alamatuniv, setAlamatuniv] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [imageaktifkampus, setImageaktifkampus] = useState("");
  const [imagesuratpernyataan, setImagesuratpernyataan] = useState("");
  const [imageakrekampus, setImageakrekampus] = useState("");

  // file surat tidak menerima beasiswa lain
  const [imagesuratbeasiswa, setImagesuratbeasiswa] = useState(null);

  // pilih dalamnegeri/luarnegeri
  const [pilihuniversitas, setPilihuniversitas] = useState("");

  const [jenisuniversitas, setJenisuniversitas] = useState("");
  const [jeniskota, setJeniskota] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const [errors, setErros] = useState([]);
  const [dashboard, setDashboard] = useState("");
  const [users, setUsers] = useState(0);

  const [akademiks, setAkademiks] = useState(0);
  const [dinsoses, setDinsoses] = useState(0);
  const [kesras, setKesras] = useState(0);
  const [luarNegeris, setLuarNegeris] = useState(0);
  const [nonAkademiks, setNonAkademiks] = useState(0);
  const [terdaftars, setTerdaftars] = useState("");

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
      setDashboard(response.data.data);
      setUsers(response.data.data.users);
      setAkademiks(response.data.data.akademiks);
      setDinsoses(response.data.data.dinsoses);
      setKesras(response.data.data.kesras);
      setLuarNegeris(response.data.data.luarNegeris);
      setNonAkademiks(response.data.data.nonAkademiks);
      setTerdaftars(response.data.terdaftar)
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

  const terdaftarCookie = Cookies.get("terdaftar");
  let terdaftar;

  if (terdaftarCookie) {
    try {
      terdaftar = JSON.parse(terdaftarCookie);
    } catch (e) {
      console.error("Parsing error:", e);
      terdaftar = undefined;
    }
  }

  // Function to simulate upload progress
  const simulateUploadProgress = (fileType) => {
    setUploadProgress(prev => ({ ...prev, [fileType]: 0 }));

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev[fileType] + Math.floor(Math.random() * 10) + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [fileType]: 100 };
        }
        return { ...prev, [fileType]: newProgress };
      });
    }, 200);
  };

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
        simulateUploadProgress('ktm');
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
    simulateUploadProgress('ktm');
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
        simulateUploadProgress('aktifKuliah');
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
    simulateUploadProgress('aktifKuliah');
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
        simulateUploadProgress('suratPernyataan');
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
    simulateUploadProgress('suratPernyataan');
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
        simulateUploadProgress('akreKampus');
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
    simulateUploadProgress('akreKampus');
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
        simulateUploadProgress('suratBeasiswa');
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
    simulateUploadProgress('suratBeasiswa');
  };

  // pilih univ negeri/luarnegeri
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

  const handleChangeNIM = (event) => {
    const inputValue = event.target.value;

    // Memungkinkan huruf dan angka
    const alphanumericValue = inputValue.replace(/[^a-zA-Z0-9]/g, "");

    setNim(alphanumericValue);
  }

  const updateUsers = async (e) => {
    e.preventDefault();

    // Lakukan validasi di sini sebelum mengirim form
    if (pilihuniversitas === "Dalam" && !imagesuratbeasiswa) {
      toast.error("Mohon Upload Surat Tidak Menerima Beasiswa Lain dan maksimal 2MB");
      return;
    }

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

    toast.promise(
      Api.post(`/api/users/${usersbyid}`, formData, {
        // Header
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        loading: 'Saving...',
        success: (response) => {
          navigate("/admin/mahasiswa");
          return <b>Submit Telah Berhasil!</b>;
        },
        error: (error) => {
          setLoading(false);
          setErros(error.response.data);
          return <b>Lengkapi Data Anda!!</b>;
        },
      }
    );
  };

  // Component untuk progress bar yang bisa digunakan kembali
  const UploadProgressBar = ({ progress, fileName, fileType }) => (
    <div className="upload-progress-container">
      <div className="upload-info">
        <div className="file-name">
          <i className="fas fa-file-pdf"></i>
          {fileName}
        </div>
        <div className="progress-percentage">{progress}%</div>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {progress === 100 && (
        <div className="upload-success">
          <i className="fas fa-check-circle"></i>
          Upload Berhasil!
        </div>
      )}
    </div>
  );

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-4 mb-4">
          <div className="welcome-banner">
            <div className="welcome-icon-container">
              <i className="fas fa-bullhorn"></i>
            </div>
            <div className="welcome-text">
              <h4>Selamat Datang, {user.name}!</h4>
              <p>{terdaftar ? terdaftar : "Anda belum terdaftar sebagai penerima beasiswa tahun 2024. Silakan lengkapi data Anda untuk mendaftar."}</p>
            </div>
          </div>

          {maintenance ? (
            <>
              <div className="maintenance-container">
                <div className="maintenance-card">
                  <div className="maintenance-icon">
                    <i className="fas fa-calendar-times"></i>
                  </div>
                  <h2 className="maintenance-title">Pendaftaran Telah Ditutup</h2>
                  <p className="maintenance-text">
                    Mohon maaf, periode pendaftaran beasiswa untuk saat ini telah berakhir.
                    Terima kasih atas antusiasme Anda.
                  </p>
                  <p className="maintenance-subtext">
                    Nantikan informasi pendaftaran periode selanjutnya di website ini.
                  </p>
                </div>
              </div>
            </>
          ) : (
            hasAnyPermission(["mahasiswa.index"]) && (
              <>
                <hr />
                {step === 1 ? (
                  <div className="row">
                    <div className="col-12">
                      <div className="form-card">
                        <div className="form-card-header">
                          <h2>
                            <i className="fas fa-university"></i> Lengkapi Data
                            Perguruan Tinggi Anda
                          </h2>
                          <p>Pastikan semua data diisi dengan benar untuk melanjutkan ke tahap selanjutnya.</p>
                          <hr />
                        </div>
                        <div className="form-card-body">
                          <form onSubmit={updateUsers}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    NIM (No Induk Mahasiswa)
                                  </label>
                                  <input
                                    type="text"
                                    className="form-input"
                                    value={nim}
                                    onChange={handleChangeNIM}
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
                                  <label className="form-label">
                                    Upload KTM (Kartu Induk Mahasiswa) pdf dan
                                    maksimal 2MB
                                  </label>
                                  <div className="upload-area">
                                    <input type="file" className="upload-input" onChange={handleFileKtm} accept=".pdf" />
                                    <div className="upload-content">
                                      <i className="fas fa-cloud-upload-alt"></i>
                                      <p>{ktm ? ktm.name : 'Klik atau seret file ke sini'}</p>
                                      <span>Format: PDF, Maks: 2MB</span>
                                    </div>
                                  </div>
                                  {ktm && uploadProgress.ktm !== undefined && (
                                    <UploadProgressBar
                                      progress={uploadProgress.ktm}
                                      fileName={ktm.name}
                                      fileType="ktm"
                                    />
                                  )}
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
                                  <label className="form-label">
                                    Universitas
                                  </label>
                                  <input
                                    type="text"
                                    className="form-input"
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
                                  <label className="form-label">
                                    Jurusan
                                  </label>
                                  <input
                                    type="text"
                                    className="form-input"
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
                                  <label className="form-label">
                                    Alamat Universitas
                                  </label>
                                  <textarea
                                    type="text"
                                    className="form-textarea"
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
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Upload Surat Aktif Kuliah pdf dan maksimal
                                    2MB
                                  </label>
                                  <div className="upload-area">
                                    <input type="file" className="upload-input" onChange={handleFileAktifKuliah} accept=".pdf" />
                                    <div className="upload-content">
                                      <i className="fas fa-cloud-upload-alt"></i>
                                      <p>{imageaktifkampus ? imageaktifkampus.name : 'Klik atau seret file ke sini'}</p>
                                      <span>Format: PDF, Maks: 2MB</span>
                                    </div>
                                  </div>
                                  {imageaktifkampus && uploadProgress.aktifKuliah !== undefined && (
                                    <UploadProgressBar
                                      progress={uploadProgress.aktifKuliah}
                                      fileName={imageaktifkampus.name}
                                      fileType="aktifKuliah"
                                    />
                                  )}
                                </div>
                                {errors.imageaktifkampus && (
                                  <div className="alert alert-danger">
                                    {errors.imageaktifkampus[0]}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Upload Surat Pernyataan Bermaterai pdf dan maksimal 2MB{" "}
                                    <a
                                      href="/surat.pdf" // Link to the file in the public folder
                                      download
                                      target="_blank"
                                    >
                                      (Contoh Surat Pernyataan)
                                    </a>
                                  </label>
                                  <div className="upload-area">
                                    <input type="file" className="upload-input" onChange={handleFileSuratPernyataan} accept=".pdf" />
                                    <div className="upload-content">
                                      <i className="fas fa-cloud-upload-alt"></i>
                                      <p>{imagesuratpernyataan ? imagesuratpernyataan.name : 'Klik atau seret file ke sini'}</p>
                                      <span>Format: PDF, Maks: 2MB</span>
                                    </div>
                                  </div>
                                  {imagesuratpernyataan && uploadProgress.suratPernyataan !== undefined && (
                                    <UploadProgressBar
                                      progress={uploadProgress.suratPernyataan}
                                      fileName={imagesuratpernyataan.name}
                                      fileType="suratPernyataan"
                                    />
                                  )}
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
                                <label className="form-label">
                                  Upload Akredetasi Dari Universitas/Kampus pdf
                                  dan maksimal 2MB
                                </label>
                                <div className="upload-area">
                                  <input type="file" className="upload-input" onChange={handleFileAkre} accept=".pdf" />
                                  <div className="upload-content">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <p>{imageakrekampus ? imageakrekampus.name : 'Klik atau seret file ke sini'}</p>
                                    <span>Format: PDF, Maks: 2MB</span>
                                  </div>
                                </div>
                                {imageakrekampus && uploadProgress.akreKampus !== undefined && (
                                  <UploadProgressBar
                                    progress={uploadProgress.akreKampus}
                                    fileName={imageakrekampus.name}
                                    fileType="akreKampus"
                                  />
                                )}
                              </div>
                              {errors.imageakrekampus && (
                                <div className="alert alert-danger">
                                  {errors.imageakrekampus[0]}
                                </div>
                              )}
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Pilih Universitas Dalam Negeri / Luar Negeri
                                </label>
                                <select
                                  className="form-input"
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
                                    <label className="form-label">
                                      Upload Surat Tidak Menerima Beasiswa Lain
                                      dan maksimal 2MB
                                    </label>
                                    <div className="upload-area">
                                      <input type="file" className="upload-input" onChange={handleFileSuratBeasiswa} accept=".pdf" />
                                      <div className="upload-content">
                                        <i className="fas fa-cloud-upload-alt"></i>
                                        <p>{imagesuratbeasiswa ? imagesuratbeasiswa.name : 'Klik atau seret file ke sini'}</p>
                                        <span>Format: PDF, Maks: 2MB</span>
                                      </div>
                                    </div>
                                    {imagesuratbeasiswa && uploadProgress.suratBeasiswa !== undefined && (
                                      <UploadProgressBar
                                        progress={uploadProgress.suratBeasiswa}
                                        fileName={imagesuratbeasiswa.name}
                                        fileType="suratBeasiswa"
                                      />
                                    )}
                                  </div>
                                  {errors.imagesuratbeasiswa && (
                                    <div className="alert alert-danger">
                                      {errors.imagesuratbeasiswa[0]}
                                    </div>
                                  )}
                                </div>

                                <div className="col-md-12">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Pilih Sidoarjo atau Luar Sidoarjo
                                    </label>
                                    <select
                                      className="form-input"
                                      value={jeniskota}
                                      onChange={handleshowKota}
                                    >
                                      <option value="">
                                        -- Pilih Sidoarjo atau Luar Sidoarjo --
                                      </option>
                                      <option value="sidoarjo">Sidoarjo</option>
                                      <option value="luar">
                                        Luar Sidoarjo
                                      </option>
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
                                    <label className="form-label">
                                      Pilih Universitas Negeri / Swasta
                                    </label>
                                    <select
                                      className="form-input"
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
                            <div className="form-actions">
                              <button
                                type="submit"
                                className="btn-submit"
                                disabled={isLoading}
                              >
                                {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                              </button>
                              <button
                                type="reset"
                                className="btn-reset"
                              >
                                <i className="fas fa-sync-alt"></i> Reset
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
            )
          )}

          {hasAnyPermission(["dispenduk.index"]) && (
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

          {hasAnyPermission(["dashboard.index"]) && (
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                  <div className="card-header d-flex bg-danger align-items-center justify-content-between">
                    AKADEMIK
                  </div>
                  <div className="card-body">
                    <strong>{akademiks}</strong> Pendaftar
                    <hr />
                    <strong>{dashboard.jumlahSudahVerifAkademik}</strong> Sudah
                    Di Verif
                    <hr />
                    <strong>{dashboard.jumlahSudahVerifNikAkademik}</strong> NIK
                    Yang Sudah Di Verif
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
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                  <div className="card-header d-flex bg-danger align-items-center justify-content-between">
                    NON AKADEMIK
                  </div>
                  <div className="card-body">
                    <strong>{nonAkademiks}</strong> Pendaftar
                    <hr />
                    <strong>
                      {dashboard.jumlahSudahVerifNonAkademik}
                    </strong>{" "}
                    Sudah Di Verif
                    <hr />
                    <strong>
                      {dashboard.jumlahSudahVerifNikNonAkademik}
                    </strong>{" "}
                    NIK Yang Sudah Di Verif
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
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                  <div className="card-header d-flex bg-danger align-items-center justify-content-between">
                    LUAR NEGERI
                  </div>
                  <div className="card-body">
                    <strong>{luarNegeris}</strong> Pendaftar
                    <hr />
                    <strong>{dashboard.jumlahSudahVerifLuarNegeri}</strong>{" "}
                    Sudah Di Verif
                    <hr />
                    <strong>
                      {dashboard.jumlahSudahVerifNikLuarNegeri}
                    </strong>{" "}
                    NIK Yang Sudah Di Verif
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

          {hasAnyPermission(["dashboard.index"]) && (
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                  <div className="card-header d-flex bg-danger align-items-center justify-content-between">
                    DINSOS
                  </div>
                  <div className="card-body">
                    <strong>{dinsoses}</strong> Pendaftar
                    <hr />
                    <strong>{dashboard.jumlahSudahVerifDinsos}</strong> Sudah Di
                    Verif
                    <hr />
                    <strong>{dashboard.jumlahSudahVerifNikDinsos}</strong> NIK
                    Yang Sudah Di Verif
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

          {hasAnyPermission(["dashboard.index"]) && (
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                  <div className="card-header d-flex bg-danger align-items-center justify-content-between">
                    KESRA
                  </div>
                  <div className="card-body">
                    <strong>{kesras}</strong> Pendaftar
                    <hr />
                    <strong>{dashboard.jumlahSudahVerifKesra}</strong> Sudah Di
                    Verif
                    <hr />
                    <strong>{dashboard.jumlahSudahVerifNikKesra}</strong> NIK
                    Yang Sudah Di Verif
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

          {/* KUSUS ADMIN */}
        </div>
      </main>
      <style jsx>{`
        // Tambahkan di file Dashboard.css atau dalam komponen
        .dashboard-container {
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .welcome-banner {
          display: flex;
          align-items: center;
          gap: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 20px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .welcome-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .welcome-icon-container {
          width: 70px;
          height: 70px;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          z-index: 1;
        }

        .welcome-text {
          position: relative;
          z-index: 1;
        }

        .welcome-text h4 {
          margin: 0 0 8px 0;
          font-weight: 700;
          font-size: 1.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .welcome-text p {
          margin: 0;
          font-size: 1.05rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .maintenance-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
          min-height: 50vh;
        }

        .maintenance-card {
          background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(0, 0, 0, 0.02);
          max-width: 600px;
          width: 100%;
          border: 1px solid #e8f0ff;
          position: relative;
          overflow: hidden;
        }

        .maintenance-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff6b6b, #ee5a24);
        }

        .maintenance-icon {
          font-size: 5rem;
          color: #ee5a24;
          margin-bottom: 30px;
          line-height: 1;
          filter: drop-shadow(0 4px 8px rgba(238, 90, 36, 0.2));
        }

        .maintenance-title {
          color: #1a202c;
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #1a202c, #2d3748);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .maintenance-text {
          color: #4a5568;
          font-size: 1.15rem;
          line-height: 1.7;
          margin-bottom: 25px;
          font-weight: 500;
        }

        .maintenance-subtext {
          color: #718096;
          font-size: 1rem;
          background: linear-gradient(135deg, #f7fafc, #edf2f7);
          padding: 15px 20px;
          border-radius: 12px;
          border-left: 4px solid #ee5a24;
        }

        .form-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(0, 0, 0, 0.02);
          margin-bottom: 30px;
          border: 1px solid #f1f5f9;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .form-card:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 25px 80px rgba(0, 0, 0, 0.12),
            0 0 0 1px rgba(0, 0, 0, 0.03);
        }

        .form-card-header {
          margin-bottom: 30px;
          text-align: center;
        }

        .form-card-header h2 {
          color: #1e3c72;
          font-size: 1.8rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .form-card-header h2 i {
          color: #3b82f6;
          font-size: 1.6rem;
        }

        .form-card-header p {
          color: #64748b;
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0;
        }

        .form-card-header hr {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
          margin: 20px 0 0 0;
        }

        .form-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 10px;
          font-size: 0.95rem;
          display: block;
        }

        .form-label a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .form-label a:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        .form-input, .form-textarea, .form-select {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #f8fafc;
          font-family: inherit;
        }

        .form-input:focus, .form-textarea:focus, .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: white;
          box-shadow: 
            0 0 0 4px rgba(59, 130, 246, 0.1),
            0 4px 12px rgba(59, 130, 246, 0.1);
          transform: translateY(-1px);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.5;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 16px;
          padding-right: 45px;
        }

        .upload-area {
          position: relative;
          border: 2px dashed #cbd5e1;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          background-color: #f8fafc;
          overflow: hidden;
        }

        .upload-area::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent);
          transition: left 0.6s ease;
        }

        .upload-area:hover::before {
          left: 100%;
        }

        .upload-area:hover {
          border-color: #3b82f6;
          background-color: #f0f5ff;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .upload-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .upload-content i {
          font-size: 2.5rem;
          color: #94a3b8;
          margin-bottom: 12px;
          transition: color 0.3s ease;
        }

        .upload-area:hover .upload-content i {
          color: #3b82f6;
        }

        .upload-content p {
          color: #374151;
          font-weight: 600;
          margin-bottom: 6px;
          font-size: 1.05rem;
          transition: color 0.3s ease;
        }

        .upload-area:hover .upload-content p {
          color: #1e3c72;
        }

        .upload-content span {
          color: #64748b;
          font-size: 0.9rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          margin-top: 40px;
          padding-top: 25px;
          border-top: 1px solid #e2e8f0;
        }

        .btn-submit, .btn-reset {
          padding: 14px 28px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          font-family: inherit;
          position: relative;
          overflow: hidden;
        }

        .btn-submit::before, .btn-reset::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .btn-submit:hover::before, .btn-reset:hover::before {
          left: 100%;
        }

        .btn-submit {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 
            0 8px 25px rgba(30, 60, 114, 0.4),
            0 0 0 1px rgba(30, 60, 114, 0.1);
        }

        .btn-submit:active {
          transform: translateY(-1px);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .btn-reset {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .btn-reset:hover {
          background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Upload Progress Styles */
        .upload-progress-container {
          margin-top: 20px;
          padding: 20px;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .upload-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .file-name {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: #374151;
          flex: 1;
          font-size: 0.95rem;
        }

        .file-name i {
          color: #e53e3e;
          font-size: 1.1rem;
        }

        .progress-percentage {
          font-weight: 700;
          color: #1e3c72;
          font-size: 0.95rem;
          background: white;
          padding: 4px 10px;
          border-radius: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #1e3c72, #3b82f6, #60a5fa);
          border-radius: 10px;
          transition: width 0.4s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
          animation: progress-stripes 1s linear infinite;
        }

        @keyframes progress-stripes {
          0% {
            background-position: 1rem 0;
          }
          100% {
            background-position: 0 0;
          }
        }

        .upload-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #059669;
          font-weight: 600;
          margin-top: 12px;
          font-size: 0.95rem;
          background: white;
          padding: 10px 15px;
          border-radius: 10px;
          border: 1px solid #a7f3d0;
          animation: success-bounce 0.6s ease;
        }

        @keyframes success-bounce {
          0%, 20%, 60%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          80% {
            transform: translateY(-2px);
          }
        }

        .upload-success i {
          font-size: 1.1rem;
        }

        /* Card Statistics Styles */
        .card {
          border: none;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .card-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }

        .card-body {
          padding: 25px;
        }

        .card-body strong {
          font-size: 2rem;
          font-weight: 800;
        }

        /* Alert Styles */
        .alert {
          border: none;
          border-radius: 12px;
          padding: 20px;
          font-weight: 500;
        }

        .alert-danger {
          background: linear-gradient(135deg, #fed7d7, #feb2b2);
          color: #c53030;
          border-left: 4px solid #e53e3e;
        }

        .alert-success {
          background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
          color: #276749;
          border-left: 4px solid #38a169;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .welcome-banner {
            flex-direction: column;
            text-align: center;
            padding: 25px 20px;
          }
          
          .welcome-icon-container {
            width: 60px;
            height: 60px;
            font-size: 1.6rem;
          }
          
          .form-card {
            padding: 25px 20px;
            margin: 0 -15px;
            border-radius: 0;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .btn-submit, .btn-reset {
            width: 100%;
            justify-content: center;
          }
          
          .maintenance-card {
            padding: 40px 25px;
          }
          
          .maintenance-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </LayoutAdmin>
  );
}