//import layout
import { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import { useNavigate } from "react-router-dom";
//import toast
import toast from "react-hot-toast";
import Api from "../../../services/Api";
import Logo from "../../../../public/images/lock.svg";
//import react select
import Select from "react-select";

export default function Register() {
  document.title = "Register - Beasiswa Sidoarjo";

  const maintenance = false;

  //navigata
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [nokk, setNokk] = useState("");
  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [codepos, setCodepos] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [alamat, setAlamat] = useState("");
  const [ktp, setKtp] = useState("");
  const [kk, setKk] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // const [roles] = useState(["user"]);
  const [errors, setErros] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("");

  console.log(kecamatanList);



  const [tanggalBatas, setTanggalBatas] = useState();



  useEffect(() => {
    //fetch api
    Api.get("/api/tanggalBatas", {}).then((response) => {
      //set data
      setTanggalBatas(response.data.data);
    });
  }, []);

  // get data kecamatan
  useEffect(() => {
    Api.get("/api/kecamatan/all", {}).then((response) => {
      const formattedKecamatan = response.data.data.map(kecamatan => ({
        value: kecamatan.id,
        label: kecamatan.name
      }));
      setKecamatanList(formattedKecamatan);
    });
  }, []);

  const handleKecamatanChange = (selectedOption) => {
    setSelectedKecamatan(selectedOption.value);
    setSelectedKelurahan(""); // Reset selected kelurahan when kecamatan changes
  };

  // hook data kelurahan by id kecamatan
  useEffect(() => {
    Api.get(`/api/kelurahan/byid?kecamatan_id=${selectedKecamatan}`).then((response) => {
      const formattedKelurahan = response.data.data.map(kelurahan => ({
        value: kelurahan.id,
        label: kelurahan.name
      }));
      setKelurahanList(formattedKelurahan);
    });
  }, [selectedKecamatan]);



  const handleshowhideGender = (selectedOption) => {
    const getType = event.target.value;
    setGender(getType);
  };

  const handleFileKtp = (e) => {
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
        setKtp(imageData);
      }
    }

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
        setKk(imageData);
      }
    }

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

  const handleChangeNik = (event) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/\D/g, "");

    // Limit the length to 16 digits
    const truncatedValue = numericValue.slice(0, 16);

    setNik(truncatedValue);
  };

  const handleChangeKartuKeluarga = (event) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/\D/g, "");

    // Limit the length to 16 digits
    const truncatedValue = numericValue.slice(0, 16);

    setNokk(truncatedValue);
  };

  const handleChangeNoHp = (event) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/\D/g, "");

    setNohp(numericValue);
  };

  const handleChangeKodePos = (event) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/\D/g, "");

    setCodepos(numericValue);
  };

  const handleChangeRT = (event) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/\D/g, "");

    setRt(numericValue);
  };

  const handleChangeRW = (event) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/\D/g, "");

    setRw(numericValue);
  };

  //function "storeRegister"
  const storeRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Define formData
    const formData = new FormData();

    // Append data to "formData"
    formData.append("nik", nik);
    formData.append("nokk", nokk);
    formData.append("name", name);
    formData.append("nohp", nohp);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("id_kecamatan", selectedKecamatan);
    formData.append("id_kelurahan", selectedKelurahan);
    formData.append("codepos", codepos);
    formData.append("rt", rt);
    formData.append("rw", rw);
    formData.append("alamat", alamat);
    formData.append("imagektp", ktp);
    formData.append("imagekk", kk);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);

    // Sending data with toast promise
    toast.promise(
      Api.post("/api/users", formData, {
        // Header
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        loading: 'Saving...',
        success: (response) => {
          console.log(response);
          navigate("/login");
          // Tampilkan pesan sukses
          toast.success(response.data.message, {
            duration: 40000, // Set durasi
          });
          return <b>Data Berhasil Disimpan</b> // Pastikan ini string
        },
        error: (error) => {
          setLoading(false);
          setErros(error.response.data);
          return <b>Lengkapi Data Anda!!</b>;
        },
      }
    );
  };

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div classname="row">
          <div className="col-md-12 mt-3 mb-4">
            {maintenance ? (
              <>
                <div className="col-md-12 mt-5">
                  <div className="card border-0 shadow-sm rounded-3 text-center text-uppercase">
                    <div className="card-body mt-2">
                      <h4 className="font-weight-bold text-dark">
                        Pendaftaran Sudah Di tutup
                      </h4>
                      <hr />
                      <h6>
                        <div className="list-group my-3">
                          <img src={Logo} alt="Logo" height={300} />
                        </div>
                      </h6>
                    </div>
                  </div>
                </div>
              </>
            ) : (
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
                          <label className="form-label fw-bold">
                            Nama Lengkap Sesuai KTP-EL
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan Nama Lengkap"
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
                            NIK Sesuai KTP-EL
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={nik}
                            onChange={handleChangeNik}
                            placeholder="Masukkan No Induk Kependudukan"
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
                          <label className="form-label fw-bold">
                            No Kartu Keluarga (KK)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={nokk}
                            onChange={handleChangeKartuKeluarga}
                            placeholder="Masukkan No Kartu Keluarga"
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
                            onChange={handleChangeNoHp}
                            placeholder="Masukkan No Hp atau Whatsapp"
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
                            placeholder="Masukkan Email"
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
                          <label className="form-label fw-bold">
                            Jenis Kelamin
                          </label>
                          <select
                            className="form-select"
                            value={gender}
                            onChange={handleshowhideGender}
                          >
                            <option value="">-- Pilih Jenis Kelamin --</option>
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
                          <label className="form-label fw-bold">
                            Kecamatan
                          </label>
                          <Select
                            options={kecamatanList}
                            value={kecamatanList.find(kecamatan => kecamatan.value === selectedKecamatan) || null}
                            onChange={handleKecamatanChange}
                            placeholder="Pilih Kecamatan"
                          />
                        </div>
                        {errors.id_kecamatan && (
                          <div className="alert alert-danger">
                            {errors.id_kecamatan[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Kelurahan/Desa
                          </label>
                          <Select
                            options={kelurahanList}
                            value={kelurahanList.find(kelurahan => kelurahan.value === selectedKelurahan) || null}
                            onChange={(selectedOption) => {
                              setSelectedKelurahan(selectedOption.value);
                            }}
                            placeholder="Pilih Kelurahan"
                          />
                        </div>
                        {errors.id_kelurahan && (
                          <div className="alert alert-danger">
                            {errors.id_kelurahan[0]}
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
                            onChange={handleChangeKodePos}
                            placeholder="Masukkan Kode POS"
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
                            onChange={handleChangeRT}
                            placeholder="Kalau RT Belum Ada Isi Dengan (0)"
                          />
                        </div>
                        {errors.rt && (
                          <div className="alert alert-danger">
                            {errors.rt[0]}
                          </div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label fw-bold">RW</label>
                          <input
                            type="text"
                            className="form-control"
                            value={rw}
                            onChange={handleChangeRW}
                            placeholder="Kalau RW Belum Ada Isi Dengan (0)"
                          />
                        </div>
                        {errors.rw && (
                          <div className="alert alert-danger">
                            {errors.rw[0]}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label className="form-label fw-bold">
                          Alamat Lengkap Sesuai KTP
                        </label>
                        <textarea
                          rows="5"
                          cols="50"
                          value={alamat}
                          onChange={(e) => setAlamat(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    {errors.alamat && (
                      <div className="alert alert-danger">
                        {errors.alamat[0]}
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-12 mt-2">
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
                      <div className="col-md-12 mt-2">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Upload Kartu Keluarga pdf dan maksimal 2MB
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
                            Password Konfirmasi
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
                        {isLoading ? "LOADING..." : "SIMPAN"}{" "}
                      </button>
                      <button type="reset" className="btn btn-md btn-warning">
                        <i className="fa fa-redo"></i> Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}
