import { useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function NonAkademik() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  //token from cookies
  const token = Cookies.get("token");

  //navigata
  const navigate = useNavigate();

  const [semester, setSemester] = useState("");
  const [selectedSertifikat, setSelectedSertifikat] = useState("");
  const [sertifikat, setSertifikat] = useState("");
  const [tahun, setTahun] = useState("");
  const [tingkatanSertifikat, setTingkatanSertifikat] = useState("");
  const [isLoading, setLoading] = useState(false);

  // handel jenis prestasi
  const handleSelectChange = (event) => {
    setSelectedSertifikat(event.target.value);
  };

  // handel tingkat prestasi
  const handleSelectTingkatPrestasi = (event) => {
    setTingkatanSertifikat(event.target.value);
  };

  const [errors, setErros] = useState([]);

  const handleshowhideSemester = (event) => {
    const getType = event.target.value;
    setSemester(getType);
  };

  const handleYearChange = (event) => {
    setTahun(event.target.value);
  };

  const handleshowhideAkreditasi = (event) => {
    const getType = event.target.value;
    setAkreKampus(getType);
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

  const storeNonAkademik = async (e) => {
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
    formData.append("semester", semester);
    // formData.append("akredetasi_kampus", akreKampus);
    // formData.append("imageakredetasi", transkripNilai);
    formData.append("jenis_sertifikat", selectedSertifikat);
    formData.append("imagesertifikat", sertifikat);
    formData.append("tahun", tahun);

    await Api.post("/api/admin/nonakademiks", formData, {
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
          <div className="row">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-shield-alt"></i> Beasiswa Disporapar Non
                    Akademik
                  </h6>
                  <hr />
                  <form onSubmit={storeNonAkademik}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Semester</label>
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
                        {errors.semester && (
                          <div className="alert alert-danger">
                            {errors.semester[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Sertifikat /Piagam/Surat Keterangan prestasi bidang
                            ilmu pengetahuan, teknologi, kebudayaan, olahraga,
                            sosial, kemanusiaan, lingkungan, dan nasionalisme
                            tingkat Internasional, Nasional, Provinsi, dan
                            Kabupaten yang dibuktikan dengan sertifikat, piagam,
                            surat keterangan dan/atau bentuk lain yang
                            dipersamakan
                          </label>
                          <select
                            className="form-select"
                            value={selectedSertifikat}
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
                        {errors.jenis_sertifikat && (
                          <div className="alert alert-danger">
                            {errors.jenis_sertifikat[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                      selectedSertifikat
                    ) && (
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Upload Berkas Sesuai yang dipilih PDF
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
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Tingkat Prestasi
                              </label>
                              <select
                                className="form-select"
                                value={tingkatanSertifikat}
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
                            {errors.jenis_sertifikat && (
                              <div className="alert alert-danger">
                                {errors.jenis_sertifikat[0]}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Sertifikat yang pernah diperoleh dalam kurun waktu
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
                      <button type="reset" className="btn btn-md btn-warning">
                        <i className="fa fa-redo"></i> Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
