import { useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import ModalDinsos from "../../../components/general/ModalDinsos";

export default function DinsosIndex() {
  document.title = "Dinsos - Beasiswa Sidoarjo";

  //token from cookies
  const token = Cookies.get("token");

  //navigate
  const navigate = useNavigate();

  const [selectedSertifikat, setSelectedSertifikat] = useState("");
  const [sertifikat, setSertifikat] = useState("");


  const [isLoading, setLoading] = useState(false);

  const [errors, setErros] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedSertifikat(event.target.value);
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

      toast.error(
        "Format File Berkas DTKS atau Surat Keterangan Tidak Mampu (SKTM) Tidak Cocok Harus PDF",
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
    setSertifikat(imageData);
  };

  const storeDinsos = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("tipe_daftar", selectedSertifikat);
    formData.append("imagesktm", sertifikat);

    await Api.post("/api/admin/dinsos", formData, {
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
        <ModalDinsos />
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
                    <i className="fa fa-shield-alt"></i> Beasiswa Dinsos
                  </h6>
                  <hr />
                  <form onSubmit={storeDinsos}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Pilih Salah Satu Terdaftar DTKS atau Tidak Terdaftar
                            DTKS
                          </label>
                          <select
                            className="form-select"
                            value={selectedSertifikat}
                            onChange={handleSelectChange}
                          >
                            <option value="">
                              -- Pilih Salah Satu Terdaftar DTKS atau Tidak
                              Terdaftar DTKS --
                            </option>
                            <option value="1">
                              Terdaftar Data Terpadu Kesejahteraan Sosial (DTKS)
                            </option>
                            <option value="2">
                              Tidak Terdaftar Data Terpadu Kesejahteraan Sosial
                              (DTKS)
                            </option>
                          </select>
                        </div>
                        {errors.tipe_daftar && (
                          <div className="alert alert-danger">
                            {errors.tipe_daftar[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    {["2"].includes(selectedSertifikat) && (
                      <>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Data Terpadu Kesejahteraan Sosial (DTKS) atau
                                Surat Keterangan Tidak Mampu (SKTM) dari Desa
                                Sesuai yang dipilih PDF dan Maksimal 2MB
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                onChange={handleFileSertifikat}
                              />
                            </div>
                          </div>
                        </div>
                      </>
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
