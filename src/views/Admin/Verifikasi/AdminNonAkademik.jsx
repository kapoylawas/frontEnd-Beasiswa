//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import { Link } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";
import LoadingTable from "../../../components/general/LoadingTable";
import Pagination from "../../../components/general/Pagination";
import toast from "react-hot-toast";

export default function AdminNonAkademik() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  //token from cookies
  const token = Cookies.get("token");

  //define state "nonakademik"
  const [nonAkademiks, setNonAkademiks] = useState([]);

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  const [selectTipeVerif, setSelectTipeVerif] = useState("");

  const handleselectTipeVerif = (event) => {
    const getType = event.target.value;
    setSelectTipeVerif(getType);
  };

  const [selectStatusKetrima, setSelectStatusKetrima] = useState("");

  const handleselectStatusKetrima = (event) => {
    const getStatus = event.target.value;
    setSelectStatusKetrima(getStatus);
  };

  const [showSpjmtModal, setShowSpjmtModal] = useState(false);
  const [spjmtUrl, setSpjmtUrl] = useState("");
  const [spjmtName, setSpjmtName] = useState("");

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [isLoading, setLoading] = useState(false);

  // State untuk Quick Audit Modal Non-Stop (Verifikasi Kilat 5000+ Berkas Non-Akademik)
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [currentQuickIndex, setCurrentQuickIndex] = useState(0);
  const [activeDocTab, setActiveDocTab] = useState("sertifikat");
  const [quickAlasan, setQuickAlasan] = useState("");
  const [isSubmittingQuick, setIsSubmittingQuick] = useState(false);

  const fetchData = async (pageNumber = 1, keywords = "") => {
    setLoading(true);
    const page = pageNumber ? pageNumber : pagination.currentPage;
    try {
      const response = await Api.get(
        `/api/admin/beasiswa/nonAkademiks?search=${keywords}&page=${page}&jenis_verif=${selectTipeVerif}&status_ketrima=${selectStatusKetrima}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataList = response.data.data.data;
      setNonAkademiks(dataList);

      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });

      return dataList;
    } catch (err) {
      toast.error("Gagal mengambil data pendaftar.");
      return [];
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  //useEffect
  useEffect(() => {
    fetchData();
    const handleBeforeUnload = (event) => {
      event.returnValue = "Are you sure you want to leave this page?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectTipeVerif, selectStatusKetrima]);

  // Helper: cek apakah user punya file SPJMT yang valid
  const checkHasSpjmtFile = (imagespjmt) => {
    if (!imagespjmt) return false;
    return (
      imagespjmt.match(/\.(pdf|jpg|jpeg|png|gif)$/i) ||
      (!imagespjmt.endsWith('/dokumen/nonakademik') &&
        !imagespjmt.endsWith('/storage/imagespjmt') &&
        !imagespjmt.endsWith('/storage/imagespjmt/'))
    );
  };

  // Function untuk membuka modal SPJMT
  const handleViewSpjmt = (nonAkademik) => {
    const imagespjmt = nonAkademik?.user?.imagespjmt;
    if (!checkHasSpjmtFile(imagespjmt)) {
      toast.error('File SPJMT belum diupload');
      return;
    }

    let fileUrl = imagespjmt;
    if (!fileUrl.startsWith('http')) {
      fileUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${fileUrl}`;
    }

    setSpjmtUrl(fileUrl);
    setSpjmtName(`SPJMT - ${nonAkademik.user.name}`);
    setShowSpjmtModal(true);
  };

  // Function untuk menutup modal
  const handleCloseSpjmtModal = () => {
    setShowSpjmtModal(false);
    setSpjmtUrl("");
    setSpjmtName("");
  };

  // Helper URL dokumen
  const getFileFullUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http")) return filePath;
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
    return `${baseUrl}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  const currentQuickItem = nonAkademiks[currentQuickIndex] || null;

  const handleOpenQuickAudit = (index) => {
    setCurrentQuickIndex(index);
    const item = nonAkademiks[index];
    setQuickAlasan(item?.user?.alasan || "");
    setActiveDocTab("sertifikat");
    setShowQuickModal(true);
  };

  const getDocUrl = (docType) => {
    if (!currentQuickItem) return "";
    let path = "";
    switch (docType) {
      case "sertifikat":
        path = currentQuickItem.imagesertifikat;
        break;
      case "ktp":
        path = currentQuickItem.user?.imagektp;
        break;
      case "kk":
        path = currentQuickItem.user?.imagekk;
        break;
      case "aktifkampus":
        path = currentQuickItem.user?.imageaktifkampus;
        break;
      case "suratpernyataan":
        path = currentQuickItem.user?.imagesuratpernyataan;
        break;
      case "akrekampus":
        path = currentQuickItem.user?.imageakrekampus;
        break;
      case "beasiswalain":
        path = currentQuickItem.user?.imagesuratbeasiswa;
        break;
      case "spjmt":
        path = currentQuickItem.user?.imagespjmt;
        break;
      default:
        path = currentQuickItem.imagesertifikat;
    }
    return getFileFullUrl(path);
  };

  // Navigasi Non-Stop Melintasi Halaman (Page Crossing)
  const handleNextCandidate = async () => {
    if (currentQuickIndex < nonAkademiks.length - 1) {
      const nextIdx = currentQuickIndex + 1;
      setCurrentQuickIndex(nextIdx);
      setQuickAlasan(nonAkademiks[nextIdx]?.user?.alasan || "");
    } else if (pagination.currentPage * pagination.perPage < pagination.total) {
      toast.loading("Memuat data halaman berikutnya...", { id: "page-load" });
      const nextItems = await fetchData(pagination.currentPage + 1, keywords);
      toast.dismiss("page-load");
      if (nextItems && nextItems.length > 0) {
        setCurrentQuickIndex(0);
        setQuickAlasan(nextItems[0]?.user?.alasan || "");
        toast.success(`Halaman ${pagination.currentPage + 1} berhasil dimuat! Melanjutkan verifikasi...`);
      } else {
        toast.success("Seluruh data pendaftar telah selesai diverifikasi!");
        setShowQuickModal(false);
      }
    } else {
      toast.success("Selamat! Seluruh data pendaftar telah selesai diverifikasi!");
      setShowQuickModal(false);
    }
  };

  const handlePrevCandidate = async () => {
    if (currentQuickIndex > 0) {
      const prevIdx = currentQuickIndex - 1;
      setCurrentQuickIndex(prevIdx);
      setQuickAlasan(nonAkademiks[prevIdx]?.user?.alasan || "");
    } else if (pagination.currentPage > 1) {
      toast.loading("Memuat data halaman sebelumnya...", { id: "page-load" });
      const prevItems = await fetchData(pagination.currentPage - 1, keywords);
      toast.dismiss("page-load");
      if (prevItems && prevItems.length > 0) {
        const lastIdx = prevItems.length - 1;
        setCurrentQuickIndex(lastIdx);
        setQuickAlasan(prevItems[lastIdx]?.user?.alasan || "");
      }
    }
  };

  const handleQuickSubmit = async (jenisVerif) => {
    if (!currentQuickItem) return;
    setIsSubmittingQuick(true);
    const formData = new FormData();
    const finalAlasan =
      quickAlasan ||
      (jenisVerif === "lolos"
        ? "Dokumen lengkap & memenuhi kriteria verifikasi"
        : "Dokumen tidak sesuai kriteria");

    formData.append("alasan", finalAlasan);
    formData.append("jenis_verif", jenisVerif);
    formData.append("verifikator_berkas", "Admin Disporapar");
    formData.append("_method", "PUT");

    try {
      await Api.post(
        `/api/admin/verif/nonAkademik/${currentQuickItem.user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );

      toast.success(
        `Berhasil! ${currentQuickItem.user.name} ➔ ${
          jenisVerif === "lolos" ? "LOLOS VERIFIKASI" : "TIDAK LOLOS"
        }`,
        { duration: 2000 }
      );

      // Update local state instan agar baris tabel langsung berubah warna
      setNonAkademiks((prev) => {
        const nextData = [...prev];
        if (nextData[currentQuickIndex]) {
          nextData[currentQuickIndex].user.jenis_verif = jenisVerif;
          nextData[currentQuickIndex].user.alasan = finalAlasan;
        }
        return nextData;
      });

      // Otomatis Lanjut ke Peserta Berikutnya (Lintas Halaman Non-Stop)
      await handleNextCandidate();
    } catch (err) {
      toast.error("Gagal menyimpan status verifikasi.");
    } finally {
      setIsSubmittingQuick(false);
    }
  };

  //function "searchData"
  const searchData = async (e) => {
    setKeywords(e.target.value);
    fetchData(1, e.target.value);
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mb-4 mt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-5 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="Masukkan NIK Peserta"
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
                <div className="col-md-5 mb-2">
                  <div className="input-group">
                    <select
                      className="form-select"
                      value={selectTipeVerif}
                      onChange={handleselectTipeVerif}
                    >
                      <option value="">-- Pilih Tipe Verif --</option>
                      <option value="belum">Belum Verif</option>
                      <option value="lolos">Lolos</option>
                      <option value="tidak">Tidak</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 mb-2">
                  <div className="input-group">
                    <select
                      className="form-select"
                      value={selectStatusKetrima}
                      onChange={handleselectStatusKetrima}
                    >
                      <option value="">-- Semua Status --</option>
                      <option value="1">Diterima Beasiswa</option>
                      <option value="null">Tidak Diterima</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Nama</th>
                          <th className="border-0">NIK</th>
                          <th className="border-0">No KK</th>
                          <th className="border-0">Nohp</th>
                          <th className="border-0">Email</th>
                          <th className="border-0">Status Verif</th>
                          <th className="border-0">Status Beasiswa</th>
                          <th className="border-0">SPJMT</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      {isLoading ? (
                        <div class="position-center">
                          <div className="mt-5 position-absolute top-20 start-50 translate-middle mt-1 bi bi-caret-down-fill">
                            <LoadingTable />
                          </div>
                        </div>
                      ) : (
                        <>
                          <tbody>
                            {
                              //cek apakah data ada
                              nonAkademiks.length > 0 ? (
                                nonAkademiks.map((nonAkademik, idx) => (
                                  <tr
                                    className={`verif-${nonAkademik.user.jenis_verif === 'belum'
                                        ? "belum"
                                        : nonAkademik.user.jenis_verif
                                      }`}
                                    key={idx}
                                  >
                                    <td className="fw-bold text-center">
                                      {idx + 1 +
                                        (pagination.currentPage - 1) *
                                        pagination.perPage}
                                    </td>
                                    <td>{nonAkademik.user.name}</td>
                                    <td className="text-center">
                                      {nonAkademik.user.nik}
                                      <br />
                                      {nonAkademik.user.jenis_verif_nik ===
                                        "tidak" && (
                                          <p>
                                            <button className="btn btn-md btn-danger me-2">
                                              NIK Tidak Lolos verifikasi
                                            </button>
                                          </p>
                                        )}
                                      {nonAkademik.user.jenis_verif_nik ===
                                        null && (
                                          <p>
                                            <button className="btn btn-md btn-warning me-2">
                                              NIK Belum verifikasi
                                            </button>
                                          </p>
                                        )}
                                      {nonAkademik.user.jenis_verif_nik ===
                                        "lolos" && (
                                          <button className="btn btn-md btn-success me-2">
                                            NIK Lolos verifikasi
                                          </button>
                                        )}
                                    </td>
                                    <td>{nonAkademik.user.nokk}</td>
                                    <td>{nonAkademik.user.nohp}</td>
                                    <td>{nonAkademik.user.email}</td>
                                    <td>
                                      {nonAkademik.user.jenis_verif ===
                                        "tidak" && (
                                          <p>
                                            <button className="btn btn-md btn-danger me-2">
                                              Tidak Lolos verifikasi
                                            </button>
                                          </p>
                                        )}
                                      {nonAkademik.user.jenis_verif ===
                                        'belum' && (
                                          <p>
                                            <button className="btn btn-md btn-warning me-2">
                                              Belum verifikasi
                                            </button>
                                          </p>
                                        )}
                                      {nonAkademik.user.jenis_verif ===
                                        "lolos" && (
                                          <button className="btn btn-md btn-success me-2">
                                            Lolos verifikasi
                                          </button>
                                        )}
                                    </td>
                                    <td className="text-center">
                                      {(nonAkademik.user.status_ketrima === "1" || nonAkademik.user.status_ketrima === 1) ? (
                                        <span className="badge bg-success fs-6 px-3 py-2">
                                          <i className="fa fa-check-circle me-1"></i>
                                          Diterima Beasiswa
                                        </span>
                                      ) : (
                                        <span className="badge bg-secondary fs-6 px-3 py-2">
                                          <i className="fa fa-minus-circle me-1"></i>
                                          Belum Diterima
                                        </span>
                                      )}
                                    </td>
                                    <td className="text-center">
                                      {(nonAkademik.user.status_ketrima === "1" || nonAkademik.user.status_ketrima === 1) && (
                                        checkHasSpjmtFile(nonAkademik.user.imagespjmt) ? (
                                          <button
                                            onClick={() => handleViewSpjmt(nonAkademik)}
                                            className="btn btn-success btn-sm"
                                            title="Lihat SPJMT"
                                          >
                                            <i className="fa fa-file-pdf me-1"></i>
                                            SPJMT
                                          </button>
                                        ) : (
                                          <span className="badge bg-warning-subtle text-warning fs-6 px-3 py-2">
                                            <i className="fa fa-exclamation-triangle me-1"></i>
                                            Belum Upload SPJMT
                                          </span>
                                        )
                                      )}
                                    </td>
                                    <td className="text-center" style={{ minWidth: "160px" }}>
                                       <button
                                         onClick={() => handleOpenQuickAudit(idx)}
                                         className="btn btn-sm font-black border-2 border-slate-900 me-2"
                                         style={{
                                           backgroundColor: "#34d399",
                                           color: "#1e293b",
                                           border: "2px solid #1e293b",
                                           boxShadow: "2px 2px 0px #1e293b",
                                           borderRadius: "8px",
                                           fontWeight: 800
                                         }}
                                         title="Auditing Kilat Non-Stop"
                                       >
                                         <i className="fa fa-bolt me-1"></i> VERIF KILAT
                                       </button>
                                      <Link
                                        to={`/admin/editNonAkademik/${nonAkademik.id}`}
                                        className="btn btn-primary btn-sm"
                                      >
                                        <a>DETAIL</a>
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                //tampilkan pesan data belum tersedia
                                <tr>
                                  <td colSpan={10}>
                                    <div
                                      className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                      role="alert"
                                    >
                                      Data Belum Tersedia!.
                                    </div>
                                  </td>
                                </tr>
                              )
                            }
                          </tbody>
                        </>
                      )}
                    </table>
                  </div>
                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Preview SPJMT */}
      {showSpjmtModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
          tabIndex="-1"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseSpjmtModal();
            }
          }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              {/* Modal Header */}
              <div className="modal-header bg-success text-white border-0">
                <div className="d-flex align-items-center w-100">
                  <div
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-file-pdf text-success fs-5"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="modal-title fw-bold mb-0">
                      {spjmtName}
                    </h5>
                    <small className="text-white opacity-75">
                      Preview Dokumen SPJMT
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseSpjmtModal}
                  aria-label="Close"
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body p-0" style={{ minHeight: '75vh' }}>
                <iframe
                  src={spjmtUrl}
                  title={spjmtName}
                  className="w-100 h-100 border-0"
                  style={{ minHeight: '75vh' }}
                ></iframe>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-0 bg-light">
                <a
                  href={spjmtUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success"
                >
                  <i className="fas fa-external-link-alt me-2"></i>
                  Buka di Tab Baru
                </a>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCloseSpjmtModal}
                >
                  <i className="fas fa-times me-2"></i>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Quick Audit Non-Stop (3D Saweria Super Fast Verification) */}
      {showQuickModal && currentQuickItem && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(15, 23, 42, 0.85)", zIndex: 1060 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-fullscreen p-3">
            <div
              className="modal-content border-2 border-slate-900 shadow-2xl rounded-2xl overflow-hidden d-flex flex-column"
              style={{ background: "#f4fbf7", border: "2.5px solid #1e293b", height: "calc(100vh - 32px)" }}
            >
              {/* Modal Top Header Bar 3D */}
              <div
                className="modal-header border-b-2 border-slate-900 px-4 py-3"
                style={{ backgroundColor: "#34d399", borderBottom: "2.5px solid #1e293b" }}
              >
                <div className="d-flex align-items-center justify-content-between w-100">
                  {/* Left Title & Status */}
                  <div className="d-flex align-items-center gap-3">
                    <span
                      className="px-3 py-1 bg-white border border-dark font-black text-xs rounded-2 shadow-sm"
                      style={{ border: "2px solid #1e293b", fontFamily: "var(--font-family-code)" }}
                    >
                      PESERTA #{(pagination.currentPage - 1) * pagination.perPage + currentQuickIndex + 1} DARI {pagination.total} (Hal. {pagination.currentPage})
                    </span>
                    <div>
                      <h5 className="modal-title font-black text-slate-900 mb-0 d-flex align-items-center gap-2">
                        <span>{currentQuickItem.user?.name}</span>
                        <span className="text-xs bg-slate-900 text-white px-2 py-0.5 rounded font-mono">
                          NIK: {currentQuickItem.user?.nik}
                        </span>
                      </h5>
                      <div className="text-xs text-slate-800 font-bold mt-0.5">
                        <span>Sertifikat: <strong>{currentQuickItem.jenis_sertifikat || "Prestasi"} ({currentQuickItem.tingkat_sertifikat || "-"})</strong></span>
                        <span className="mx-2">•</span>
                        <span>Semester: <strong>{currentQuickItem.semester || "-"}</strong></span>
                        <span className="mx-2">•</span>
                        <span>PTN/PTS: <strong>{currentQuickItem.user?.nama_ptn_pts || "Kampus Terdaftar"}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right Navigation & Close */}
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-white border-dark fw-bold"
                      style={{ border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", background: "#ffffff" }}
                      disabled={currentQuickIndex === 0 && pagination.currentPage === 1}
                      onClick={handlePrevCandidate}
                    >
                      <i className="fa fa-arrow-left me-1"></i> Prev
                    </button>
                    <button
                      className="btn btn-sm btn-white border-dark fw-bold"
                      style={{ border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", background: "#ffffff" }}
                      disabled={(pagination.currentPage - 1) * pagination.perPage + currentQuickIndex + 1 >= pagination.total}
                      onClick={handleNextCandidate}
                    >
                      Next <i className="fa fa-arrow-right ms-1"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger border-dark fw-bold ms-2"
                      style={{ border: "2px solid #1e293b" }}
                      onClick={() => setShowQuickModal(false)}
                    >
                      <i className="fa fa-times me-1"></i> Tutup
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Body: Split Screen */}
              <div className="modal-body p-3 overflow-hidden flex-grow-1">
                <div className="row h-100 g-3">
                  {/* Left Column: Interactive PDF Viewer & Switcher Tabs */}
                  <div className="col-lg-8 d-flex flex-column h-100">
                    {/* Document Selector Tabs */}
                    <div className="d-flex align-items-center gap-2 mb-2 overflow-x-auto pb-1">
                      <button
                        className={`btn btn-sm font-bold border-2 ${
                          activeDocTab === "sertifikat" ? "btn-success text-slate-900" : "btn-light text-slate-700"
                        }`}
                        style={{ border: "2px solid #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}
                        onClick={() => setActiveDocTab("sertifikat")}
                      >
                        <i className="fa fa-award me-1"></i> Sertifikat Prestasi
                      </button>
                      <button
                        className={`btn btn-sm font-bold border-2 ${
                          activeDocTab === "ktp" ? "btn-success text-slate-900" : "btn-light text-slate-700"
                        }`}
                        style={{ border: "2px solid #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}
                        onClick={() => setActiveDocTab("ktp")}
                      >
                        <i className="fa fa-id-card me-1"></i> KTP
                      </button>
                      <button
                        className={`btn btn-sm font-bold border-2 ${
                          activeDocTab === "kk" ? "btn-success text-slate-900" : "btn-light text-slate-700"
                        }`}
                        style={{ border: "2px solid #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}
                        onClick={() => setActiveDocTab("kk")}
                      >
                        <i className="fa fa-users me-1"></i> KK
                      </button>
                      <button
                        className={`btn btn-sm font-bold border-2 ${
                          activeDocTab === "aktifkampus" ? "btn-success text-slate-900" : "btn-light text-slate-700"
                        }`}
                        style={{ border: "2px solid #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}
                        onClick={() => setActiveDocTab("aktifkampus")}
                      >
                        <i className="fa fa-building-columns me-1"></i> Aktif Kampus
                      </button>
                      <button
                        className={`btn btn-sm font-bold border-2 ${
                          activeDocTab === "suratpernyataan" ? "btn-success text-slate-900" : "btn-light text-slate-700"
                        }`}
                        style={{ border: "2px solid #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}
                        onClick={() => setActiveDocTab("suratpernyataan")}
                      >
                        <i className="fa fa-file-signature me-1"></i> Pernyataan
                      </button>
                      <button
                        className={`btn btn-sm font-bold border-2 ${
                          activeDocTab === "akrekampus" ? "btn-success text-slate-900" : "btn-light text-slate-700"
                        }`}
                        style={{ border: "2px solid #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}
                        onClick={() => setActiveDocTab("akrekampus")}
                      >
                        <i className="fa fa-certificate me-1"></i> Akreditasi Kampus
                      </button>
                      {checkHasSpjmtFile(currentQuickItem.user?.imagespjmt) && (
                        <button
                          className={`btn btn-sm font-bold border-2 ${
                            activeDocTab === "spjmt" ? "btn-success text-slate-900" : "btn-light text-slate-700"
                          }`}
                          style={{ border: "2px solid #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}
                          onClick={() => setActiveDocTab("spjmt")}
                        >
                          <i className="fa fa-file-pdf me-1"></i> SPJMT
                        </button>
                      )}
                    </div>

                    {/* PDF Viewer Frame */}
                    <div className="flex-grow-1 bg-slate-900 rounded-xl overflow-hidden position-relative" style={{ border: "2.5px solid #1e293b", height: "calc(100% - 40px)" }}>
                      {getDocUrl(activeDocTab) ? (
                        <iframe
                          src={getDocUrl(activeDocTab)}
                          title="Dokumen Pratinjau Audit Non Akademik"
                          className="w-100 h-100 border-0"
                        ></iframe>
                      ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center text-white h-100 py-5">
                          <i className="fa fa-exclamation-triangle fs-1 text-amber-400 mb-3"></i>
                          <h5>Berkas dokumen belum diunggah oleh pendaftar.</h5>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Fast Verification Panel */}
                  <div className="col-lg-4 d-flex flex-column h-100">
                    <div className="card h-100 border-2 border-slate-900 shadow-sm rounded-xl p-3 d-flex flex-column" style={{ background: "#ffffff", border: "2.5px solid #1e293b" }}>
                      <h6 className="font-black text-slate-900 border-b-2 pb-2 mb-3" style={{ borderBottom: "2px solid #1e293b" }}>
                        <i className="fa fa-gavel text-emerald-600 me-2"></i> Audit & Keputusan Non-Akademik
                      </h6>

                      {/* Current Status Indicator */}
                      <div className="mb-3">
                        <small className="text-slate-500 font-bold d-block mb-1">Status Verifikasi Saat Ini:</small>
                        {currentQuickItem.user?.jenis_verif === "lolos" ? (
                          <span className="badge bg-emerald-100 text-emerald-900 border border-emerald-500 px-3 py-2 fw-bold fs-6 rounded-2 w-100 d-block">
                            <i className="fa fa-check-circle me-1"></i> LOLOS VERIFIKASI
                          </span>
                        ) : currentQuickItem.user?.jenis_verif === "tidak" ? (
                          <span className="badge bg-rose-100 text-rose-900 border border-rose-500 px-3 py-2 fw-bold fs-6 rounded-2 w-100 d-block">
                            <i className="fa fa-times-circle me-1"></i> TIDAK LOLOS VERIFIKASI
                          </span>
                        ) : (
                          <span className="badge bg-amber-100 text-amber-900 border border-amber-500 px-3 py-2 fw-bold fs-6 rounded-2 w-100 d-block">
                            <i className="fa fa-clock me-1"></i> BELUM DIVERIFIKASI
                          </span>
                        )}
                      </div>

                      {/* Quick Reason Templates */}
                      <div className="mb-3">
                        <small className="text-slate-600 font-bold d-block mb-2">Template Alasan Cepat:</small>
                        <div className="d-flex flex-wrap gap-1">
                          <button
                            type="button"
                            className="btn btn-xs btn-outline-success font-bold text-xs"
                            onClick={() => setQuickAlasan("Sertifikat kejuaraan/prestasi sah dan sesuai kriteria")}
                          >
                            + Sertifikat Sah & Lolos
                          </button>
                          <button
                            type="button"
                            className="btn btn-xs btn-outline-danger font-bold text-xs"
                            onClick={() => setQuickAlasan("Tingkat kejuaraan/prestasi tidak memenuhi syarat minimal")}
                          >
                            + Tingkat Tidak Sesuai
                          </button>
                          <button
                            type="button"
                            className="btn btn-xs btn-outline-danger font-bold text-xs"
                            onClick={() => setQuickAlasan("File sertifikat buram / tidak dapat diverifikasi keabsahannya")}
                          >
                            + Sertifikat Buram
                          </button>
                        </div>
                      </div>

                      {/* Alasan Input Field */}
                      <div className="mb-3 flex-grow-1">
                        <label className="form-label font-bold text-slate-800 text-xs">
                          Alasan / Catatan Verifikator:
                        </label>
                        <textarea
                          rows="4"
                          className="form-control font-medium text-sm border-2 border-slate-900"
                          style={{ border: "2px solid #1e293b", borderRadius: "10px" }}
                          placeholder="Masukkan alasan verifikasi..."
                          value={quickAlasan}
                          onChange={(e) => setQuickAlasan(e.target.value)}
                        ></textarea>
                      </div>

                      {/* Big 3D Action Buttons */}
                      <div className="d-grid gap-2 mt-auto">
                        <button
                          type="button"
                          className="btn btn-success btn-lg font-black border-2 border-slate-900 py-3 text-slate-900 d-flex align-items-center justify-content-center gap-2"
                          style={{
                            backgroundColor: "#34d399",
                            border: "2.5px solid #1e293b",
                            boxShadow: "3px 3px 0px #1e293b",
                            borderRadius: "12px",
                          }}
                          disabled={isSubmittingQuick}
                          onClick={() => handleQuickSubmit("lolos")}
                        >
                          <i className="fa fa-circle-check fs-5"></i>
                          <span>{isSubmittingQuick ? "MENYIMPAN..." : "VERIFIKASI LOLOS (NEXT ▶)"}</span>
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-lg font-black border-2 border-slate-900 py-3 text-white d-flex align-items-center justify-content-center gap-2"
                          style={{
                            backgroundColor: "#ef4444",
                            border: "2.5px solid #1e293b",
                            boxShadow: "3px 3px 0px #1e293b",
                            borderRadius: "12px",
                          }}
                          disabled={isSubmittingQuick}
                          onClick={() => handleQuickSubmit("tidak")}
                        >
                          <i className="fa fa-circle-xmark fs-5"></i>
                          <span>TIDAK LOLOS (NEXT ▶)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
}
