//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import { Link } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";
//import pagination component
import Pagination from "../../../components/general/Pagination";
import LoadingTable from "../../../components/general/LoadingTable";
import toast from "react-hot-toast";

export default function AdminAkademik() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  //token from cookies
  const token = Cookies.get("token");

  //define state "products"
  const [akademiks, setAkademiks] = useState([]);

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

  // State untuk modal preview SPJMT
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

  const fetchData = async (pageNumber = 1, keywords = "") => {
    setLoading(true);
    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(
      `/api/admin/beasiswa/akademiks?search=${keywords}&page=${page}&jenis_verif=${selectTipeVerif}&status_ketrima=${selectStatusKetrima}`,
      {
        //header
        headers: {
          //header Bearer + Token
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      //set data response to state "setProducts"
      setAkademiks(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
      //loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
    const handleBeforeUnload = (event) => {
      // Perform any necessary cleanup or actions here
      // This code should not explicitly disable caching

      // Optionally, you can provide a confirmation message
      event.returnValue = "Are you sure you want to leave this page?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectTipeVerif, selectStatusKetrima]);

  //function "searchData"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(1, e.target.value);
  };

  // Helper: cek apakah user punya file SPJMT yang valid (pola sama dengan VerifYatim/Index.jsx)
  const checkHasSpjmtFile = (imagespjmt) => {
    if (!imagespjmt) return false;
    // Valid jika path berakhir dengan ekstensi file, atau tidak berakhir hanya dengan base path folder
    return (
      imagespjmt.match(/\.(pdf|jpg|jpeg|png|gif)$/i) ||
      (!imagespjmt.endsWith('/dokumen/akademik') &&
        !imagespjmt.endsWith('/storage/imagespjmt') &&
        !imagespjmt.endsWith('/storage/imagespjmt/'))
    );
  };

  // Function untuk membuka modal SPJMT
  const handleViewSpjmt = (akademik) => {
    const imagespjmt = akademik?.user?.imagespjmt;
    if (!checkHasSpjmtFile(imagespjmt)) {
      toast.error('File SPJMT belum diupload');
      return;
    }

    // Tambahkan base URL jika path tidak lengkap
    let fileUrl = imagespjmt;
    if (!fileUrl.startsWith('http')) {
      // Jika path relative, tambahkan base URL API
      fileUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${fileUrl}`;
    }

    setSpjmtUrl(fileUrl);
    setSpjmtName(`SPJMT - ${akademik.user.name}`);
    setShowSpjmtModal(true);
  };

  // Function untuk menutup modal
  const handleCloseSpjmtModal = () => {
    setShowSpjmtModal(false);
    setSpjmtUrl("");
    setSpjmtName("");
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mb-4 mt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4 col-12 mb-2">
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
                <div className="col-md-4 mb-2">
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
                <div className="col-md-4 mb-2">
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
                              akademiks.length > 0 ? (
                                akademiks.map((akademik, index) => (
                                  <tr
                                    className={`verif-${akademik.user.jenis_verif === "belum"
                                        ? "belum"
                                        : akademik.user.jenis_verif
                                      }`}
                                    key={index}
                                  >
                                    <td className="fw-bold text-center">
                                      {++index +
                                        (pagination.currentPage - 1) *
                                        pagination.perPage}
                                    </td>
                                    <td>{akademik.user.name}</td>
                                    <td className="text-center">
                                      {akademik.user.nik}
                                      <br />
                                      {akademik.user.jenis_verif_nik ===
                                        "tidak" && (
                                          <p>
                                            <button className="btn btn-md btn-danger me-2">
                                              NIK Tidak Lolos verifikasi
                                            </button>
                                          </p>
                                        )}
                                      {akademik.user.jenis_verif_nik ===
                                        null && (
                                          <p>
                                            <button className="btn btn-md btn-warning me-2">
                                              NIK Belum verifikasi
                                            </button>
                                          </p>
                                        )}
                                      {akademik.user.jenis_verif_nik ===
                                        "lolos" && (
                                          <button className="btn btn-md btn-success me-2">
                                            NIK Lolos verifikasi
                                          </button>
                                        )}
                                    </td>
                                    <td>{akademik.user.nokk}</td>
                                    <td>{akademik.user.nohp}</td>
                                    <td>{akademik.user.email}</td>
                                    <td>
                                      {akademik.user.jenis_verif ===
                                        "tidak" && (
                                          <p>
                                            <button className="btn btn-md btn-danger me-2">
                                              Tidak Lolos verifikasi
                                            </button>
                                          </p>
                                        )}
                                      {akademik.user.jenis_verif ===
                                        "belum" && (
                                          <p>
                                            <button className="btn btn-md btn-warning me-2">
                                              Belum verifikasi
                                            </button>
                                          </p>
                                        )}
                                      {akademik.user.jenis_verif ===
                                        "lolos" && (
                                          <button className="btn btn-md btn-success me-2">
                                            Lolos verifikasi
                                          </button>
                                        )}
                                    </td>
                                    <td className="text-center">
                                      {(akademik.user.status_ketrima === "1" || akademik.user.status_ketrima === 1) ? (
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
                                      {(akademik.user.status_ketrima === "1" || akademik.user.status_ketrima === 1) && (
                                        checkHasSpjmtFile(akademik.user.imagespjmt) ? (
                                          <button
                                            onClick={() => handleViewSpjmt(akademik)}
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
                                    <td className="text-center">
                                      <Link
                                        to={`/admin/editAkademik/${akademik.id}`}
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
    </LayoutAdmin>
  );
}
