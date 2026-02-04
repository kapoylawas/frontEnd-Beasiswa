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
  const [yatims, setYatims] = useState(0);
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
      setYatims(response.data.data.yatims);
      setDinsoses(response.data.data.dinsoses);
      setKesras(response.data.data.kesras);
      setLuarNegeris(response.data.data.luarNegeris);
      setNonAkademiks(response.data.data.nonAkademiks);
      setTerdaftars(response.data.terdaftar);
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
    setUploadProgress((prev) => ({ ...prev, [fileType]: 0 }));

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
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
        simulateUploadProgress("ktm");
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
    simulateUploadProgress("ktm");
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
        simulateUploadProgress("aktifKuliah");
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
    simulateUploadProgress("aktifKuliah");
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
        simulateUploadProgress("suratPernyataan");
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
    simulateUploadProgress("suratPernyataan");
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
        simulateUploadProgress("akreKampus");
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
        },
      );
      return;
    }
    setImageakrekampus(imageData);
    simulateUploadProgress("akreKampus");
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
        simulateUploadProgress("suratBeasiswa");
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
        },
      );
      return;
    }
    setImagesuratbeasiswa(imageData);
    simulateUploadProgress("suratBeasiswa");
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
  };

  const updateUsers = async (e) => {
    e.preventDefault();

    // Lakukan validasi di sini sebelum mengirim form
    if (pilihuniversitas === "Dalam" && !imagesuratbeasiswa) {
      toast.error(
        "Mohon Upload Surat Tidak Menerima Beasiswa Lain dan maksimal 2MB",
      );
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
        loading: "Saving...",
        success: (response) => {
          navigate("/admin/mahasiswa");
          return <b>Submit Telah Berhasil!</b>;
        },
        error: (error) => {
          setLoading(false);
          setErros(error.response.data);
          return <b>Lengkapi Data Anda!!</b>;
        },
      },
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
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
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
          {hasAnyPermission(["mahasiswa.index"]) && (
            <div className="registration-guide mt-3">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h6 className="mb-0">
                    <i className="fas fa-graduation-cap me-2"></i>
                    Proses Pendaftaran Beasiswa 2026
                  </h6>
                </div>
                <div className="card-body">
                  {/* Step 2 dengan visual yang lebih jelas */}
                  <div className="step-card mb-3 p-3 border rounded">
                    <div className="d-flex align-items-start">
                      <span className="badge bg-primary rounded-pill me-3">
                        Step 2
                      </span>
                      <div className="flex-grow-1">
                        <h6 className="text-primary mb-2">
                          Menyiapkan Surat Pernyataan Yang Akan Di Upload Surat
                          Pernyataan Bermaterai
                        </h6>

                        <div className="row mt-2">
                          <div className="col-md-6 mb-2">
                            <div className="p-3 border rounded h-100 bg-light">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-file-contract text-primary fs-4 me-3"></i>
                                <div>
                                  <h6 className="mb-0">Beasiswa Umum</h6>
                                  <small className="text-muted">
                                    Non-keagamaan
                                  </small>
                                </div>
                              </div>
                              <p className="small mb-2">
                                Download template untuk beasiswa reguler
                                (beasiswa prestasi dan beasiswa kurang mampu)
                              </p>
                            </div>
                          </div>

                          <div className="col-md-6 mb-2">
                            <div className="p-3 border rounded h-100 bg-light">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-pray text-primary fs-4 me-3"></i>
                                <div>
                                  <h6 className="mb-0">Beasiswa Keagamaan</h6>
                                  <small className="text-muted">
                                    Agama tertentu
                                  </small>
                                </div>
                              </div>
                              <p className="small mb-2">
                                Download template khusus beasiswa keagamaan
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="alert alert-warning mt-3 mb-0 p-2 small">
                          <i className="fas fa-exclamation-triangle me-1"></i>
                          <strong>Perhatian:</strong> Pilih surat pernyataan
                          sesuai jenis beasiswa yang Anda daftar. Setelah
                          download, isi form dengan lengkap dan klik{" "}
                          <strong>Simpan</strong>.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Steps lainnya dalam bentuk list */}
                  <div className="mt-4">
                    <h6 className="mb-3">Langkah Selanjutnya:</h6>
                    <div className="list-group list-group-flush">
                      <div className="list-group-item d-flex align-items-center">
                        <div className="me-3">
                          <span className="badge bg-secondary rounded-circle">
                            1
                          </span>
                        </div>
                        <div>
                          <h6 className="mb-0 small">
                            Lengkapi Data Perguruan Tinggi
                          </h6>
                          <p className="mb-0 text-muted small">
                            Informasi institusi pendidikan
                          </p>
                        </div>
                      </div>

                      <div className="list-group-item d-flex align-items-center">
                        <div className="me-3">
                          <span className="badge bg-secondary rounded-circle">
                            3
                          </span>
                        </div>
                        <div>
                          <h6 className="mb-0 small">
                            Pilih Kategori Beasiswa di MENU KATEGORI BEASISWA
                          </h6>
                          <p className="mb-0 text-muted small">
                            Tentukan bidang yang sesuai
                          </p>
                        </div>
                      </div>

                      <div className="list-group-item d-flex align-items-center">
                        <div className="me-3">
                          <span className="badge bg-secondary rounded-circle">
                            4
                          </span>
                        </div>
                        <div>
                          <h6 className="mb-0 small">
                            Verifikasi Dokumen di MENU RIWAYAT PENDAFTAR
                          </h6>
                          <p className="mb-0 text-muted small">
                            Pastikan semua dokumen sudah lengkap
                          </p>
                        </div>
                      </div>

                      <div className="list-group-item d-flex align-items-center">
                        <div className="me-3">
                          <span className="badge bg-success rounded-circle">
                            5
                          </span>
                        </div>
                        <div>
                          <h6 className="mb-0 small">
                            Verifikasi Akhir & Simpan di MENU RIWAYAT PENDAFTAR
                          </h6>
                          <p className="mb-0 text-muted small">
                            Centang verifikasi dan simpan pendaftaran
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {maintenance ? (
            <>
              <div className="maintenance-container">
                <div className="maintenance-card">
                  <div className="maintenance-icon">
                    <i className="fas fa-calendar-times"></i>
                  </div>
                  <h2 className="maintenance-title">
                    Pendaftaran Telah Ditutup
                  </h2>
                  <p className="maintenance-text">
                    Mohon maaf, periode pendaftaran beasiswa untuk saat ini
                    telah berakhir. Terima kasih atas antusiasme Anda.
                  </p>
                  <p className="maintenance-subtext">
                    Nantikan informasi pendaftaran periode selanjutnya di
                    website ini.
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
                          <p>
                            Pastikan semua data diisi dengan benar untuk
                            melanjutkan ke tahap selanjutnya.
                          </p>
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
                                    <input
                                      type="file"
                                      className="upload-input"
                                      onChange={handleFileKtm}
                                      accept=".pdf"
                                    />
                                    <div className="upload-content">
                                      <i className="fas fa-cloud-upload-alt"></i>
                                      <p>
                                        {ktm
                                          ? ktm.name
                                          : "Klik atau seret file ke sini"}
                                      </p>
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
                                  <label className="form-label">Jurusan</label>
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
                                    <input
                                      type="file"
                                      className="upload-input"
                                      onChange={handleFileAktifKuliah}
                                      accept=".pdf"
                                    />
                                    <div className="upload-content">
                                      <i className="fas fa-cloud-upload-alt"></i>
                                      <p>
                                        {imageaktifkampus
                                          ? imageaktifkampus.name
                                          : "Klik atau seret file ke sini"}
                                      </p>
                                      <span>Format: PDF, Maks: 2MB</span>
                                    </div>
                                  </div>
                                  {imageaktifkampus &&
                                    uploadProgress.aktifKuliah !==
                                      undefined && (
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
                                  <label className="form-label fw-bold">
                                    Upload Surat Pernyataan Bermaterai
                                    <span className="text-danger">*</span>
                                  </label>

                                  <div className="mb-3">
                                    <p className="text-muted mb-2">
                                      <i className="fas fa-info-circle me-1"></i>{" "}
                                      Format: PDF, Maksimal: 2MB
                                    </p>

                                    <div className="row g-3">
                                      <div className="col-md-6">
                                        <div className="card border-primary h-100">
                                          <div className="card-body text-center">
                                            <i
                                              className="fas fa-file-alt text-primary mb-2"
                                              style={{ fontSize: "2rem" }}
                                            ></i>
                                            <h6 className="card-title">
                                              Surat Pernyataan Umum
                                            </h6>
                                            <p className="card-text small text-muted">
                                              Untuk keperluan umum
                                            </p>
                                            <a
                                              href="/surat.pdf"
                                              download
                                              target="_blank"
                                              rel="noreferrer"
                                              className="btn btn-outline-primary btn-sm"
                                            >
                                              <i className="fas fa-download me-1"></i>{" "}
                                              Unduh Contoh
                                            </a>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="card border-success h-100">
                                          <div className="card-body text-center">
                                            <i
                                              className="fas fa-handshake text-success mb-2"
                                              style={{ fontSize: "2rem" }}
                                            ></i>
                                            <h6 className="card-title">
                                              Surat Pernyataan Keagamaan
                                            </h6>
                                            <p className="card-text small text-muted">
                                              Untuk Beasiswa Bidang Keagamaan
                                            </p>
                                            <a
                                              href="/surat_kesra.pdf"
                                              download
                                              target="_blank"
                                              rel="noreferrer"
                                              className="btn btn-outline-success btn-sm"
                                            >
                                              <i className="fas fa-download me-1"></i>{" "}
                                              Unduh Contoh
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="upload-area border-2 border-dashed rounded-3 p-4 text-center bg-light">
                                    <input
                                      type="file"
                                      className="upload-input"
                                      onChange={handleFileSuratPernyataan}
                                      accept=".pdf"
                                      id="suratPernyataan"
                                    />
                                    <label
                                      htmlFor="suratPernyataan"
                                      className="cursor-pointer"
                                    >
                                      <div className="upload-content">
                                        <i className="fas fa-cloud-upload-alt fa-2x text-muted mb-3"></i>
                                        <h5 className="mb-2">
                                          {imagesuratpernyataan ? (
                                            <span className="text-success">
                                              <i className="fas fa-check-circle me-2"></i>
                                              {imagesuratpernyataan.name}
                                            </span>
                                          ) : (
                                            "Klik atau seret file ke sini"
                                          )}
                                        </h5>
                                        <p className="text-muted mb-0">
                                          Format: PDF | Maksimal: 2MB
                                        </p>
                                      </div>
                                    </label>
                                  </div>

                                  {imagesuratpernyataan &&
                                    uploadProgress.suratPernyataan !==
                                      undefined && (
                                      <div className="mt-3">
                                        <UploadProgressBar
                                          progress={
                                            uploadProgress.suratPernyataan
                                          }
                                          fileName={imagesuratpernyataan.name}
                                          fileType="suratPernyataan"
                                        />
                                      </div>
                                    )}
                                </div>

                                {errors.imagesuratpernyataan && (
                                  <div className="alert alert-danger d-flex align-items-center mt-2">
                                    <i className="fas fa-exclamation-circle me-2"></i>
                                    <div>{errors.imagesuratpernyataan[0]}</div>
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
                                  <input
                                    type="file"
                                    className="upload-input"
                                    onChange={handleFileAkre}
                                    accept=".pdf"
                                  />
                                  <div className="upload-content">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <p>
                                      {imageakrekampus
                                        ? imageakrekampus.name
                                        : "Klik atau seret file ke sini"}
                                    </p>
                                    <span>Format: PDF, Maks: 2MB</span>
                                  </div>
                                </div>
                                {imageakrekampus &&
                                  uploadProgress.akreKampus !== undefined && (
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
                                    -- Pilih Universitas --
                                  </option>
                                  <option value="Dalam">Dalam Negeri</option>
                                  {/* <option value="Luar">Luar Negeri</option> */}
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
                                      <input
                                        type="file"
                                        className="upload-input"
                                        onChange={handleFileSuratBeasiswa}
                                        accept=".pdf"
                                      />
                                      <div className="upload-content">
                                        <i className="fas fa-cloud-upload-alt"></i>
                                        <p>
                                          {imagesuratbeasiswa
                                            ? imagesuratbeasiswa.name
                                            : "Klik atau seret file ke sini"}
                                        </p>
                                        <span>Format: PDF, Maks: 2MB</span>
                                      </div>
                                    </div>
                                    {imagesuratbeasiswa &&
                                      uploadProgress.suratBeasiswa !==
                                        undefined && (
                                        <UploadProgressBar
                                          progress={
                                            uploadProgress.suratBeasiswa
                                          }
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
                              <button type="reset" className="btn-reset">
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
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card dashboard-card dashboard-card-primary border-0 shadow-lg">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="dashboard-icon-wrapper bg-primary bg-opacity-10">
                        <i className="fas fa-users text-primary"></i>
                      </div>
                      <div className="ms-3">
                        <div className="text-muted small text-uppercase fw-semibold">
                          Total Pendaftar Mahasiswa
                        </div>
                        <div className="h3 fw-bold mb-0">{users}</div>
                        <div className="text-success small mt-1">
                          <i className="fas fa-arrow-up me-1"></i> Active
                          Accounts
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-top-0 py-3">
                    <Link
                      className="text-primary fw-medium stretched-link d-flex align-items-center"
                      to="/admin/users"
                    >
                      View Details
                      <i className="fas fa-arrow-right ms-2 small"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {hasAnyPermission(["dashboard.index"]) && (
            <>
              {/* Row 1: Akademik, Non-Akademik, Luar Negeri */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-dark mb-0">
                      <i className="fas fa-file-alt me-2 text-primary"></i>
                      Beasiswa Prestasi
                    </h5>
                    <div className="text-muted small">
                      <i className="fas fa-sync-alt me-1"></i> Real-time Data
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="card dashboard-card dashboard-card-success border-0 shadow-sm h-100">
                    <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                      <h6 className="fw-bold mb-0">
                        <i className="fas fa-graduation-cap me-2"></i>
                        AKADEMIK
                      </h6>
                      
                    </div>
                    <div className="card-body py-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="dashboard-stat-item mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <i className="fas fa-user-check fa-sm text-success me-2"></i>
                              <span className="text-muted small">
                                Pendaftar
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h4 fw-bold text-dark">
                                {akademiks}
                              </div>
                              <div className="text-success fw-bold small">
                                100%
                              </div>
                            </div>
                          </div>

                          <div className="dashboard-stat-item mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <i className="fas fa-check-circle fa-sm text-success me-2"></i>
                              <span className="text-muted small">
                                Sudah Verif
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h5 fw-bold text-dark">
                                {dashboard.jumlahSudahVerifAkademik}
                              </div>
                              <div className="text-success fw-bold small">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifAkademik /
                                    akademiks) *
                                    100 || 0,
                                )}
                                %
                              </div>
                            </div>
                            <div
                              className="progress mt-2"
                              style={{ height: "4px" }}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{
                                  width: `${(dashboard.jumlahSudahVerifAkademik / akademiks) * 100 || 0}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div className="dashboard-stat-item">
                            <div className="d-flex align-items-center mb-1">
                              <i className="fas fa-id-card fa-sm text-success me-2"></i>
                              <span className="text-muted small">
                                NIK Verif
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h5 fw-bold text-dark">
                                {dashboard.jumlahSudahVerifNikAkademik}
                              </div>
                              <div className="text-info fw-bold small">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifNikAkademik /
                                    akademiks) *
                                    100 || 0,
                                )}
                                %
                              </div>
                            </div>
                            <div
                              className="progress mt-2"
                              style={{ height: "4px" }}
                            >
                              <div
                                className="progress-bar bg-info"
                                style={{
                                  width: `${(dashboard.jumlahSudahVerifNikAkademik / akademiks) * 100 || 0}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 d-flex align-items-center justify-content-center">
                          <div className="dashboard-chart-circle">
                            <div className="text-center">
                              <div className="h3 fw-bold text-success">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifAkademik /
                                    akademiks) *
                                    100 || 0,
                                )}
                                %
                              </div>
                              <div className="text-muted small">Verified</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-top py-3">
                      <Link
                        className="text-success fw-medium stretched-link d-flex align-items-center justify-content-between"
                        to="/admin/users"
                      >
                        <span>Detail Analytics</span>
                        <i className="fas fa-chart-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="card dashboard-card dashboard-card-warning border-0 shadow-sm h-100">
                    <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                      <h6 className="fw-bold mb-0">
                        <i className="fas fa-briefcase me-2"></i>
                        NON AKADEMIK
                      </h6>
                      
                    </div>
                    <div className="card-body py-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="dashboard-stat-item mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <i className="fas fa-user-check fa-sm text-warning me-2"></i>
                              <span className="text-muted small">
                                Pendaftar
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h4 fw-bold text-dark">
                                {nonAkademiks}
                              </div>
                              <div className="text-warning fw-bold small">
                                100%
                              </div>
                            </div>
                          </div>

                          <div className="dashboard-stat-item mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <i className="fas fa-check-circle fa-sm text-warning me-2"></i>
                              <span className="text-muted small">
                                Sudah Verif
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h5 fw-bold text-dark">
                                {dashboard.jumlahSudahVerifNonAkademik}
                              </div>
                              <div className="text-warning fw-bold small">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifNonAkademik /
                                    nonAkademiks) *
                                    100 || 0,
                                )}
                                %
                              </div>
                            </div>
                            <div
                              className="progress mt-2"
                              style={{ height: "4px" }}
                            >
                              <div
                                className="progress-bar bg-warning"
                                style={{
                                  width: `${(dashboard.jumlahSudahVerifNonAkademik / nonAkademiks) * 100 || 0}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div className="dashboard-stat-item">
                            <div className="d-flex align-items-center mb-1">
                              <i className="fas fa-id-card fa-sm text-warning me-2"></i>
                              <span className="text-muted small">
                                NIK Verif
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h5 fw-bold text-dark">
                                {dashboard.jumlahSudahVerifNikNonAkademik}
                              </div>
                              <div className="text-info fw-bold small">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifNikNonAkademik /
                                    nonAkademiks) *
                                    100 || 0,
                                )}
                                %
                              </div>
                            </div>
                            <div
                              className="progress mt-2"
                              style={{ height: "4px" }}
                            >
                              <div
                                className="progress-bar bg-info"
                                style={{
                                  width: `${(dashboard.jumlahSudahVerifNikNonAkademik / nonAkademiks) * 100 || 0}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 d-flex align-items-center justify-content-center">
                          <div className="dashboard-chart-circle">
                            <div className="text-center">
                              <div className="h3 fw-bold text-warning">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifNonAkademik /
                                    nonAkademiks) *
                                    100 || 0,
                                )}
                                %
                              </div>
                              <div className="text-muted small">Verified</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-top py-3">
                      <Link
                        className="text-warning fw-medium stretched-link d-flex align-items-center justify-content-between"
                        to="/admin/users"
                      >
                        <span>Detail Analytics</span>
                        <i className="fas fa-chart-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="card dashboard-card dashboard-card-info border-0 shadow-sm h-100">
                    <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                      <h6 className="fw-bold mb-0">
                        <i className="fas fa-globe-americas me-2"></i>
                        LUAR NEGERI
                      </h6>
                      
                    </div>
                    <div className="card-body py-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="dashboard-stat-item mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <i className="fas fa-user-check fa-sm text-info me-2"></i>
                              <span className="text-muted small">
                                Pendaftar
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h4 fw-bold text-dark">
                                {luarNegeris}
                              </div>
                              <div className="text-info fw-bold small">
                                100%
                              </div>
                            </div>
                          </div>

                          <div className="dashboard-stat-item mb-3">
                            <div className="d-flex align-items-center mb-1">
                              <i className="fas fa-check-circle fa-sm text-info me-2"></i>
                              <span className="text-muted small">
                                Sudah Verif
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h5 fw-bold text-dark">
                                {dashboard.jumlahSudahVerifLuarNegeri}
                              </div>
                              <div className="text-info fw-bold small">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifLuarNegeri /
                                    luarNegeris) *
                                    100 || 0,
                                )}
                                %
                              </div>
                            </div>
                            <div
                              className="progress mt-2"
                              style={{ height: "4px" }}
                            >
                              <div
                                className="progress-bar bg-info"
                                style={{
                                  width: `${(dashboard.jumlahSudahVerifLuarNegeri / luarNegeris) * 100 || 0}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div className="dashboard-stat-item">
                            <div className="d-flex align-items-center mb-1">
                              <i className="fas fa-id-card fa-sm text-info me-2"></i>
                              <span className="text-muted small">
                                NIK Verif
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="h5 fw-bold text-dark">
                                {dashboard.jumlahSudahVerifNikLuarNegeri}
                              </div>
                              <div className="text-success fw-bold small">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifNikLuarNegeri /
                                    luarNegeris) *
                                    100 || 0,
                                )}
                                %
                              </div>
                            </div>
                            <div
                              className="progress mt-2"
                              style={{ height: "4px" }}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{
                                  width: `${(dashboard.jumlahSudahVerifNikLuarNegeri / luarNegeris) * 100 || 0}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 d-flex align-items-center justify-content-center">
                          <div className="dashboard-chart-circle">
                            <div className="text-center">
                              <div className="h3 fw-bold text-info">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifLuarNegeri /
                                    luarNegeris) *
                                    100 || 0,
                                )}
                                %
                              </div>
                              <div className="text-muted small">Verified</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-top py-3">
                      <Link
                        className="text-info fw-medium stretched-link d-flex align-items-center justify-content-between"
                        to="/admin/users"
                      >
                        <span>Detail Analytics</span>
                        <i className="fas fa-chart-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Dinsos dan Yatim */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-dark mb-0">
                      <i className="fas fa-hands-helping me-2 text-primary"></i>
                      Beasiswa Pendidikan Tinggi Kurang Mampu dan Yatim
                    </h5>
                  </div>
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                  <div className="card dashboard-card dashboard-card-primary border-0 shadow-sm h-100">
                    <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                      <h6 className="fw-bold mb-0">
                        <i className="fas fa-hands-helping me-2"></i>
                        DINSOS
                      </h6>
                      
                    </div>
                    <div className="card-body py-3">
                      <div className="dashboard-stat-grid">
                        <div className="stat-box">
                          <div className="d-flex align-items-center mb-1">
                            <div className="dashboard-icon-sm bg-primary bg-opacity-10 text-primary me-2">
                              <i className="fas fa-users fa-sm"></i>
                            </div>
                            <div className="flex-grow-1">
                              <div className="text-muted small">Pendaftar</div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="h3 fw-bold text-dark">
                                  {dinsoses}
                                </div>
                                <div className="text-primary fw-bold small">
                                  100%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="stat-box">
                          <div className="d-flex align-items-center mb-1">
                            <div className="dashboard-icon-sm bg-success bg-opacity-10 text-success me-2">
                              <i className="fas fa-check-circle fa-sm"></i>
                            </div>
                            <div className="flex-grow-1">
                              <div className="text-muted small">
                                Sudah Verif
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="h4 fw-bold text-dark">
                                  {dashboard.jumlahSudahVerifDinsos}
                                </div>
                                <div className="text-success fw-bold small">
                                  {Math.round(
                                    (dashboard.jumlahSudahVerifDinsos /
                                      dinsoses) *
                                      100 || 0,
                                  )}
                                  %
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="text-muted small mb-1">
                              Progress Verifikasi
                            </div>
                            <div className="progress" style={{ height: "6px" }}>
                              <div
                                className="progress-bar bg-success"
                                style={{
                                  width: `${(dashboard.jumlahSudahVerifDinsos / dinsoses) * 100 || 0}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="stat-box">
                          <div className="d-flex align-items-center mb-1">
                            <div className="dashboard-icon-sm bg-info bg-opacity-10 text-info me-2">
                              <i className="fas fa-id-card fa-sm"></i>
                            </div>
                            <div className="flex-grow-1">
                              <div className="text-muted small">NIK Verif</div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="h4 fw-bold text-dark">
                                  {dashboard.jumlahSudahVerifNikDinsos}
                                </div>
                                <div className="text-info fw-bold small">
                                  {Math.round(
                                    (dashboard.jumlahSudahVerifNikDinsos /
                                      dinsoses) *
                                      100 || 0,
                                  )}
                                  %
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="text-muted small mb-1">
                              Progress NIK
                            </div>
                            <div className="progress" style={{ height: "6px" }}>
                              <div
                                className="progress-bar bg-info"
                                style={{
                                  width: `${(dashboard.jumlahSudahVerifNikDinsos / dinsoses) * 100 || 0}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-top py-3">
                      <Link
                        className="text-primary fw-medium stretched-link d-flex align-items-center"
                        to="/admin/users"
                      >
                        <i className="fas fa-chart-pie me-2"></i>
                        View Detailed Report
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                  <div className="card dashboard-card dashboard-card-danger border-0 shadow-sm h-100">
                    <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                      <h6 className="fw-bold mb-0">
                        <i className="fas fa-child me-2"></i>
                        YATIM (SD, SMP, SMA)
                      </h6>
                     
                    </div>
                    <div className="card-body py-3 d-flex align-items-center justify-content-center">
                      <div className="text-center">
                        <div className="dashboard-large-number">
                          <div className="d-flex justify-content-center align-items-baseline mb-2">
                            <div className="h1 fw-bold text-danger me-2">
                              {yatims}
                            </div>
                          </div>
                          <div className="text-muted mb-3">Total Pendaftar</div>
                          
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-top py-3">
                      <Link
                        className="text-danger fw-medium stretched-link d-flex align-items-center"
                        to="/admin/users"
                      >
                        <i className="fas fa-user-friends me-2"></i>
                        Manage Yatim Data
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Kesra */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-dark mb-0">
                      <i className="fas fa-heart me-2 text-primary"></i>
                      Beasiswa Bidang Keagamaan
                    </h5>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                  <div className="card dashboard-card dashboard-card-purple border-0 shadow-sm h-100">
                    <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                      <h6 className="fw-bold mb-0">
                        <i className="fas fa-heart me-2"></i>
                        KESRA
                      </h6>
                      
                    </div>
                    <div className="card-body py-3">
                      <div className="dashboard-stat-vertical">
                        <div className="stat-item-with-progress mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="text-muted">
                              <i className="fas fa-user-plus me-1"></i>
                              Pendaftar
                            </span>
                            <div className="d-flex align-items-center">
                              <span className="h5 fw-bold text-dark me-2">
                                {kesras}
                              </span>
                              <span className="text-purple fw-bold small">
                                100%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="stat-item-with-progress mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="text-muted">
                              <i className="fas fa-check-circle me-1"></i>
                              Sudah Verif
                            </span>
                            <div className="d-flex align-items-center">
                              <span className="h5 fw-bold text-dark me-2">
                                {dashboard.jumlahSudahVerifKesra}
                              </span>
                              <span className="text-success fw-bold small">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifKesra / kesras) *
                                    100 || 0,
                                )}
                                %
                              </span>
                            </div>
                          </div>
                          <div
                            className="progress mt-2"
                            style={{ height: "5px" }}
                          >
                            <div
                              className="progress-bar bg-success"
                              style={{
                                width: `${(dashboard.jumlahSudahVerifKesra / kesras) * 100 || 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="stat-item-with-progress">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="text-muted">
                              <i className="fas fa-id-card me-1"></i>
                              NIK Verif
                            </span>
                            <div className="d-flex align-items-center">
                              <span className="h5 fw-bold text-dark me-2">
                                {dashboard.jumlahSudahVerifNikKesra}
                              </span>
                              <span className="text-info fw-bold small">
                                {Math.round(
                                  (dashboard.jumlahSudahVerifNikKesra /
                                    kesras) *
                                    100 || 0,
                                )}
                                %
                              </span>
                            </div>
                          </div>
                          <div
                            className="progress mt-2"
                            style={{ height: "5px" }}
                          >
                            <div
                              className="progress-bar bg-info"
                              style={{
                                width: `${(dashboard.jumlahSudahVerifNikKesra / kesras) * 100 || 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-top">
                        <div className="text-center">
                          <div className="h4 fw-bold text-purple mb-1">
                            {Math.round(
                              ((dashboard.jumlahSudahVerifKesra +
                                dashboard.jumlahSudahVerifNikKesra) /
                                (kesras * 2)) *
                                100 || 0,
                            )}
                            %
                          </div>
                          <div className="text-muted small">
                            Overall Progress
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent border-top py-3">
                      <Link
                        className="text-purple fw-medium stretched-link d-flex align-items-center justify-content-between"
                        to="/admin/users"
                      >
                        <span>Kesra Analytics</span>
                        <i className="fas fa-external-link-alt"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
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
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
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
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
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

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #f8fafc;
        }

        .form-input:focus,
        .form-textarea:focus {
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

        .btn-submit,
        .btn-reset {
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
          content: "";
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

        /* Dashboard Custom Styles */
        .dashboard-card {
          border-radius: 12px;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          overflow: hidden;
        }

        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        }

        .dashboard-card-primary {
          border-left: 4px solid #4e73df;
        }

        .dashboard-card-success {
          border-left: 4px solid #1cc88a;
        }

        .dashboard-card-warning {
          border-left: 4px solid #f6c23e;
        }

        .dashboard-card-info {
          border-left: 4px solid #36b9cc;
        }

        .dashboard-card-danger {
          border-left: 4px solid #e74a3b;
        }

        .dashboard-card-purple {
          border-left: 4px solid #6f42c1;
        }

        .dashboard-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .dashboard-icon-sm {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dashboard-stat-item {
          padding: 12px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .dashboard-stat-item:last-child {
          border-bottom: none;
        }

        .dashboard-chart-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(28, 200, 138, 0.1) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dashboard-stat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .dashboard-stat-vertical .stat-item-with-progress {
          padding: 15px;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 8px;
        }

        .dashboard-large-number {
          padding: 20px;
        }

        .dashboard-stats-breakdown {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .dashboard-stat-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-chart-circle {
            width: 80px;
            height: 80px;
          }
        }

        /* Color utilities */
        .bg-opacity-10 {
          background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
        }

        .text-purple {
          color: #6f42c1 !important;
        }

        .bg-purple {
          background-color: #6f42c1 !important;
        }
      `}</style>
    </LayoutAdmin>
  );
}
