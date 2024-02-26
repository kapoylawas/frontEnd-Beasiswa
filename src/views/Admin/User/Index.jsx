import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function UserIndex() {
  document.title = "Bioadata - Beasiswa";

  //navigata
  const navigate = useNavigate();

  //token from cookies
  const token = Cookies.get("token");

  const [idBiodata, setIdBiodata] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nik, setNik] = useState("");
  const [kk, setKk] = useState("");
  const [nohp, setNohp] = useState("");
  const [nim, setNim] = useState("");
  const [alamat, setAlamat] = useState("");
  const [ktm, setKtm] = useState("");
  const [isLoading, setLoading] = useState(false);


  //hook useEffect get bioadata
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
      setIdBiodata(response.data.data.id);
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setNik(response.data.data.nik);
      setKk(response.data.data.nokk);
      setNohp(response.data.data.nohp);
      setNim(response.data.data.nim);
      setAlamat(response.data.data.alamat);
    });
  }, []);

  // update biodata
  const updateBiodata = async (e) => {
    e.preventDefault();
    setLoading(true);
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("name", name);
    formData.append("email", email);
    formData.append("nik", nik);
    formData.append("nokk", kk);
    formData.append("nohp", nohp);
    formData.append("nim", nim);
    formData.append("alamat", alamat);
    formData.append("ktm", ktm);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/users/biodata/${idBiodata}}`, formData, {
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
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Edit Biodata
                  </h6>
                  <hr />
                  <form onSubmit={updateBiodata}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Nama</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">NIK</label>
                          <input
                            type="text"
                            className="form-control"
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            No Kartu Keluarga
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={kk}
                            onChange={(e) => setKk(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">Nim</label>
                            <input
                              type="text"
                              className="form-control"
                              value={nim}
                              onChange={(e) => setNim(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">No Hp</label>
                            <input
                              type="text"
                              className="form-control"
                              value={nohp}
                              onChange={(e) => setNohp(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Alamat</label>
                        <textarea
                          type="text"
                          className="form-control"
                          value={alamat}
                          onChange={(e) => setAlamat(e.target.value)}
                          placeholder="Enter Alamat Universitas"
                          rows="4" // Set the number of visible text lines
                          cols="50"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">File KTM</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="file/*"
                          onChange={(e) => setKtm(e.target.files[0])}
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
