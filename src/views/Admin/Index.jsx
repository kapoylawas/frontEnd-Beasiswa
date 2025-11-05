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
        .maintenance-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 20px;
          min-height: 60vh;
        }

        .maintenance-card {
          background: white;
          border-radius: 20px;
          padding: 50px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          max-width: 600px;
          width: 100%;
          border: 1px solid #e8f0ff;
        }

        .maintenance-icon {
          font-size: 4.5rem;
          color: #1e3c72;
          margin-bottom: 25px;
          line-height: 1;
        }

        .maintenance-title {
          color: #1e3c72;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .maintenance-text {
          color: #475569;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .maintenance-subtext {
          color: #64748b;
          font-size: 0.95rem;
          background-color: #f8fafc;
          padding: 10px 15px;
          border-radius: 10px;
        }

        .welcome-banner {
          display: flex;
          align-items: center;
          gap: 20px;
          background: linear-gradient(135deg, #e0f7fa 0%, #e8eaf6 100%);
          color: #1e3c72;
          padding: 25px;
          border-radius: 15px;
          margin-bottom: 30px;
          border: 1px solid #d1d9e6;
        }

        .welcome-icon-container {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .welcome-text h4 {
          margin: 0 0 5px 0;
          font-weight: 700;
        }

        .welcome-text p {
          margin: 0;
          font-size: 1rem;
          color: #475569;
        }

        .form-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }

        .form-card-header {
          margin-bottom: 25px;
        }

        .form-card-header h2 {
          color: #1e3c72;
          font-size: 1.6rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .form-card-header p {
          color: #64748b;
          font-size: 1rem;
        }

        .form-label {
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #f8fafc;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .upload-area {
          position: relative;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          background-color: #f8fafc;
        }

        .upload-area:hover {
          border-color: #3b82f6;
          background-color: #f0f5ff;
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
          font-size: 2.2rem;
          color: #94a3b8;
          margin-bottom: 10px;
        }

        .upload-content p {
          color: #1e3c72;
          font-weight: 600;
          margin-bottom: 5px;
          font-size: 1rem;
        }

        .upload-content span {
          color: #64748b;
          font-size: 0.875rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .btn-submit, .btn-reset {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
        }

        .btn-submit {
          background-color: #1e3c72;
          color: white;
        }

        .btn-submit:hover:not(:disabled) {
          background-color: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.2);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-reset {
          background-color: #f1f5f9;
          color: #475569;
        }

        .btn-reset:hover {
          background-color: #e2e8f0;
        }

        /* Upload Progress Styles */
        .upload-progress-container {
          margin-top: 15px;
          padding: 15px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .upload-info {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 10px;
        }

        .file-name {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #334155;
          flex: 1;
        }

        .file-name i {
          color: #e53e3e;
        }

        .progress-percentage {
          font-weight: 700;
          color: #1e3c72;
          font-size: 0.9rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #1e3c72, #2a5298);
          border-radius: 10px;
          transition: width 0.3s ease;
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
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
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
          gap: 8px;
          color: #059669;
          font-weight: 600;
          margin-top: 10px;
          font-size: 0.9rem;
        }

        .upload-success i {
          font-size: 1rem;
        }
      `}</style>
    </LayoutAdmin>
  );
}