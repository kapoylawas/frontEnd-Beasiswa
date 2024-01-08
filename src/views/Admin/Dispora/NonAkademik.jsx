import { useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function NonAkademik() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  const [name, setName] = useState("");
  const [universitas, setUniversitas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [semester, setSemester] = useState("");
  const [nim, setNim] = useState("");
  const [uploadktm, setUploadktm] = useState("");
  const [akreKampus, setAkreKampus] = useState("");
  const [akreJurusan, setAkreJurusan] = useState("");
  const [selectedSertifikat, setSelectedSertifikat] = useState("");
  const [isLoading, setLoading] = useState(false);


  const handleSelectChange = (event) => {
    setSelectedSertifikat(event.target.value);
  };

  const [errors, setErros] = useState([]);

  const handleshowhideSemester = (event) => {
    const getType = event.target.value;
    setSemester(getType);
  };

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
                    <i className="fa fa-shield-alt"></i> Beasiswa Disporapar
                    Akademik
                  </h6>
                  <hr />
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">IPK</label>
                          <input
                            type="number"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Input IPK Anda"
                          />
                        </div>
                        {errors.name && (
                          <div className="alert alert-danger">
                            {errors.name[0]}
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
                          <label className="form-label fw-bold">Jurusan</label>
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
                          <label className="form-label fw-bold">Semester</label>
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
                        {errors.akreKampus && (
                          <div className="alert alert-danger">
                            {errors.akreKampus[0]}
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
                        {errors.akreJurusan && (
                          <div className="alert alert-danger">
                            {errors.akreJurusan[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Surat Keterangan Aktif Dari Kampus PDF dan Maksimal
                            2MB
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
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Upload Surat Pernyataan Bermaterai PDF dan Maksimal
                            2MB
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
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Sertifikat /Piagam/Surat Keterangan sesuai Prestasi
                            Bidang yang di isi pendaftar{" "}
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
                        {errors.sertifikat && (
                          <div className="alert alert-danger">
                            {errors.sertifikat[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(selectedSertifikat) && (
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Upload Berkas Sertifikat Sesuai yang dipilih PDF dan Maksimal 2MB
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
