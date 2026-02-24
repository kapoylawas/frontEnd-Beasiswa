import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import Loading from "../../../components/general/Loading";

export default function EditBeasiswaNonakademik() {
  document.title = "Bioadata - Beasiswa";

  //navigata
  const navigate = useNavigate();

  //token from cookies
  const token = Cookies.get("token");

  const [idNonAkademik, setIdNonAkademik] = useState("");
  const [semester, setSemester] = useState("");
  const [sertifikat, setSertifikat] = useState("");
  const [tingatSertifikat, setTingkSertifikat] = useState("");
  const [imageSertifikat, setImageSertifikat] = useState("");
  const [tahun, setTahun] = useState("");
  const [statusFinish, setStatusFinish] = useState("");

  const [isLoading, setLoading] = useState(false);

  const handleshowhideSemester = (event) => {
    const getType = event.target.value;
    setSemester(getType);
  };

  // handel jenis prestasi
  const handleSelectChange = (event) => {
    setSertifikat(event.target.value);
  };

  // handel tingkat prestasi
  const handleSelectTingkatPrestasi = (event) => {
    setTingkSertifikat(event.target.value);
  };

  const handleYearChange = (event) => {
    setTahun(event.target.value);
  };

  // GET DATA NON AKADEMIK
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
      setSemester(response.data.data.nonakademik.semester);
      setSertifikat(response.data.data.nonakademik.jenis_sertifikat);
      setTingkSertifikat(response.data.data.nonakademik.tingkat_sertifikat);
      setTahun(response.data.data.nonakademik.tahun);
      setStatusFinish(response.data.data.status_finish);
      setIdNonAkademik(response.data.data.nonakademik.id);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  // update bidang non akademiks
  const updateBidangNonAkademiks = async (e) => {
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
    formData.append("semester", semester);
    formData.append("jenis_sertifikat", sertifikat);
    formData.append("tingkat_sertifikat", tingatSertifikat);
    formData.append("tahun", tahun);
    formData.append("imagesertifikat", imageSertifikat);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/users/nonAkademiks/${idNonAkademik}}`, formData, {
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
        setErros(error.response.data);
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
                        <i className="fa fa-pencil-alt"></i> Edit Data Beasiswa
                        Non Akademik
                      </h6>
                      <hr />
                      <form onSubmit={updateBidangNonAkademiks}>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Semester
                              </label>
                              <select
                                className="form-select"
                                value={semester}
                                onChange={handleshowhideSemester}
                              >
                                <option value="">-- Select Semester --</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Sertifikat /Piagam/Surat Keterangan prestasi
                                bidang ilmu pengetahuan, teknologi, kebudayaan,
                                olahraga, sosial, kemanusiaan, lingkungan, dan
                                nasionalisme tingkat Internasional, Nasional,
                                Provinsi, dan Kabupaten yang dibuktikan dengan
                                sertifikat, piagam, surat keterangan dan/atau
                                bentuk lain yang dipersamakan
                              </label>
                              <select
                                className="form-select"
                                value={sertifikat}
                                onChange={handleSelectChange}
                              >
                                <option value="">
                                  -- Pilih Salah Satu Sertifikat --
                                </option>
                                <option value="1">Ilmu Pengetahuan</option>
                                <option value="2">Teknologi</option>
                                <option value="3">Seni</option>
                                <option value="4">Budaya</option>
                                <option value="5">Olahraga</option>
                                <option value="6">Sosial</option>
                                <option value="7">Kemanusiaan</option>
                                <option value="8">Lingkungan</option>
                                <option value="9">Bela Negara</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Tingkat Prestasi
                              </label>
                              <select
                                className="form-select"
                                value={tingatSertifikat}
                                onChange={handleSelectTingkatPrestasi}
                              >
                                <option value="">
                                  -- Pilih Salah Satu Sertifikat --
                                </option>
                                <option value="1">Internasional</option>
                                <option value="2">Nasional</option>
                                <option value="3">Provinsi</option>
                                <option value="4">Kabupaten</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Upload Berkas Sesuai yang dipilih PDF dan
                                Maksimal 2MB
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                accept="application/pdf"
                                onChange={(e) =>
                                  setImageSertifikat(e.target.files[0])
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Tahun Sertifikat yang pernah diperoleh dalam kurun waktu
                              4 tahun terakhir (YANG TERBARU)
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
                        <div>
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
