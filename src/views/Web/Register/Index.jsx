//import layout
import { useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import { Link, useNavigate } from "react-router-dom";
//import react Quill
import ReactQuill from "react-quill";
// quill CSS
import "react-quill/dist/quill.snow.css";
//import toast
import toast from "react-hot-toast";
import Api from "../../../services/Api";

export default function Register() {
  document.title = "Register - Beasiswa Sidoarjo";

  //navigata
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [nokk, setNokk] = useState("");
  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [codepos, setCodepos] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [alamat, setAlamat] = useState("");
  const [ktp, setKtp] = useState("");
  const [kk, setKk] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [roles] = useState(["user"]);
  const [errors, setErros] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleshowhideGender = (event) => {
    const getType = event.target.value;
    setGender(getType);
  };

  const handleshowhideKecamatan = (event) => {
    const getType = event.target.value;
    setKecamatan(getType);
  };

  const handleFileKtp = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("pdf.*")) {
      setKtp("");

      toast.error("Format File KTP Tidak Cocok Harus PDF", {
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
    setKtp(imageData);
  };

  const handleFileKk = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("pdf.*")) {
      setKk("");

      toast.error("Format File Kartu Keluarga Tidak Cocok Harus PDF", {
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
    setKk(imageData);
  };

  //function "storeRegister"
  const storeRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("nik", nik);
    formData.append("nokk", nokk);
    formData.append("name", name);
    formData.append("nohp", nohp);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("kecamatan", kecamatan);
    formData.append("codepos", codepos);
    formData.append("rt", rt);
    formData.append("rw", rw);
    formData.append("alamat", alamat);
    formData.append("imagektp", ktp);
    formData.append("imagekk", kk);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("roles", roles);

    //sending data
    await Api.post("/api/users", formData, {
      //header
      headers: {
        //header
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
        navigate("/login");
      })
      .catch((error) => {
        //set error message to state "errors"
        setLoading(false);
        setErros(error.response.data);
      });
  };

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div classname="row">
          <div className="col-md-12 mt-3 mb-4">
            <div className="card border-0 shadow-sm rounded-3 text-center text-uppercase">
              <div className="card-body mt-2">
                <h4 className="font-weight-bold text-dark">
                  Register Beasiswa
                </h4>
                <hr />
                <form onSubmit={storeRegister}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Nama Lengkap Sesuai KTP</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter Nama Lengkap"
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
                        <label className="form-label fw-bold">NIK</label>
                        <input
                          type="text"
                          className="form-control"
                          value={nik}
                          onChange={(e) => setNik(e.target.value)}
                          placeholder="Enter No Induk Kependudukan"
                          maxLength={16}
                        />
                      </div>
                      {errors.nik && (
                        <div className="alert alert-danger">
                          {errors.nik[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label fw-bold">No Kartu Keluarga (KK)</label>
                        <input
                          type="text"
                          className="form-control"
                          value={nokk}
                          onChange={(e) => setNokk(e.target.value)}
                          placeholder="Enter No Kartu Keluarga"
                          maxLength={16}
                        />
                      </div>
                      {errors.nokk && (
                        <div className="alert alert-danger">
                          {errors.nokk[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          No HP/Whatsapp
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={nohp}
                          onChange={(e) => setNohp(e.target.value)}
                          placeholder="Enter No Hp atau Whatsapp"
                        />
                      </div>
                      {errors.nohp && (
                        <div className="alert alert-danger">
                          {errors.nohp[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Email"
                        />
                      </div>
                      {errors.email && (
                        <div className="alert alert-danger">
                          {errors.email[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Gender</label>
                        <select
                          className="form-select"
                          value={gender}
                          onChange={handleshowhideGender}
                        >
                          <option value="">-- Select Gender --</option>
                          <option value="L">Laki-Laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>
                      {errors.gender && (
                        <div className="alert alert-danger">
                          {errors.gender[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Kecamatan</label>
                        <select
                          className="form-select"
                          value={kecamatan}
                          onChange={handleshowhideKecamatan}
                        >
                          <option value="">-- Select Kecamatan --</option>
                          <option value="Sidoarjo">Sidoarjo</option>
                        </select>
                      </div>
                      {errors.kecamatan && (
                        <div className="alert alert-danger">
                          {errors.kecamatan[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Kode POS</label>
                        <input
                          type="text"
                          className="form-control"
                          value={codepos}
                          onChange={(e) => setCodepos(e.target.value)}
                          placeholder="Enter Kode POS"
                        />
                      </div>
                      {errors.codepos && (
                        <div className="alert alert-danger">
                          {errors.codepos[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label fw-bold">RT</label>
                        <input
                          type="text"
                          className="form-control"
                          value={rt}
                          onChange={(e) => setRt(e.target.value)}
                          placeholder="Enter RT"
                        />
                      </div>
                      {errors.rt && (
                        <div className="alert alert-danger">{errors.rt[0]}</div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label fw-bold">RW</label>
                        <input
                          type="text"
                          className="form-control"
                          value={rw}
                          onChange={(e) => setRw(e.target.value)}
                          placeholder="Enter RW"
                        />
                      </div>
                      {errors.rw && (
                        <div className="alert alert-danger">{errors.rw[0]}</div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="form-label fw-bold">
                        Alamat Lengkap Sesuai KTP
                      </label>
                      <ReactQuill
                        theme="snow"
                        rows="5"
                        value={alamat}
                        onChange={(content) => setAlamat(content)}
                      />
                    </div>
                    {errors.alamat && (
                      <div className="alert alert-danger">
                        {errors.alamat[0]}
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-2">
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Upload KTP pdf dan maksimal 2MB
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleFileKtp}
                        />
                      </div>
                      {errors.imagektp && (
                        <div className="alert alert-danger">
                          {errors.imagektp[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Upload KK (Kartu Keluarga) pdf dan maksimal 2MB
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleFileKk}
                        />
                      </div>
                      {errors.imagekk && (
                        <div className="alert alert-danger">
                          {errors.imagekk[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-2">
                      <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {errors.password && (
                        <div className="alert alert-danger">
                          {errors.password[0]}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Password Confirmation
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={passwordConfirmation}
                          onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-md btn-primary me-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "LOADING..."
                      ) : (
                        "SIMPAN"
                      )}{" "}
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
    </LayoutWeb>
  );
}
