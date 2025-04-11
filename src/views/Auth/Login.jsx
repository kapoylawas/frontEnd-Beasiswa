//import layoutAuth
import { useState } from "react";
import LayoutAuth from "../../layouts/Auth";
//import Cookie
import Cookies from "js-cookie";

//import Navigate
import { Link, Navigate, useNavigate } from "react-router-dom";

//import toast
import toast from "react-hot-toast";

//import service
import Api from "../../services/Api";

export default function Login() {
  //title page
  document.title = "Login - BEASISWA";

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  //navigate
  const navigate = useNavigate();

  //method login
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    await Api.post("/api/login", {
      //data
      nik: nik,
      password: password,
    })
      .then((response) => {
        setLoading(false);

        //set token to cookies
        Cookies.set("token", response.data.token);

        //set user to cookies
        Cookies.set("user", JSON.stringify(response.data.user));

        Cookies.set("terdaftar", JSON.stringify(response.data.metta));

        //set permissions to cookies
        Cookies.set("permissions", JSON.stringify(response.data.permissions));

        //show toast
        toast.success("Login Successfully!", {
          position: "top-right",
          duration: 4000,
        });

        //redirect dashboard page
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        //set response error to state
        setErrors(error.response.data);
      });
  };

  //check if cookie already exists
  if (Cookies.get("token")) {
    //redirect dashboard page
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <LayoutAuth>
      <div
        className="row d-flex align-items-center justify-content-center"
        style={{
          marginTop: "60px",
        }}
      >
        <div className="col-md-6 mt-5">
          <div className="text-center mt-5">
            <img
              src={"/images/sidoarjo-logo.png"}
              width={"100"}
              alt="Logo Pendaftaran Beasiswa"
            />
            <h4>
              <strong className="text-white mt-3">Beasiswa, SIDOARJO</strong>
            </h4>
          </div>
          <div className="card rounded-4 shadow-sm border-top-success">
            <div className="card-body">
              <div className="form-left h-100 py-3 px-3">
                {errors.message && (
                  <div className="alert alert-danger">{errors.message}</div>
                )}
                <form onSubmit={login} className="row g-4">
                  <div className="col-12">
                    <label>NIK</label>
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="fa fa-user"></i>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="Nik User"
                        maxLength={16}
                      />
                    </div>
                    {errors.nik && (
                      <div className="alert alert-danger mt-2">
                        {errors.nik[0]}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label>Password</label>
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="fa fa-lock"></i>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                      />
                    </div>
                    {errors.password && (
                      <div className="alert alert-danger mt-2">
                        {errors.password[0]}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary px-4 float-end rounded-4"
                    disabled={isLoading}
                  >
                    {isLoading ? "LOADING..." : "LOGIN"}{" "}
                  </button>
                  <Link to="/reset">
                    <div className="text-center">
                      <h5 className="text-blue">Lupa Password</h5>
                    </div>
                  </Link>
                  <Link to="/">
                    <i className="fa-solid fa-backward"></i> KEMBALI
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}
