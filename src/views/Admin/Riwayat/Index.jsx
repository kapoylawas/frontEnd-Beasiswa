//import layout
import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
// import ModalFinish from "../../../components/general/ModalFinish"; // Disabled
import toast from "react-hot-toast";
import Loading from "../../../components/general/Loading";
import Kesra from "../../../components/admin/KesraA";
import KesraB from "../../../components/admin/KesraB";
import KesraC from "../../../components/admin/KesraC";
import KesraD from "../../../components/admin/KesraD";
import axios from 'axios';


export default function RiwayatIndex() {
  document.title = "Dashboard - Riwayat Pendaftar Beasiswa";

  const [tipebeasiswa, setTipebeasiswa] = useState("");
  const [dataAkademik, setDataAkademik] = useState("");
  const [dataNonAkademik, setDataNonAkademik] = useState("");
  const [dataLuarNegeri, setDataLuarNegeri] = useState("");
  const [dataDinsos, setDataDinsos] = useState("");
  const [dataKesra, setDataKesra] = useState({
    imagesertifikat: "",
    nama_organisasi: "",
    alamat_organisasi: "",
    nama_ponpes: "",
    alamat_ponpes: "",
  });
  const [idUser, setIdUser] = useState("");
  const [statusFinish, setStatusFinish] = useState("");
  // const [cekNik, setCekNik] = useState("");

  // variabel untuk mengambil data di kesra
  const dataTipeKesra = dataKesra.kesra;

  const [tipePendaftarDinsos, setTipePendaftarDinsos] = useState("");

  //navigata
  const navigate = useNavigate();

  //token from cookies
  const token = Cookies.get("token");

  const [isChecked, setIsChecked] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [uploadingSpjmt, setUploadingSpjmt] = useState(false);
  const [spjmtFile, setSpjmtFile] = useState(null);
  const [spjmtError, setSpjmtError] = useState("");
  const [showSpjmtModal, setShowSpjmtModal] = useState(false);
  const [showSpjmtPreviewModal, setShowSpjmtPreviewModal] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Handler untuk upload SPJMT
  const handleSpjmtChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSpjmtError("File terlalu besar. Maksimal 5MB");
        setSpjmtFile(null);
        e.target.value = "";
        return;
      }
      
      // Validasi file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setSpjmtError("Format file tidak valid. Gunakan PDF, JPG, atau PNG");
        setSpjmtFile(null);
        e.target.value = "";
        return;
      }
      
      setSpjmtFile(file);
      setSpjmtError("");
    }
  };

  const handleUploadSpjmt = async () => {
    if (!spjmtFile) {
      toast.error("Pilih file terlebih dahulu");
      return;
    }

    setUploadingSpjmt(true);
    setSpjmtError("");

    try {
      const formData = new FormData();
      formData.append('imagespjmt', spjmtFile);

      const response = await Api.post(`/api/admin/beasiswa/users/${idUser}/upload-spjmt`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const successMessage = response.data.message || "File SPJMT berhasil diupload";

        // STEP 1: Tutup modal SINKRON dan bersihkan state upload
        // Ini harus dilakukan sebelum refetch untuk menghindari
        // race condition antara unmount modal dan re-render data
        setShowSpjmtModal(false);
        setSpjmtFile(null);
        setUploadingSpjmt(false);

        // STEP 2: Delay 300ms agar React commit DOM removal modal dulu
        // sebelum melakukan refetch + re-render yang besar
        setTimeout(async () => {
          try {
            const refetchResponse = await Api.get("/api/admin/users/byid", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            // Batch semua update state dalam satu tick
            const newData = refetchResponse.data.data;
            setDataAkademik(newData);
            setDataNonAkademik(newData);
            setDataLuarNegeri(newData);
            setDataDinsos(newData);
            setDataKesra(newData);

            // STEP 3: Tampilkan toast SETELAH refetch selesai
            // agar tidak bentrok dengan DOM mutation
            setTimeout(() => {
              toast.success(successMessage);
            }, 100);
          } catch (refetchError) {
            console.error("Error refetching data:", refetchError);
            toast.success(successMessage);
          }
        }, 300);
        return;
      }
    } catch (error) {
      console.error("Error uploading SPJMT:", error);
      setSpjmtError(error.response?.data?.message || "Gagal mengupload file");
      toast.error(error.response?.data?.message || "Gagal mengupload file");
    }
    setUploadingSpjmt(false);
  };

  const handleOpenSpjmtModal = () => {
    setShowSpjmtModal(true);
    setSpjmtError("");
    setSpjmtFile(null);
  };

  const handleCloseSpjmtModal = () => {
    setShowSpjmtModal(false);
    setSpjmtFile(null);
    setSpjmtError("");
  };

  const handleOpenSpjmtPreview = () => {
    setShowSpjmtPreviewModal(true);
  };

  const handleCloseSpjmtPreview = () => {
    setShowSpjmtPreviewModal(false);
  };

  let jenisBeasiswa;

  switch (tipebeasiswa) {
    case 1:
      jenisBeasiswa = "Akademik";
      break;
    case 2:
      jenisBeasiswa = "Non Akademik";
      break;
    case 3:
      jenisBeasiswa = "Kesra";
      break;
    case 4:
      jenisBeasiswa = "Dinsos";
      break;
    case 5:
      jenisBeasiswa = "Luar Negeri";
      break;
    default:
      jenisBeasiswa = "Anda Belum Memilih Tipe Beasiswa";
  }

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
      setTipebeasiswa(response.data.data.tipe_beasiswa);
      setDataAkademik(response.data.data);
      setDataNonAkademik(response.data.data);
      setDataLuarNegeri(response.data.data);
      setDataDinsos(response.data.data);
      setDataKesra(response.data.data);
      setTipePendaftarDinsos(response.data.data);
      setIdUser(response.data.data.id);
      setStatusFinish(response.data.data.status_finish);
      setLoading(false);
      
      // Buka modal SPJMT otomatis setelah data dimuat
      setTimeout(() => {
        setShowSpjmtModal(true);
      }, 500);
    });
  }, []);



  const handleClick = () => {
    // Mengubah status dan merubahnya menjadi 1 saat tombol diklik
    setStatusFinish(1);
  };

  // const handleButtonClick = async () => {

  //   const postData = {
  //     USER_ID: "290220241042163515522230800018550",
  //     PASSWORD: "gT8!jiPQ",
  //     IP_USER: "10.35.15.152",
  //     TRESHOLD: "1",
  //     NIK: "3515082306920001",
  //     NAMA_LGKP: "ARIEF SANGGA UTAMA"
  //   };

  //   try {
  //     const response = await axios.post("https://172.16.160.177:8000/dukcapil/get_json/351552223080001/CALL_VERIFY_BY_ELEMEN", postData, {
  //       // Header
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     });

  //     navigate("/admin/riwayat");
  //     // Handle success scenario, e.g., set a success message in state if needed
  //     // setSuccessMessage(response.data.message);

  //   } catch (error) {
  //     console.log(error);

  //     // Handle error scenario, e.g., set an error message in state if needed
  //     // setErrorMessage("Lengkapi Data Anda!!");
  //   } finally {
  //     setLoading(false); // Ensure loading is set to false when done
  //   }
  // };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          {/* SPJMT Upload Section - Di Paling Atas */}
          {idUser && (
            <>
              <div className="row mt-1 mb-4">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header bg-success text-white">
                      <h5 className="mb-0"><i className="fa fa-upload me-2"></i>Upload Surat SPJMT</h5>
                    </div>
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <div className="d-flex align-items-center">
                            <i className="fa fa-info-circle fa-2x text-primary me-3"></i>
                            <div>
                              <h6 className="mb-1">Upload Surat SPJMT Anda</h6>
                              <p className="text-muted mb-2 small">
                                Klik tombol di bawah untuk upload atau lihat file SPJMT
                              </p>
                              <a
                                href="/spjmt_mahasiswa.docx"
                                download="spjmt_mahasiswa.docx"
                                className="btn btn-outline-success btn-sm fw-bold"
                              >
                                <i className="fa fa-download me-2"></i>
                                Download Contoh SPJMT (.docx)
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 text-end">
                          <button
                            className="btn btn-success me-2"
                            onClick={handleOpenSpjmtModal}
                          >
                            <i className="fa fa-upload me-2"></i>
                            Upload SPJMT
                          </button>
                          {dataAkademik.imagespjmt || dataNonAkademik.imagespjmt || dataKesra.imagespjmt || dataDinsos.imagespjmt || dataLuarNegeri.imagespjmt ? (
                            <button
                              className="btn btn-primary"
                              onClick={handleOpenSpjmtPreview}
                            >
                              <i className="fa fa-eye me-2"></i>
                              Lihat File
                            </button>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              <i className="fa fa-exclamation-triangle me-1"></i>
                              Belum Upload
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="alert alert-danger" role="alert">
            <p>Tipe Beasiswa: {jenisBeasiswa}</p>
          </div>
          {tipebeasiswa === 1 ? (
            <>
              {/* <ModalFinish /> */}
              {(dataAkademik.status_ketrima === "1" || dataAkademik.status_ketrima === 1) && (
                <div className="alert alert-success d-flex align-items-center shadow-sm border-0 rounded" role="alert" style={{ backgroundColor: '#28a745', color: '#fff' }}>
                  <i className="fa fa-trophy fa-2x me-3"></i>
                  <div>
                    <h5 className="mb-1 fw-bold">🎉 Selamat Anda Diterima Beasiswa!</h5>
                    <p className="mb-0">Selamat, Anda telah dinyatakan <strong>DITERIMA</strong> sebagai penerima Beasiswa Akademik.</p>
                  </div>
                </div>
              )}
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Bioadata Mahasiswa Regis
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped text-dark">
                          <tbody>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Nama Lengkap
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.name}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                NIK
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.nik}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                No KK
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.nokk}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Email
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.email}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Nim
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.nim}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Universitas
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.universitas}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Terdaftar
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    Beasiswa {dataAkademik.akademik.name}
                                    <br />
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to="/admin/editBeasiswaAkademik"
                                        className="btn btn-md btn-primary me-2"
                                      >
                                        Edit Data
                                      </Link>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataAkademik.akademik.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Edit Bioadata
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to="/admin/biodata"
                                        className="btn btn-md btn-primary me-2"
                                      >
                                        Edit Data
                                      </Link>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataAkademik.akademik.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Verifikasi User
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                      />
                                      {""} Saya Yakin Bahwa Data Yang Saya isi
                                      Sudah Benar
                                    </label>
                                    <br />
                                    <div className="d-flex justify-content-center">
                                      <button
                                        type="submit"
                                        className="btn btn-md btn-primary me-2"
                                        disabled={!isChecked}
                                        onClick={handleClick}
                                      >
                                        {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                                      </button>
                                    </div>

                                    {/* <div>
                                      <button onClick={handleButtonClick} >
                                        Cek Data
                                      </button>

                                    </div> */}
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataAkademik.akademik.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Document Terupload
                    </div>
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">File KTP</div>
                            <iframe
                              src={dataAkademik.imagektp}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Kartu Keluarga
                            </div>
                            <iframe
                              src={dataAkademik.imagekk}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">File Akredetasi</div>
                            <iframe
                              src={dataAkademik.imageakrekampus}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Surat Aktif Kampus
                            </div>
                            <iframe
                              src={dataAkademik.imageaktifkampus}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Document Terupload
                    </div>
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Scren Shot Akredetasi Dari Web BANPT
                            </div>
                            <iframe
                              src={dataAkademik.akademik.imagebanpt}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">File Transkip</div>
                            <iframe
                              src={dataAkademik.akademik.imagetranskrip}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {tipebeasiswa === 2 ? (
            <>
              {/* <ModalFinish /> */}
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Bioadata Mahasiswa Regis
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped text-dark">
                          <tbody>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Nama Lengkap
                              </td>
                              <td className="fw-bold text-center">
                                {dataNonAkademik.name}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                NIK
                              </td>
                              <td className="fw-bold text-center">
                                {dataNonAkademik.nik}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                No KK
                              </td>
                              <td className="fw-bold text-center">
                                {dataNonAkademik.nokk}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Email
                              </td>
                              <td className="fw-bold text-center">
                                {dataNonAkademik.email}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Nim
                              </td>
                              <td className="fw-bold text-center">
                                {dataNonAkademik.nim}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Universitas
                              </td>
                              <td className="fw-bold text-center">
                                {dataNonAkademik.universitas}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Terdaftar
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    Beasiswa {dataNonAkademik.nonakademik.name}
                                    <br />
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to="/admin/editBeasiswaNonkademik"
                                        className="btn btn-md btn-primary me-2"
                                      >
                                        Edit Data
                                      </Link>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataNonAkademik.nonakademik.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold text-center">
                                Edit Bioadata
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to="/admin/biodata"
                                        className="btn btn-md btn-primary me-2"
                                      >
                                        Edit Data
                                      </Link>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataNonAkademik.nonakademik.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Verifikasi User
                              </td>

                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                      />
                                      {""} Saya Yakin Bahwa Data Yang Saya isi
                                      Sudah Benar
                                    </label>
                                    <br />
                                    <div className="d-flex justify-content-center">
                                      <button
                                        type="submit"
                                        className="btn btn-md btn-primary me-2"
                                        disabled={!isChecked}
                                        onClick={handleClick}
                                      >
                                        {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataNonAkademik.nonakademik.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Document Terupload
                    </div>
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">File Akredetasi</div>
                            <iframe
                              src={dataNonAkademik.imageakrekampus}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Surat Aktif Kampus
                            </div>
                            <iframe
                              src={dataNonAkademik.imageaktifkampus}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center mt-3">
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Kartu Keluarga
                            </div>
                            <iframe
                              src={dataNonAkademik.imagekk}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Kartu Tanda Penduduk
                            </div>
                            <iframe
                              src={dataNonAkademik.imagektp}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Document Terupload
                    </div>
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-md-12">
                          <div className="card rounded">
                            <div className="text-center">File Akredetasi</div>
                            <iframe
                              src={dataNonAkademik.nonakademik.imagesertifikat}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {tipebeasiswa === 3 ? (
            <>
              {/* <ModalFinish /> */}
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Bioadata Mahasiswa Regis
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped text-dark">
                          <tbody>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Nama Lengkap
                              </td>
                              <td className="fw-bold text-center">
                                {dataKesra.name}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                NIK
                              </td>
                              <td className="fw-bold text-center">
                                {dataKesra.nik}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                No KK
                              </td>
                              <td className="fw-bold text-center">
                                {dataKesra.nokk}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Email
                              </td>
                              <td className="fw-bold text-center">
                                {dataKesra.email}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Nim
                              </td>
                              <td className="fw-bold text-center">
                                {dataKesra.nim}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Universitas
                              </td>
                              <td className="fw-bold text-center">
                                {dataKesra.universitas}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Terdaftar
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    Beasiswa {dataKesra.kesra.name}
                                    <br />
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to="/admin/EditBeasiswaKesra"
                                        className="btn btn-md btn-primary me-2"
                                      >
                                        Edit Data
                                      </Link>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataKesra.kesra.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold text-center">
                                Edit Bioadata
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to="/admin/biodata"
                                        className="btn btn-md btn-primary me-2"
                                      >
                                        Edit Data
                                      </Link>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataKesra.kesra.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Verifikasi User
                              </td>

                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                      />
                                      {""} Saya Yakin Bahwa Data Yang Saya isi
                                      Sudah Benar
                                    </label>
                                    <br />
                                    <div className="d-flex justify-content-center">
                                      <button
                                        type="submit"
                                        className="btn btn-md btn-primary me-2"
                                        disabled={!isChecked}
                                        onClick={handleClick}
                                      >
                                        {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataKesra.kesra.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Document Terupload
                    </div>
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">File Akredetasi</div>
                            <iframe
                              src={dataKesra.imageakrekampus}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Surat Aktif Kampus
                            </div>
                            <iframe
                              src={dataKesra.imageaktifkampus}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center mt-3">
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Kartu Keluarga
                            </div>
                            <iframe
                              src={dataKesra.imagekk}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Kartu Tanda Penduduk
                            </div>
                            <iframe
                              src={dataKesra.imagektp}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              {dataTipeKesra.tipe_kesra === 1 ? (
                <>
                  <p>tipe form A</p>
                  <Kesra imagesertifikat={dataKesra.kesra.imagesertifikat} />
                </>
              ) : null}
              {dataTipeKesra.tipe_kesra === 2 ? (
                <>
                  <p>tipe form B</p>
                  <KesraB imagesertifikat={dataKesra.kesra.imagesertifikat} />
                </>
              ) : null}
              {dataTipeKesra.tipe_kesra === 3 ? (
                <>
                  <p>tipe form C</p>
                  <KesraC
                    imagesertifikat={dataKesra.kesra.imagesertifikat}
                    nama_organisasi={dataKesra.kesra.nama_organisasi}
                    alamat_organisasi={dataKesra.kesra.alamat_organisasi}
                  />
                </>
              ) : null}
              {dataTipeKesra.tipe_kesra === 4 ? (
                <>
                  <p>tipe form D</p>
                  <KesraD
                    imagesertifikat={dataKesra.kesra.imagesertifikat}
                    nama_ponpes={dataKesra.kesra.nama_ponpes}
                    alamat_ponpes={dataKesra.kesra.alamat_ponpes}
                  />
                </>
              ) : null}
            </>
          ) : null}
          {tipebeasiswa === 4 ? (
            <>
              {/* <ModalFinish /> */}
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Bioadata Mahasiswa Regis
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped text-dark">
                          <tbody>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Nama Lengkap
                              </td>
                              <td className="fw-bold text-center">
                                {dataDinsos.name}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                NIK
                              </td>
                              <td className="fw-bold text-center">
                                {dataDinsos.nik}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                No KK
                              </td>
                              <td className="fw-bold text-center">
                                {dataDinsos.nokk}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Email
                              </td>
                              <td className="fw-bold text-center">
                                {dataDinsos.email}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Nim
                              </td>
                              <td className="fw-bold text-center">
                                {dataDinsos.nim}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Universitas
                              </td>
                              <td className="fw-bold text-center">
                                {dataDinsos.universitas}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Terdaftar
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    Beasiswa {dataDinsos.dinsos.name}
                                    <br />
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to="/admin/EditBeasiswaDinsos"
                                        className="btn btn-md btn-primary me-2"
                                      >
                                        Edit Data
                                      </Link>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataDinsos.dinsos.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold text-center">
                                Edit Bioadata
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to="/admin/biodata"
                                        className="btn btn-md btn-primary me-2"
                                      >
                                        Edit Data
                                      </Link>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataDinsos.dinsos.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Verifikasi User
                              </td>

                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                      />
                                      {""} Saya Yakin Bahwa Data Yang Saya isi
                                      Sudah Benar
                                    </label>
                                    <br />
                                    <div className="d-flex justify-content-center">
                                      <button
                                        type="submit"
                                        className="btn btn-md btn-primary me-2"
                                        disabled={!isChecked}
                                        onClick={handleClick}
                                      >
                                        {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataDinsos.dinsos.name}
                                  </button>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header text-dark">
                      Document Terupload
                    </div>
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">File Akredetasi</div>
                            <iframe
                              src={dataDinsos.imageakrekampus}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Surat Aktif Kampus
                            </div>
                            <iframe
                              src={dataDinsos.imageaktifkampus}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center mt-3">
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Kartu Keluarga
                            </div>
                            <iframe
                              src={dataDinsos.imagekk}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Kartu Tanda Penduduk
                            </div>
                            <iframe
                              src={dataDinsos.imagektp}
                              title="Embedded Content"
                              className="embed-responsive-item"
                              height="400"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                      <hr />
                      {tipePendaftarDinsos.dinsos.tipe_daftar === 1 ? null : (
                        <div className="row mt-1">
                          <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                              <div className="card-header text-dark">
                                Document Terupload
                              </div>
                              <div className="card-body">
                                <div className="row justify-content-center">
                                  <div className="col-md-12">
                                    <div className="card rounded">
                                      <div className="text-center">
                                        File SKTM
                                      </div>
                                      <iframe
                                        src={dataDinsos.dinsos.imagesktm}
                                        title="Embedded Content"
                                        className="embed-responsive-item"
                                        height="400"
                                        allowFullScreen
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {tipebeasiswa === 5 ? (
            isLoading ? (
              <Loading />
            ) : (
              <>
                {/* <ModalFinish /> */}
                <div className="row mt-1">
                  <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm border-top-success">
                      <div className="card-header text-dark">
                        Bioadata Mahasiswa Regis
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-bordered table-striped text-dark">
                            <tbody>
                              <tr>
                                <td
                                  style={{ width: "15%" }}
                                  className="fw-bold text-center"
                                >
                                  Nama Lengkap
                                </td>
                                <td className="fw-bold text-center">
                                  {dataLuarNegeri.name}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ width: "15%" }}
                                  className="fw-bold text-center"
                                >
                                  NIK
                                </td>
                                <td className="fw-bold text-center">
                                  {dataLuarNegeri.nik}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ width: "15%" }}
                                  className="fw-bold text-center"
                                >
                                  No KK
                                </td>
                                <td className="fw-bold text-center">
                                  {dataLuarNegeri.nokk}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ width: "15%" }}
                                  className="fw-bold text-center"
                                >
                                  Email
                                </td>
                                <td className="fw-bold text-center">
                                  {dataLuarNegeri.email}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ width: "15%" }}
                                  className="fw-bold text-center"
                                >
                                  Nim
                                </td>
                                <td className="fw-bold text-center">
                                  {dataLuarNegeri.nim}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ width: "15%" }}
                                  className="fw-bold text-center"
                                >
                                  Universitas
                                </td>
                                <td className="fw-bold text-center">
                                  {dataLuarNegeri.universitas}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ width: "15%" }}
                                  className="fw-bold text-center"
                                >
                                  Terdaftar
                                </td>
                                <td className="fw-bold text-center">
                                  {statusFinish === 0 ? (
                                    <>
                                      Beasiswa {dataLuarNegeri.luar_negeri.name}{" "}
                                      negeri
                                      <br />
                                      <div className="d-flex justify-content-center">
                                        <Link
                                          to="/admin/EditBeasiswaLuarNegeri"
                                          className="btn btn-md btn-primary me-2"
                                        >
                                          Edit Data
                                        </Link>
                                      </div>
                                    </>
                                  ) : (
                                    <button
                                      className="btn btn-md btn-danger me-2"
                                      disabled
                                    >
                                      Anda Sudah Terdaftar Di Beasiswa{" "}
                                      {dataLuarNegeri.luar_negeri.name}
                                    </button>
                                  )}
                                </td>
                              </tr>
                              <td className="fw-bold text-center">
                                Edit Bioadata
                              </td>
                              <td className="fw-bold text-center">
                                {statusFinish === 0 ? (
                                  <>
                                    <div className="d-flex justify-content-center">
                                      <Link
                                        to="/admin/biodata"
                                        className="btn btn-md btn-primary me-2"
                                      >
                                        Edit Data
                                      </Link>
                                    </div>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-md btn-danger me-2"
                                    disabled
                                  >
                                    Anda Sudah Terdaftar Di Beasiswa{" "}
                                    {dataLuarNegeri.luar_negeri.name}
                                  </button>
                                )}
                              </td>
                              <tr>
                                <td
                                  style={{ width: "15%" }}
                                  className="fw-bold text-center"
                                >
                                  Verifikasi User
                                </td>

                                <td className="fw-bold text-center">
                                  {statusFinish === 0 ? (
                                    <>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={handleCheckboxChange}
                                        />
                                        {""} Saya Yakin Bahwa Data Yang Saya isi
                                        Sudah Benar
                                      </label>
                                      <br />
                                      <div className="d-flex justify-content-center">
                                        <button
                                          type="submit"
                                          className="btn btn-md btn-primary me-2"
                                          disabled={!isChecked}
                                          onClick={handleClick}
                                        >
                                          {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <button
                                      className="btn btn-md btn-danger me-2"
                                      disabled
                                    >
                                      Anda Sudah Terdaftar Di Beasiswa{" "}
                                      {dataLuarNegeri.luar_negeri.name}
                                    </button>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row mt-1">
                  <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm border-top-success">
                      <div className="card-header text-dark">
                        Document Terupload
                      </div>
                      <div className="card-body">
                        <div className="row justify-content-center">
                          <div className="col-md-6">
                            <div className="card rounded">
                              <div className="text-center">File Akredetasi</div>
                              <iframe
                                src={dataLuarNegeri.imageakrekampus}
                                title="Embedded Content"
                                className="embed-responsive-item"
                                height="400"
                                allowFullScreen
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="card rounded">
                              <div className="text-center">
                                File Surat Aktif Kampus
                              </div>
                              <iframe
                                src={dataLuarNegeri.imageaktifkampus}
                                title="Embedded Content"
                                className="embed-responsive-item"
                                height="400"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                          <div className="col-md-6">
                            <div className="card rounded">
                              <div className="text-center">
                                File Kartu Keluarga
                              </div>
                              <iframe
                                src={dataLuarNegeri.imagekk}
                                title="Embedded Content"
                                className="embed-responsive-item"
                                height="400"
                                allowFullScreen
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="card rounded">
                              <div className="text-center">
                                File Kartu Tanda Penduduk
                              </div>
                              <iframe
                                src={dataLuarNegeri.imagektp}
                                title="Embedded Content"
                                className="embed-responsive-item"
                                height="400"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row mt-1">
                  <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm border-top-success">
                      <div className="card-header text-dark">
                        Document Terupload
                      </div>
                      <div className="card-body">
                        <div className="row justify-content-center">
                          <div className="col-md-6">
                            <div className="card rounded">
                              <div className="text-center">
                                File Transkip nilai IPK ? GPA pada semester
                                terakhir yang sudah dijalani
                              </div>
                              <iframe
                                src={dataLuarNegeri.luar_negeri.imageipk}
                                title="Embedded Content"
                                className="embed-responsive-item"
                                height="400"
                                allowFullScreen
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="card rounded">
                              <div className="text-center">
                                File Perguruan Tinggi yang diakui oleh
                                Kementerian Pendidikan, Kebudayaan, Riset dan
                                Teknologi
                              </div>
                              <iframe
                                src={dataLuarNegeri.luar_negeri.imagetranskrip}
                                title="Embedded Content"
                                className="embed-responsive-item"
                                height="400"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          ) : null}
        </div>
      </main>

      {/* Modal Upload SPJMT */}
      {showSpjmtModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="fa fa-upload me-2"></i>Upload Surat SPJMT
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={handleCloseSpjmtModal}
                ></button>
              </div>
              <div className="modal-body">
                {/* Warning Alert */}
                <div className="alert alert-warning">
                  <div className="d-flex align-items-start">
                    <i className="fa fa-exclamation-triangle fa-2x me-3"></i>
                    <div>
                      <h6 className="alert-heading mb-1">Perhatian!</h6>
                      <p className="mb-2">
                        Pastikan file yang Anda upload adalah <strong>Surat SPJMT</strong> yang benar.
                      </p>
                      <ul className="mb-0 small">
                        <li>Format file: PDF, JPG, atau PNG</li>
                        <li>Ukuran maksimal: 5MB</li>
                        <li>Pastikan dokumen jelas dan terbaca</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Download Contoh SPJMT */}
                <div className="alert alert-info d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <i className="fa fa-file-word fa-2x text-primary me-3"></i>
                    <div>
                      <h6 className="mb-1 fw-bold">Belum punya contoh SPJMT?</h6>
                      <p className="mb-0 small">Download template contoh surat SPJMT di sini</p>
                    </div>
                  </div>
                  <a
                    href="/spjmt_mahasiswa.docx"
                    download="spjmt_mahasiswa.docx"
                    className="btn btn-primary btn-sm fw-bold"
                  >
                    <i className="fa fa-download me-2"></i>
                    Download
                  </a>
                </div>

                {/* Upload Form */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Pilih File SPJMT</label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleSpjmtChange}
                    disabled={uploadingSpjmt}
                  />
                  {spjmtError && (
                    <div className="alert alert-danger mt-2 py-2">
                      <small><i className="fa fa-exclamation-circle me-1"></i>{spjmtError}</small>
                    </div>
                  )}
                  {spjmtFile && (
                    <div className="alert alert-success mt-2 py-2">
                      <small><i className="fa fa-check-circle me-1"></i>File terpilih: <strong>{spjmtFile.name}</strong> ({(spjmtFile.size / 1024).toFixed(2)} KB)</small>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCloseSpjmtModal}
                  disabled={uploadingSpjmt}
                >
                  Batal
                </button>
                <button 
                  type="button" 
                  className="btn btn-success" 
                  onClick={handleUploadSpjmt}
                  disabled={!spjmtFile || uploadingSpjmt}
                >
                  <span className="spinner-border spinner-border-sm me-2" role="status" style={{ display: uploadingSpjmt ? 'inline-block' : 'none' }}></span>
                  <span style={{ display: uploadingSpjmt ? 'none' : 'inline-block' }} className="me-2">
                    <i className="fa fa-upload"></i>
                  </span>
                  {uploadingSpjmt ? 'Uploading...' : 'Upload SPJMT'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Preview SPJMT */}
      {showSpjmtPreviewModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered" style={{ maxWidth: '95%' }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fa fa-eye me-2"></i>Preview Surat SPJMT
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={handleCloseSpjmtPreview}
                ></button>
              </div>
              <div className="modal-body p-0">
                <iframe
                  src={dataAkademik.imagespjmt || dataNonAkademik.imagespjmt || dataKesra.imagespjmt || dataDinsos.imagespjmt || dataLuarNegeri.imagespjmt}
                  title="Preview SPJMT"
                  style={{ width: '100%', height: '70vh', border: 'none' }}
                  allowFullScreen
                />
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCloseSpjmtPreview}
                >
                  Tutup
                </button>
                <a 
                  href={dataAkademik.imagespjmt || dataNonAkademik.imagespjmt || dataKesra.imagespjmt || dataDinsos.imagespjmt || dataLuarNegeri.imagespjmt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <i className="fa fa-external-link me-2"></i>
                  Buka di Tab Baru
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
}
