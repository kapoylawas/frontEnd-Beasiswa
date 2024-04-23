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
import DinsosDtks from "../../../components/admin/DinsosDtks";
import Dispenduk from "../../../components/admin/Dispenduk";

export default function EditDispenduk() {
  //title page
  document.title = "Detail Akademik - Beasiswa";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //token from cookies
  const token = Cookies.get("token");

  const [errors, setErros] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [isLoadingSave, setLoadingSave] = useState(false);

  const [namaVerifikator, setNamaVerifikator] = useState("")

  const [dataUsers, setDataUsers] = useState({
    name: "",
    nik: "",
    kartuKeluarga: "",
    noHp: "",
    email: "",
    alamat: "",
    rt: "",
    rw: "",
    imageKtp: "",
    imagekk: "",
  });

  const [idUser, setIdUser] = useState("");
  const [alasan, setAlasan] = useState("");
  const [jenisVerif, setJenisVerif] = useState("");

  //action handel jenis verif
  const handleShowHideJenisVerif = (event) => {
    const getType = event.target.value;
    setJenisVerif(getType);
  };

  const fetchDataDinsos = async () => {
    setLoading(true);
    await Api.get(`/api/admin/beasiswa/users/${id}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setDataUsers(response.data.data);
      setIdUser(response.data.data.id);
      setAlasan(response.data.data.alasan_nik);
      setJenisVerif(response.data.data.jenis_verif_nik);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataPost"
    fetchDataDinsos();

    Api.get("/api/admin/users/byid", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setNamaVerifikator(response.data.data.name);
    });
  }, []);

  // verifikasi dinsos
  const verifDinsos = async (e) => {
    e.preventDefault();
    setLoadingSave(true);
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("alasan_nik", alasan);
    formData.append("jenis_verif_nik", jenisVerif);
    formData.append("verifikator_nik", namaVerifikator);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/verif/nik/${idUser}}`, formData, {
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
        navigate("/admin/adminDispenduk");
      })
      .catch((error) => {
        setLoadingSave(false);
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
                to="/admin/adminDispenduk"
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
                          Verifikasi Data Beasiswa Dinsos
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
                                    <form onSubmit={verifDinsos}>
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
                                              <option value="lolos">
                                                NIK Sama
                                              </option>
                                              <option value="tidak">
                                                NIK Tidak Sesuai
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
                                          disabled={isLoadingSave}
                                        >
                                          {isLoadingSave
                                            ? "LOADING..."
                                            : "SIMPAN"}{" "}
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
                  <Dispenduk
                    name={dataUsers.name}
                    nik={dataUsers.nik}
                    kartuKeluarga={dataUsers.nokk}
                    noHp={dataUsers.nohp}
                    email={dataUsers.email}
                    alamat={dataUsers.alamat}
                    rt={dataUsers.rt}
                    rw={dataUsers.rw}
                    imageKtp={dataUsers.imagektp}
                    imagekk={dataUsers.imagekk}
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
