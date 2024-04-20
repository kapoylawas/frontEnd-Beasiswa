import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import ModalKesra from "../../../components/general/ModalKesra";
import { v4 as uuidv4 } from "uuid";

export default function KeagamanA() {
  document.title = "Kesra - Beasiswa Sidoarjo";

  //token from cookies
  const token = Cookies.get("token");

  //navigate
  const navigate = useNavigate();

  const generatedUuid = uuidv4();

  const [users, setUsers] = useState("");
  const [step, setStep] = useState("");

  const [selectedSertifikat, setSelectedSertifikat] = useState("");
  const [sertifikat, setSertifikat] = useState("");
  const [tahun, setTahun] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [errors, setErros] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedSertifikat(event.target.value);
  };

  const handleYearChange = (event) => {
    setTahun(event.target.value);
  };

  const handleFileSertifikat = (e) => {
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
        setSertifikat(imageData);
      }
    }

    if (!imageData.type.match("pdf.*")) {
      setSertifikat("");

      toast.error("Format File Berkas Sertifikat Tidak Cocok Harus PDF", {
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
    setSertifikat(imageData);
  };

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
      setUsers(response.data.data.status_pendaftar);
      setStep(response.data.data.step);
      setLoading(false);
    });
  }, []);

  const storeKesra = async (e) => {
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
    const formData = new FormData();

    formData.append("uuid", generatedUuid);
    formData.append("tipe_sertifikat", selectedSertifikat);
    formData.append("imagesertifikat", sertifikat);
    formData.append("tahun", tahun);
    formData.append("tipe_kesra", 1);

    await Api.post("/api/admin/kesra", formData, {
      //header
      headers: {
        //header
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/mahasiswa");
      })
      .catch((error) => {
        //set error message to state "errors"
        setLoading(false);
        setErros(error.response.data);
      });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="col-md-3 col-12 mb-2">
            <Link
              to="/admin/mahasiswa"
              className="btn btn-md btn-primary border-0 shadow w-100"
              type="button"
            >
              <i className="fa-solid fa-backward"></i> Kembali
            </Link>
          </div>
          {users === 1 ? (
            <div className="alert alert-danger" role="alert">
              Anda Sudah Terdaftar di Beasiswa
            </div>
          ) : step === 1 ? (
            <div className="alert alert-danger" role="alert">
              Anda Belum Menyelesaikan step 2 di Data Perguruan Tinggi Anda
            </div>
          ) : (
            <>
              <ModalKesra />
              <div className="container-fluid mb-5 mt-5">
                <div className="col-md-3 col-12 mb-2">
                  <Link
                    to="/admin/kesra"
                    className="btn btn-md btn-primary w-100 border-0 shadow"
                    type="button"
                  >
                    <i className="fa-solid fa-backward"></i> Kembali
                  </Link>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card border-top-success rounded border-0 shadow-sm">
                      <div className="card-body">
                        <h6>
                          <i className="fa fa-shield-alt"></i> Beasiswa Kesra
                        </h6>
                        <hr />
                        <form onSubmit={storeKesra}>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Sertifikat /Piagam/Surat Keterangan sesuai
                                  Prestasi Bidang yang di isi pendaftar{" "}
                                </label>
                                <select
                                  className="form-select"
                                  value={selectedSertifikat}
                                  onChange={handleSelectChange}
                                >
                                  <option value="">
                                    -- Pilih Salah Satu Sertifikat --
                                  </option>
                                  <option value="1">
                                    Hafal minimal 10 (sepuluh) juz A1-Qur'an :
                                    Sertifikat / SK (Upload)
                                  </option>
                                  <option value="2">
                                    Pernah mengikuti kejuaraan MTQ : Sertifikat
                                    / SK (Upload)
                                  </option>
                                  <option value="3">
                                    Prestasi lain di bidang keagamaan :
                                    sertifikat atau surat keterangan dan/atau
                                    bentuk lain yang dipersamakan .
                                  </option>
                                </select>
                              </div>
                              {errors.tipe_sertifikat && (
                                <div className="alert alert-danger">
                                  {errors.tipe_sertifikat[0]}
                                </div>
                              )}
                            </div>
                          </div>
                          {["1", "2", "3"].includes(selectedSertifikat) && (
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
                                    onChange={handleFileSertifikat}
                                  />
                                </div>
                                {errors.imagesertifikat && (
                                  <div className="alert alert-danger">
                                    {errors.imagesertifikat[0]}
                                  </div>
                                )}
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
                                {errors.tahun && (
                                  <div className="alert alert-danger">
                                    {errors.tahun[0]}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
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
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </LayoutAdmin>
  );
}
