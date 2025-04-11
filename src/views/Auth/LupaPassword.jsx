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

export default function LupaPassword() {
    //title page
    document.title = "Reset Password - BEASISWA";

    const [isLoading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const [errors, setErrors] = useState([]);

    //navigate
    const navigate = useNavigate();

    const reset = async (e) => {
        e.preventDefault();
        setLoading(true);
        await Api.post("/api/send-welcome-email", {
            //data
            email: email,
        })
            .then((response) => {
                setLoading(false);

                console.log(response);

                //show toast
                toast('RESET PASSWORD ANDA BERHASIL CEK EMAIL AKTIF ANDA!', {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 120000, // 2 minutes in milliseconds
                });

                //redirect dashboard page
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                //set response error to state
                setErrors(error.response.data);
            });
    };

    return (
        <LayoutAuth>
            <div
                className="row d-flex align-items-center justify-content-center"
                style={{
                    marginTop: "60px",
                }}
            >
                <div className="col-md-12 mt-5">
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
                                <div className="alert alert-success">Setelah Reset Password Berhasil Cek Inbox Email Aktif</div>
                                {errors.message && (
                                    <div className="alert alert-danger">{errors.message}</div>
                                )}
                                <form onSubmit={reset} className="row g-4">
                                    <div className="col-12">
                                        <label>EMAIL</label>
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <i className="fa fa-envelope"></i>
                                            </div>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Masukkan Email Yang Telah di Daftarkan"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4 float-end rounded-4"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "LOADING..." : "RESET"}{" "}
                                    </button>
                                    <Link to="/login">
                                        <i className="fa-solid fa-backward"></i> KEMBALI
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAuth>
    )
}