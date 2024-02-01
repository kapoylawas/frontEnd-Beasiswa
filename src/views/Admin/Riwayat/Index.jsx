//import layout
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import ModalFinish from "../../../components/general/ModalFinish";

export default function RiwayatIndex() {
  document.title = "Dashboard - Riwayat Pendaftar Beasiswa";

  const [tipebeasiswa, setTipebeasiswa] = useState("");
  const [dataAkademik, setDataAkademik] = useState("");
  const [dataNonAkademik, setDataNonAkademik] = useState("");
  const [dataLuarNegeri, setDataLuarNegeri] = useState("");
  console.log(dataLuarNegeri);

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

  //token from cookies
  const token = Cookies.get("token");

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
      setTipebeasiswa(response.data.data.tipe_beasiswa);
      setDataAkademik(response.data.data);
      setDataNonAkademik(response.data.data);
      setDataLuarNegeri(response.data.data);
    });
  }, []);

  const handleSave = () => {
    // Logika untuk menyimpan data
    console.log("Data disimpan!");
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <p>Tipe Beasiswa: {jenisBeasiswa}</p>
          {tipebeasiswa === 1 ? (
            <>
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
                                Beasiswa {dataAkademik.akademik.name}
                                <div className="d-flex justify-content-center">
                                  <Link
                                    to="/admin/dispora/nonakademik"
                                    className="btn btn-md btn-primary me-2"
                                  >
                                    Edit Data
                                  </Link>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="fw-bold text-center">
                                Edit Bioadata
                              </td>
                              <td className="fw-bold text-center">
                                <div className="d-flex justify-content-center">
                                  <Link
                                    to="/admin/biodata"
                                    className="btn btn-md btn-primary me-2"
                                  >
                                    Edit Data
                                  </Link>
                                </div>
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
                                <form>
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
                                    >
                                      {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                                    </button>
                                  </div>
                                </form>
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
                      <div className="row justify-content-center mt-3">
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
                        <div className="col-md-6">
                          <div className="card rounded">
                            <div className="text-center">
                              File Kartu Tanda Penduduk
                            </div>
                            <iframe
                              src={dataAkademik.imagektp}
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
                                  Beasiswa {dataNonAkademik.nonakademik.name}
                                  <div className="d-flex justify-content-center">
                                    <Link
                                      to="/admin/dispora/nonakademik"
                                      className="btn btn-md btn-primary me-2"
                                    >
                                      Edit Data
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="fw-bold text-center">
                                  Edit Bioadata
                                </td>
                                <td className="fw-bold text-center">
                                  <div className="d-flex justify-content-center">
                                    <Link
                                      to="/admin/biodata"
                                      className="btn btn-md btn-primary me-2"
                                    >
                                      Edit Data
                                    </Link>
                                  </div>
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
                                  <form>
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
                                      >
                                        {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                                      </button>
                                    </div>
                                  </form>
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
                                src={
                                  dataNonAkademik.nonakademik.imagesertifikat
                                }
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
            </>
          ) : null}
          {tipebeasiswa === 3 ? (
            <>
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
                                Beasiswa {dataAkademik.nonakademik.name}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {tipebeasiswa === 4 ? (
            <>
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
                                Beasiswa {dataAkademik.nonakademik.name}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {tipebeasiswa === 5 ? (
            <>
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
                                Beasiswa {dataLuarNegeri.luar_negeri.name}{" "}
                                negeri
                                <div className="d-flex justify-content-center">
                                  <Link
                                    to="/admin/dispora/nonakademik"
                                    className="btn btn-md btn-primary me-2"
                                  >
                                    Edit Data
                                  </Link>
                                </div>
                              </td>
                            </tr>
                            <td className="fw-bold text-center">
                              Edit Bioadata
                            </td>
                            <td className="fw-bold text-center">
                              <div className="d-flex justify-content-center">
                                <Link
                                  to="/admin/biodata"
                                  className="btn btn-md btn-primary me-2"
                                >
                                  Edit Data
                                </Link>
                              </div>
                            </td>
                            <tr>
                              <td
                                style={{ width: "15%" }}
                                className="fw-bold text-center"
                              >
                                Verifikasi User
                              </td>

                              <td className="fw-bold text-center">
                                <form>
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
                                    >
                                      {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                                    </button>
                                  </div>
                                </form>
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
                              File Perguruan Tinggi yang diakui oleh Kementerian
                              Pendidikan, Kebudayaan, Riset dan Teknologi
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
          ) : null}
        </div>
      </main>
    </LayoutAdmin>
  );
}
