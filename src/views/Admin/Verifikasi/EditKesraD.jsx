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
import KesraFormD from "../../../components/admin/KesraFormD";

export default function EditKesraD() {
  //title page
  document.title = "Detail Kesra - Beasiswa";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //token from cookies
  const token = Cookies.get("token");

  const [errors, setErros] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [isLoadingSave, setLoadingSave] = useState(false);

  const [dataKesra, setDataKesra] = useState({
    imagesertifikat: "",
    tipe_sertifikat: "",
  });
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
    imageAktifkampus: "",
  });

  const [tipeSertifikat, setTipeSertifikat] = useState("");
  const [idUser, setIdUser] = useState("");
  const [alasan, setAlasan] = useState("");
  const [jenisVerif, setJenisVerif] = useState("");
  const [namaVerifikator, setNamaVerifikator] = useState("")


  //action handel jenis verif
  const handleShowHideJenisVerif = (event) => {
    const getType = event.target.value;
    setJenisVerif(getType);
  };

  const fetchDataDinsos = async () => {
    setLoading(true);
    await Api.get(`/api/admin/beasiswa/kesras/${id}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setDataKesra(response.data.data);
      setDataUsers(response.data.data.user);
      setIdUser(response.data.data.user.id);
      setAlasan(response.data.data.user.alasan);
      setJenisVerif(response.data.data.user.jenis_verif);
      setTipeSertifikat(response.data.data.tipe_sertifikat);
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
    formData.append("alasan", alasan);
    formData.append("jenis_verif", jenisVerif);
    formData.append("verifikator_berkas", namaVerifikator);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/verif/kesra/${idUser}}`, formData, {
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
        navigate("/admin/adminKesraD");
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
                to="/admin/adminKesraD"
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
                          Verifikasi Data Beasiswa Kesra Non Muslim
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

                  {tipeSertifikat === 1 ? (
                    <div className="row mt-1 mb-2">
                      <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                          <div className="card-header text-dark">
                            Tahun Piagam/Sertifikat
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
                                      Tahun Sertifikat
                                    </td>
                                    <td className="fw-bold text-center">
                                      {dataKesra.tahun}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : tipeSertifikat === 2 ? (
                    <div className="row mt-1 mb-2">
                      <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                          <div className="card-header text-dark">
                            Data Nama Tempat dan Alamat
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
                                      Nama Tempat
                                    </td>
                                    <td className="fw-bold text-center">
                                      {dataKesra.nama_ponpes}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{ width: "25%" }}
                                      className="fw-bold text-center"
                                    >
                                      Alamat
                                    </td>
                                    <td className="fw-bold text-center">
                                      {dataKesra.alamat_ponpes}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <KesraFormD
                    name={dataUsers.name}
                    nik={dataUsers.nik}
                    kartuKeluarga={dataUsers.nokk}
                    noHp={dataUsers.nohp}
                    email={dataUsers.email}
                    alamat={dataUsers.alamat}
                    rt={dataUsers.rt}
                    rw={dataUsers.rw}
                    imageKtp={dataUsers.imagektp}
                    imageKartuKeluarga={dataUsers.imagekk}
                    imageAktifkampus={dataUsers.imageaktifkampus}
                    imageSuratpernyataan={dataUsers.imagesuratpernyataan}
                    imageAkrekampus={dataUsers.imageakrekampus}
                    imageSuratBeasiswa={dataUsers.imagesuratbeasiswa}
                    imagesertifikat={dataKesra.imagesertifikat}
                    tipe_sertifikat={dataKesra.tipe_sertifikat}
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
