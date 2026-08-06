import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import toast from "react-hot-toast";

export default function GantiPassword() {
    document.title = "Ganti Password - Beasiswa";

    // Token from cookies
    const token = Cookies.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [usersbyid, setUsersByid] = useState("");

    // Navigate
    const navigate = useNavigate();

    // Hook useEffect
    useEffect(() => {
        // Fetch API
        Api.get("/api/admin/users/byid", {
            // Header
            headers: {
                // Header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            // Set data
            setUsersByid(response.data.data.id);
        });
    }, []);

    const updatePassword = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("Password dan konfirmasi tidak cocok.", {
                position: "top-center",
                duration: 4000,
            });
            return;
        }

        // Sending data
        await Api.put(
            `/api/changePassword/${usersbyid}?password=${password}`,
            {
                // Header
                headers: {
                    // Header Bearer + Token
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                // Show toast
                toast.success("Password berhasil di update.", {
                    position: "top-center",
                    duration: 4000,
                });

                // Redirect
                navigate("/admin/dashboard");
            })
            .catch((error) => {
                // Set error message to state "errors"
                toast.error(error.response?.data?.message || "Gagal mengupdate password");
            });
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-4" style={{ maxWidth: "600px" }}>
                    <div className="mb-3">
                        <Link
                            to="/admin/dashboard"
                            className="btn btn-3d bg-white text-dark border-2 font-bold px-3 py-2"
                            type="button"
                        >
                            <i className="fa-solid fa-backward me-2"></i> Kembali ke Dashboard
                        </Link>
                    </div>
                    <div className="card border-0 rounded-4 shadow-sm" style={{
                        background: "#ffffff",
                        border: "2.5px solid #1e293b",
                        boxShadow: "5px 5px 0px #1e293b"
                    }}>
                        <div className="card-body p-4">
                            <h5 className="fw-extrabold text-dark mb-3">
                                <i className="fa fa-shield-alt text-success me-2"></i> Ganti Password Akun
                            </h5>
                            <hr style={{ borderTop: "2px solid #1e293b" }} />
                            <form onSubmit={updatePassword}>
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-dark mb-1">Ganti Password Baru</label>
                                    <div className="position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control font-bold"
                                            style={{
                                                background: "#ffffff",
                                                border: "2.5px solid #1e293b",
                                                borderRadius: "12px",
                                                boxShadow: "3px 3px 0px #1e293b",
                                                padding: "10px 45px 10px 14px",
                                                fontSize: "0.95rem"
                                            }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Ganti Password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn position-absolute top-50 translate-middle-y border-0 text-slate-600"
                                            style={{
                                                right: "12px",
                                                background: "transparent",
                                                padding: "4px 8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                zIndex: 5
                                            }}
                                            onClick={() => setShowPassword(!showPassword)}
                                            title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                                        >
                                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} fs-6`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold text-dark mb-1">Konfirmasi Password Baru</label>
                                    <div className="position-relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="form-control font-bold"
                                            style={{
                                                background: "#ffffff",
                                                border: "2.5px solid #1e293b",
                                                borderRadius: "12px",
                                                boxShadow: "3px 3px 0px #1e293b",
                                                padding: "10px 45px 10px 14px",
                                                fontSize: "0.95rem"
                                            }}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Konfirmasi Password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn position-absolute top-50 translate-middle-y border-0 text-slate-600"
                                            style={{
                                                right: "12px",
                                                background: "transparent",
                                                padding: "4px 8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                zIndex: 5
                                            }}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            title={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                                        >
                                            <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} fs-6`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-3d bg-success text-dark font-bold px-4 py-2"
                                        style={{
                                            background: "var(--saweria-green-bright)",
                                            border: "2.5px solid #1e293b",
                                            boxShadow: "3.5px 3.5px 0px #1e293b",
                                            borderRadius: "12px",
                                            fontWeight: "900"
                                        }}
                                    >
                                        <i className="fa fa-save me-2"></i> Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}