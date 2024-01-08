//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";

export default function Akademik() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  //navigata
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [ipk, setIpk] = useState("");
  const [universitas, setUniversitas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [semester, setSemester] = useState("");
  const [nim, setNim] = useState("");
  const [uploadktm, setUploadktm] = useState("");
  const [akreKampus, setAkreKampus] = useState("");
  const [akreJurusan, setAkreJurusan] = useState("");
  const [progam, setProgam] = useState("");
  const [suratKeteranganKampus, setSuratKeteranganKampus] = useState("");
  const [suratPernyataan, setSuratPernyataan] = useState("");
  const [transkripNilai, setTranskripNilai] = useState("");
  const [hasilAkhir, setHasilAkhir] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [users, setUsers] = useState("");

  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  const handleshowhideSemester = (event) => {
    const getType = event.target.value;
    setSemester(getType);
  };

  const handleshowhideProgam = (event) => {
    const getType = event.target.value;
    setProgam(getType);
  };

  // handle onchange file ktm
  const handleFileKtm = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("pdf.*")) {
      setUploadktm("");

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
    setUploadktm(imageData);
  };

  // handel onchange surat aktif kampus
  const handleFileSuratAktifKampus = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("pdf.*")) {
      setSuratKeteranganKampus("");

      toast.error(
        "Format File Surat Keterangan Aktif Kampus Tidak Cocok Harus PDF",
        {
          duration: 5000,
          position: "top-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
      return;
    }
    setSuratKeteranganKampus(imageData);
  };

  // handle onchange surat pernyataan
  const handleFileSuratPernyataan = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("pdf.*")) {
      setSuratPernyataan("");

      toast.error(
        "Format File Surat Pernyataan Bermaterai Tidak Cocok Harus PDF",
        {
          duration: 5000,
          position: "top-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
      return;
    }
    setSuratPernyataan(imageData);
  };

  // handle onchange transkrip nilai
  const handleFileTranskripNilai = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("pdf.*")) {
      setTranskripNilai("");

      toast.error("Format File Transkrip Nilai Tidak Cocok Harus PDF", {
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
    setTranskripNilai(imageData);
  };

  // handel onchange keterangan hasil akhir
  const handleHasilAkhir = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("pdf.*")) {
      setHasilAkhir("");

      toast.error("Format File Keterangan/Hasil Akhir Tidak Cocok Harus PDF", {
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
    setHasilAkhir(imageData);
  };

  const storeAkademik = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("ipk", ipk);
    formData.append("universitas", universitas);
    formData.append("jurusan", jurusan);
    formData.append("semester", semester);
    formData.append("nim", nim);
    formData.append("imagektm", uploadktm);
    formData.append("akredetasi_kampus", akreKampus);
    formData.append("akredetasi_jurusan", akreJurusan);
    formData.append("progam_pendidikan", progam);
    formData.append("imageaktifkampus", suratKeteranganKampus);
    formData.append("imagesuratpernyataan", suratPernyataan);
    formData.append("imagetranskrip", transkripNilai);
    formData.append("imageketerangan", hasilAkhir);

    await Api.post("/api/admin/akademiks", formData, {
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
      setUsers(response.data.data.status_pendaftar);
    });
  }, []);

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
            <div class="alert alert-danger" role="alert">
              Anda Sudah Terdaftar di Beasiswa
            </div>
          ) : (
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded shadow-sm border-top-success">
                  <div className="card-body">
                    <h6>
                      <i className="fa fa-shield-alt"></i> Beasiswa Disporapar
                      Akademik
                    </h6>
                    <hr />
                    <form onSubmit={storeAkademik}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">IPK</label>
                            <input
                              type="number"
                              className="form-control"
                              value={ipk}
                              onChange={(e) => setIpk(e.target.value)}
                              placeholder="Enter IPK(Indeks Prestasi Kumulatif)"
                            />
                          </div>
                          {errors.ipk && (
                            <div className="alert alert-danger">
                              {errors.ipk[0]}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Nama Universitas
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={universitas}
                              onChange={(e) => setUniversitas(e.target.value)}
                              placeholder="Enter Nama Perguruan Tinggi"
                            />
                          </div>
                          {errors.universitas && (
                            <div className="alert alert-danger">
                              {errors.universitas[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Jurusan
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={jurusan}
                              onChange={(e) => setJurusan(e.target.value)}
                              placeholder="Jurusan Prodi"
                            />
                          </div>
                          {errors.jurusan && (
                            <div className="alert alert-danger">
                              {errors.jurusan[0]}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
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
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
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
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">NIM</label>
                            <input
                              type="text"
                              className="form-control"
                              value={nim}
                              onChange={(e) => setNim(e.target.value)}
                              placeholder="Nomor Induk Mahasiswa (NIM)"
                            />
                          </div>
                          {errors.jurusan && (
                            <div className="alert alert-danger">
                              {errors.jurusan[0]}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Upload KTM PDF dan Maksimal 2MB
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleFileKtm}
                            />
                          </div>
                          {errors.imagektm && (
                            <div className="alert alert-danger">
                              {errors.imagektm[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Akreditasi Kampus
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={akreKampus}
                              onChange={(e) => setAkreKampus(e.target.value)}
                              placeholder="Akreditasi Universitas"
                            />
                          </div>
                          {errors.akredetasi_kampus && (
                            <div className="alert alert-danger">
                              {errors.akredetasi_kampus[0]}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Akreditasi Jurusan
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={akreJurusan}
                              onChange={(e) => setAkreJurusan(e.target.value)}
                              placeholder="Akreditasi Jurusan"
                            />
                          </div>
                          {errors.akredetasi_jurusan && (
                            <div className="alert alert-danger">
                              {errors.akredetasi_jurusan[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Program Pendidikan (Jurusan Non Eksakta/Sosial Dan
                              Jurusan Eksakta/Sains) *Wajib Pilih Salah Satu
                            </label>
                            <select
                              className="form-select"
                              value={progam}
                              onChange={handleshowhideProgam}
                            >
                              <option value="">
                                -- Select Program Pendidikan --
                              </option>
                              <option value="non">Jurusan Non Eksakta</option>
                              <option value="eksakta">
                                Sosial Dan Jurusan Eksakta/Sains
                              </option>
                            </select>
                          </div>
                          {errors.progam_pendidikan && (
                            <div className="alert alert-danger">
                              {errors.progam_pendidikan[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Surat Keterangan Aktif Dari Kampus PDF dan
                              Maksimal 2MB
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleFileSuratAktifKampus}
                            />
                          </div>
                          {errors.imageaktifkampus && (
                            <div className="alert alert-danger">
                              {errors.imageaktifkampus[0]}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Upload Surat Pernyataan Bermaterai PDF dan
                              Maksimal 2MB
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleFileSuratPernyataan}
                            />
                          </div>
                          {errors.imagesuratpernyataan && (
                            <div className="alert alert-danger">
                              {errors.imagesuratpernyataan[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Transkrip Nilai Pada Semester Akhir Yang Ditempuh
                              PDF dan Maksimal 2MB
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleFileTranskripNilai}
                            />
                          </div>
                          {errors.imagetranskrip && (
                            <div className="alert alert-danger">
                              {errors.imagetranskrip[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Keterangan /Hasil Akhir PDF dan Maksimal 2MB
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleHasilAkhir}
                            />
                          </div>
                          {errors.imageketerangan && (
                            <div className="alert alert-danger">
                              {errors.imageketerangan[0]}
                            </div>
                          )}
                        </div>
                      </div>
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
          )}
        </div>
      </main>
    </LayoutAdmin>
  );
}
