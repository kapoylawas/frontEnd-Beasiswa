import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import Loading from "../../../components/general/Loading";
import toast from "react-hot-toast";

export default function EditBeasiswaKesra() {
  document.title = "Dashboard - Riwayat Pendaftar Beasiswa";

  const token = Cookies.get("token");

  //navigate
  const navigate = useNavigate();

  const [idKesra, setIdKesra] = useState("");
  const [dataKesra, setDataKesra] = useState("");
  const [tipeKesra, setTipeKesra] = useState("");
  const [namaponpes, setNamaponpes] = useState("");
  const [alamatponpes, setAlamatponpes] = useState("");
  const [tahun, setTahun] = useState("");
  const [imagesertifikat, setImagesertifikat] = useState("");
  const [statusFinish, setStatusFinish] = useState("");

  const dataTipeKesra = dataKesra.tipe_kesra;

  const [isLoading, setLoading] = useState(false);

  const handleSelectChange = (event) => {
    setTipeKesra(event.target.value);
  };

  const handleYearChange = (event) => {
    setTahun(event.target.value);
  };

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
      setIdKesra(response.data.data.kesra.id);
      setDataKesra(response.data.data.kesra);
      setNamaponpes(response.data.data.kesra.nama_ponpes);
      setAlamatponpes(response.data.data.kesra.alamat_ponpes);
      setTipeKesra(response.data.data.kesra.tipe_sertifikat);
      setTahun(response.data.data.kesra.tahun);
      setStatusFinish(response.data.data.status_finish);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  const updateKesra = async (e) => {
    e.preventDefault();
    setLoading(true);

    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(tahun, 10);

    if (isNaN(inputYear) || inputYear < currentYear - 4) {
      // Display toast message
      toast.error(
        "Masa Sertifikat Anda Telah Expired Dalam kurun waktu 4 Tahun Terakhir ",
        {
          position: "top-center",
          autoClose: 3000, // 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setLoading(false);
      return;
    }

    //define formData
    const formData = new FormData();
    //append data to "formData"
    formData.append("nama_ponpes", namaponpes);
    formData.append("alamat_ponpes", alamatponpes);
    formData.append("tahun", tahun);
    formData.append("imagesertifikat", imagesertifikat);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/users/kesras/${idKesra}}`, formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/riwayat");
      })
      .catch((error) => {
        setLoading(false);
        //set error message to state "errors"
        console.log(error);
      });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/riwayat"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              {isLoading ? (
                <div className="mt-5">
                  <Loading />
                </div>
              ) : statusFinish === 0 ? (
                <>
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-body">
                      <h6>
                        <i className="fa fa-pencil-alt"></i> Edit Data Kesra
                      </h6>
                      <hr />
                      <form onSubmit={updateKesra}>
                        {dataTipeKesra === 1 ? (
                          <>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label className="form-label fw-bold">
                                    Sertifikat /Piagam/Surat Keterangan sesuai
                                    Prestasi Bidang yang di isi pendaftar{" "}
                                  </label>
                                  <select
                                    className="form-select"
                                    value={tipeKesra}
                                    onChange={handleSelectChange}
                                    disabled
                                  >
                                    <option value="">
                                      -- Pilih Salah Satu Sertifikat --
                                    </option>
                                    <option value="1">
                                      Hafal minimal 10 (sepuluh) juz A1-Qur'an :
                                      Sertifikat / SK (Upload)
                                    </option>
                                    <option value="2">
                                      Pernah mengikuti kejuaraan MTQ :
                                      Sertifikat / SK (Upload)
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label className="form-label fw-bold">
                                    Upload sertifikat atau surat keterangan
                                    dan/atau bentuk lain yang dipersamakan PDF
                                    dan Maksimal 2MB
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                      setImagesertifikat(e.target.files[0])
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Sertifikat yang pernah diperoleh dalam kurun
                                  waktu 4 tahun terakhir (YANG TERBARU)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={tahun}
                                  onChange={handleYearChange}
                                  placeholder="tahun"
                                />
                              </div>
                            </div>
                          </>
                        ) : null}
                        {dataTipeKesra === 2 ? (
                          <>
                            <p>tipe form B</p>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label className="form-label fw-bold">
                                    Sertifikat /Piagam/Surat Keterangan sesuai
                                    Prestasi Bidang yang di isi pendaftar{" "}
                                  </label>
                                  <select
                                    className="form-select"
                                    value={tipeKesra}
                                    onChange={handleSelectChange}
                                    disabled
                                  >
                                    <option value="">
                                      -- Pilih Salah Satu Sertifikat --
                                    </option>
                                    <option value="1">
                                      Santriwan dan Santriwati yang berkuliah
                                      dan menetap di Pondok Pesantren : Surat
                                      Ket Ponpes (Upload)
                                    </option>
                                    <option value="2">
                                      Ustadz/ustadzah sebagai guru ngaji di
                                      TPA/TPQ/ Madin : Surat Rekomendasi Kepala
                                      TPQ atau Madrasah Diniyah (Upload)
                                    </option>
                                  </select>
                                </div>
                                {tipeKesra === 2 ? null : (
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="mb-3">
                                        <label className="form-label fw-bold">
                                          Nama Ponpes
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={namaponpes}
                                          onChange={(e) =>
                                            setNamaponpes(e.target.value)
                                          }
                                          placeholder="Nama Ponpes"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="mb-3">
                                        <label className="form-label fw-bold">
                                          Alamat Ponpes
                                        </label>
                                        <textarea
                                          type="text"
                                          className="form-control"
                                          value={alamatponpes}
                                          onChange={(e) =>
                                            setAlamatponpes(e.target.value)
                                          }
                                          placeholder="Enter Alamat Ponpes"
                                          rows="4" // Set the number of visible text lines
                                          cols="50"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="mb-3">
                                        <label className="form-label fw-bold">
                                          Upload Berkas Surat Ket Ponpes PDF dan
                                          Maksimal 2MB
                                        </label>
                                        <input
                                          type="file"
                                          className="form-control"
                                          accept="application/pdf"
                                          onChange={(e) =>
                                            setImagesertifikat(
                                              e.target.files[0]
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {tipeKesra === 1 ? null : (
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="mb-3">
                                        <label className="form-label fw-bold">
                                          Upload Berkas Surat Rekomendasi Kepala
                                          TPQ atau Madrasah Diniyah PDF dan
                                          Maksimal 2MB
                                        </label>
                                        <input
                                          type="file"
                                          className="form-control"
                                          accept="application/pdf"
                                          onChange={(e) =>
                                            setImagesertifikat(
                                              e.target.files[0]
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        ) : null}
                        {dataTipeKesra === 3 ? (
                          <>
                            <p>tipe form C</p>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Sertifikat /Piagam/Surat Keterangan sesuai
                                  Prestasi Bidang yang di isi pendaftar{" "}
                                </label>
                                <select
                                  className="form-select"
                                  value={tipeKesra}
                                  onChange={handleSelectChange}
                                  disabled
                                >
                                  <option value="">
                                    -- Pilih Salah Satu Sertifikat --
                                  </option>
                                  <option value="1">
                                    Santriwan dan Santriwati yang berkuliah dan
                                    menetap di Pondok Pesantren : Surat Ket
                                    Ponpes (Upload)
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Nama Ponpes
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={namaponpes}
                                  onChange={(e) =>
                                    setNamaponpes(e.target.value)
                                  }
                                  placeholder="Nama Ponpes"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Alamat Ponpes
                                </label>
                                <textarea
                                  type="text"
                                  className="form-control"
                                  value={alamatponpes}
                                  onChange={(e) =>
                                    setAlamatponpes(e.target.value)
                                  }
                                  placeholder="Enter Alamat Ponpes"
                                  rows="4" // Set the number of visible text lines
                                  cols="50"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Upload Berkas Surat Ket Ponpes PDF dan
                                  Maksimal 2MB
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  accept="application/pdf"
                                  onChange={(e) =>
                                    setImagesertifikat(e.target.files[0])
                                  }
                                />
                              </div>
                            </div>
                          </>
                        ) : null}
                        {dataTipeKesra === 4 ? (
                          <>
                            <p>tipe form D</p>
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Khusus Non Muslim) tercatat sebagai
                                  pengurus/aktifis atau mempunyai piagam
                                  kejuaraan bidang keagamaan{" "}
                                </label>
                                <select
                                  className="form-select"
                                  value={tipeKesra}
                                  onChange={handleSelectChange}
                                  disabled
                                >
                                  <option value="">
                                    -- Pilih Salah Satu Sertifikat --
                                  </option>
                                  <option value="1">
                                    Piagam kejuaraan keagamaan
                                  </option>
                                  <option value="2">
                                    Pengurus atau Aktifis Keagamaan
                                  </option>
                                </select>
                              </div>
                            </div>
                            {tipeKesra === 2 ? null : (
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="mb-3">
                                    <label className="form-label fw-bold">
                                      Upload Piagam PDF dan Maksimal 2MB
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      accept="application/pdf"
                                      onChange={(e) =>
                                        setImagesertifikat(e.target.files[0])
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="mb-3">
                                    <label className="form-label fw-bold">
                                      Sertifikat yang pernah diperoleh dalam
                                      kurun waktu 4 tahun terakhir (YANG
                                      TERBARU)
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={tahun}
                                      onChange={handleYearChange}
                                      placeholder="tahun"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                            {tipeKesra === 1 ? null : (
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="mb-3">
                                    <label className="form-label fw-bold">
                                      Nama
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={namaponpes}
                                      onChange={(e) =>
                                        setNamaponpes(e.target.value)
                                      }
                                      placeholder="Nama Tempat"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="mb-3">
                                    <label className="form-label fw-bold">
                                      Alamat
                                    </label>
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      value={alamatponpes}
                                      onChange={(e) =>
                                        setAlamatponpes(e.target.value)
                                      }
                                      placeholder="Enter Alamat"
                                      rows="4" // Set the number of visible text lines
                                      cols="50"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="mb-3">
                                    <label className="form-label fw-bold">
                                    Upload Berkas SK Pimpinan Keagamaan atau Surat Rekomendasi dari pimpinan Keagamaan PDF dan Maksimal 2MB
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      accept="application/pdf"
                                      onChange={(e) =>
                                        setImagesertifikat(e.target.files[0])
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : null}
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
                </>
              ) : (
                <div className="alert alert-danger" role="alert">
                  Anda Sudah Menyelesaikan Pendaftaran Beasiswa Sidoarjo
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
