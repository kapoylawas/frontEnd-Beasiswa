//import layout
import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import ModalFinish from "../../../components/general/ModalFinish";
import toast from "react-hot-toast";
import Loading from "../../../components/general/Loading";
import Kesra from "../../../components/admin/KesraA";
import KesraB from "../../../components/admin/KesraB";

export default function RiwayatIndex() {
  document.title = "Dashboard - Riwayat Pendaftar Beasiswa";

  const [tipebeasiswa, setTipebeasiswa] = useState("");
  const [dataAkademik, setDataAkademik] = useState("");
  const [dataNonAkademik, setDataNonAkademik] = useState("");
  const [dataLuarNegeri, setDataLuarNegeri] = useState("");
  const [dataDinsos, setDataDinsos] = useState("");
  const [dataKesra, setDataKesra] = useState({ imagesertifikat: "" });
  const [idUser, setIdUser] = useState("");
  const [statusFinish, setStatusFinish] = useState("");

  // variabel untuk mengambil data di kesra
  const dataTipeKesra = dataKesra.kesra;

  const [tipePendaftarDinsos, setTipePendaftarDinsos] = useState("");

  //navigata
  const navigate = useNavigate();

  //token from cookies
  const token = Cookies.get("token");

  const [isChecked, setIsChecked] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
      jenisBeasiswa = "Tipe Beasiswa Tidak Diketahui";
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
    });
  }, []);

  useEffect(() => {
    if (statusFinish === 1) {
      setLoading(true);

      const formData = new FormData();
      formData.append("status_finish", 1);
      formData.append("_method", "PUT");

      Api.post(`/api/admin/users/verif/${idUser}`, formData, {
        //header
        headers: {
          //header
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response) {
            setLoading(false);
            toast.success(response.data.message, {
              position: "top-right",
              duration: 4000,
            });
          } else {
            toast.error(response.data.message, {
              position: "top-right",
              duration: 4000,
            });
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    }
  }, [statusFinish]);

  const handleClick = () => {
    // Mengubah status dan merubahnya menjadi 1 saat tombol diklik
    setStatusFinish(1);
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <p>Tipe Beasiswa: {jenisBeasiswa}</p>
          {tipebeasiswa === 1 ? (
            <>
              <ModalFinish />
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
              <ModalFinish />
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
              <ModalFinish />
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
                                Beasiswa {dataKesra.kesra.name}
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
                </>
              ) : null}
              {dataTipeKesra.tipe_kesra === 4 ? (
                <>
                  <p>tipe form D</p>
                </>
              ) : null}
            </>
          ) : null}
          {tipebeasiswa === 4 ? (
            <>
              <ModalFinish />
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
                <ModalFinish />
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
    </LayoutAdmin>
  );
}
