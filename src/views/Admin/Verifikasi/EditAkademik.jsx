//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";
import Loading from "../../../components/general/Loading";
import Akademik from "../../../components/admin/Akademik";

export default function EditAkademik() {
  //title page
  document.title = "Detail Akademik - Beasiswa";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //token from cookies
  const token = Cookies.get("token");

  const [dataAkademik, setDataAkademik] = useState({
    name: "",
    nik: "",
    kartuKeluarga: "",
    noHp: "",
    email: "",
    alamat: "",
    rt: "",
    rw: "",
    imageKtp: "",
    imageKartuKeluarga: "",
    imageAktifkampus: "",
    imageSuratpernyataan: "",
    imageAkrekampus: "",
    imageSuratBeasiswa: "",
  });

  const [idUser, setIdUser] = useState("");
  const [alasan, setAlasan] = useState("");
  const [jenisVerif, setJenisVerif] = useState("");

  const [errors, setErros] = useState([]);

  const [isLoading, setLoading] = useState(false);

  //action handel jenis verif
  const handleShowHideJenisVerif = (event) => {
    const getType = event.target.value;
    setJenisVerif(getType);
  };

  // verifikasi akademik
  const verifAkademik = async (e) => {
    e.preventDefault();
    setLoading(true);
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("alasan", alasan);
    formData.append("jenis_verif", jenisVerif);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/verif/akademik/${idUser}}`, formData, {
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
        navigate("/admin/adminAkademik");
      })
      .catch((error) => {
        setLoading(false);
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };

  const fetchDataAkademiks = async () => {
    setLoading(true);
    await Api.get(`/api/admin/akademiks/${id}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setDataAkademik(response.data.data.user);
      setAlasan(response.data.data.user.alasan);
      setIdUser(response.data.data.user.id);
      setJenisVerif(response.data.data.user.jenis_verif);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataPost"
    fetchDataAkademiks();
  }, []);

  

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/adminAkademik"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              {isLoading ? (
                <div className="mt-5">
                  <Loading />
                </div>
              ) : (
                <>
                  <div className="row mt-1 mb-2">
                    <div className="col-md-12">
                      <div className="card border-0 rounded shadow-sm border-top-success">
                        <div className="card-header text-dark">
                          Verifikasi Data Beasiswa Akademik
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-bordered table-striped text-dark">
                              <tbody>
                                <tr>
                                  <td
                                    style={{ width: "25%" }}
                                    className="fw-bold text-center"
                                  >
                                    Isi Alasan dan Verifikasi
                                  </td>
                                  <td className="fw-bold text-center">
                                    <form onSubmit={verifAkademik}>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <label className="form-label fw-bold">
                                            Isi Alasan
                                          </label>
                                          <textarea
                                            rows="5"
                                            cols="50"
                                            value={alasan}
                                            onChange={(e) =>
                                              setAlasan(e.target.value)
                                            }
                                            className="form-control"
                                          />
                                        </div>
                                        {errors.alasan && (
                                          <div className="alert alert-danger">
                                            {errors.alasan[0]}
                                          </div>
                                        )}
                                      </div>
                                      <div className="row mt-2">
                                        <div className="col-md-12">
                                          <div className="mb-3">
                                            <label className="form-label fw-bold">
                                              Pilih Verifikasi
                                            </label>
                                            <select
                                              className="form-select"
                                              value={jenisVerif}
                                              onChange={
                                                handleShowHideJenisVerif
                                              }
                                            >
                                              <option value="">
                                                -- Pilih Jenis Verifikasi --
                                              </option>
                                              <option value="lolos">
                                                Lolos Verifikasi
                                              </option>
                                              <option value="tidak">
                                                Tidak Lolos
                                              </option>
                                            </select>
                                          </div>
                                          {errors.jenis_verif && (
                                            <div className="alert alert-danger">
                                              {errors.jenis_verif[0]}
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
                  <Akademik
                    name={dataAkademik.name}
                    nik={dataAkademik.nik}
                    kartuKeluarga={dataAkademik.nokk}
                    noHp={dataAkademik.nohp}
                    email={dataAkademik.email}
                    alamat={dataAkademik.alamat}
                    rt={dataAkademik.rt}
                    rw={dataAkademik.rw}
                    imageKtp={dataAkademik.imagektp}
                    imageKartuKeluarga={dataAkademik.imagekk}
                    imageAktifkampus={dataAkademik.imageaktifkampus}
                    imageSuratpernyataan={dataAkademik.imagesuratpernyataan}
                    imageAkrekampus={dataAkademik.imageakrekampus}
                    imageSuratBeasiswa={dataAkademik.imagesuratbeasiswa}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
