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
                setErros(error.response.data);
            });
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="col-md-3 col-12 mb-2">
                        <Link
                            to="/"
                            className="btn btn-md btn-primary border-0 shadow w-100"
                            type="button"
                        >
                            <i className="fa-solid fa-backward"></i> Kembali
                        </Link>
                    </div>
                    <div className="card border-0 rounded shadow-sm border-top-success">
                        <div className="card-body">
                            <h6>
                                <i className="fa fa-shield-alt"></i> Ganti Password
                            </h6>
                            <hr />
                            <form onSubmit={updatePassword}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Ganti Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Ganti Password"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Konfirmasi Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Konfirmasi Password"
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-md btn-primary me-2"
                                    >
                                        <i className="fa fa-save"></i> Update
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